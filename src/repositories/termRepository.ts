import { Term, TermSearchFilter, TermSubmission, SearchResult, TermComparison, LearningPath, KnowledgeCluster, SearchIntentResult } from '../types';
import { TERMS } from '../data/termsData';
import { TERM_COMPARISONS } from '../data/comparisonsData';
import { LEARNING_PATHS } from '../data/learningPathsData';
import { KNOWLEDGE_CLUSTERS } from '../data/clustersData';
import { normalizePersian, compactText, levenshteinDistance } from '../utils/persianNormalizer';
import { suggestionService } from '../services/suggestionService';

export interface ITermRepository {
  getAllTerms(): Promise<Term[]>;
  getTermBySlug(slug: string): Promise<Term | null>;
  getTermsByCategory(categorySlug: string): Promise<Term[]>;
  searchTerms(filter: TermSearchFilter): Promise<Term[]>;
  searchWithDetails(filter: TermSearchFilter): Promise<SearchResult>;
  getPopularTerms(limit?: number): Promise<Term[]>;
  getFeaturedTerms(limit?: number): Promise<Term[]>;
  getRecentlyAddedTerms(limit?: number): Promise<Term[]>;
  getJobTitles(limit?: number): Promise<Term[]>;
  getRelatedTerms(term: Term, limit?: number): Promise<Term[]>;
  suggestTerm(submission: Omit<TermSubmission, 'id' | 'createdAt' | 'status'>): Promise<TermSubmission>;
  getSubmissions(): Promise<TermSubmission[]>;
  
  // Comparisons, Learning Paths, Knowledge Clusters
  getAllComparisons(): Promise<TermComparison[]>;
  getComparisonBySlug(slug: string): Promise<TermComparison | null>;
  getComparisonsForTerm(termSlug: string): Promise<TermComparison[]>;
  
  getAllLearningPaths(): Promise<LearningPath[]>;
  getLearningPathBySlug(slug: string): Promise<LearningPath | null>;
  
  getAllClusters(): Promise<KnowledgeCluster[]>;
  getClusterBySlug(slug: string): Promise<KnowledgeCluster | null>;

  validateContent(): {
    totalTerms: number;
    duplicateSlugs: string[];
    brokenReferences: { termSlug: string; brokenRef: string }[];
    missingPersianNames: string[];
    termsWithoutExamples: string[];
  };
}

export class LocalTermRepository implements ITermRepository {
  private terms: Term[] = [...TERMS];
  private comparisons: TermComparison[] = [...TERM_COMPARISONS];
  private learningPaths: LearningPath[] = [...LEARNING_PATHS];
  private clusters: KnowledgeCluster[] = [...KNOWLEDGE_CLUSTERS];

  async getAllTerms(): Promise<Term[]> {
    return Promise.resolve([...this.terms]);
  }

  async getTermBySlug(slug: string): Promise<Term | null> {
    const normalizedSlug = slug.toLowerCase().trim();
    const found = this.terms.find((t) => t.slug.toLowerCase() === normalizedSlug);
    return Promise.resolve(found || null);
  }

  async getTermsByCategory(categorySlug: string): Promise<Term[]> {
    const matched = this.terms.filter(
      (t) =>
        t.category === categorySlug ||
        t.secondaryCategories?.includes(categorySlug) ||
        t.subcategories?.includes(categorySlug)
    );
    return Promise.resolve(matched);
  }

  async searchTerms(filter: TermSearchFilter): Promise<Term[]> {
    const result = await this.searchWithDetails(filter);
    return result.terms;
  }

  async searchWithDetails(filter: TermSearchFilter): Promise<SearchResult> {
    const rawQuery = filter.query || '';
    const cleanQuery = cleanSearchQuery(rawQuery);
    const normQuery = normalizePersian(cleanQuery);
    const compactQuery = compactText(cleanQuery);

    const searchIntent = detectSearchIntent(rawQuery, cleanQuery, this.terms, this.comparisons, this.learningPaths);

    const matchScoreMap: Record<string, number> = {};

    let results = this.terms.filter((item) => {
      if (
        filter.category &&
        item.category !== filter.category &&
        !item.secondaryCategories?.includes(filter.category) &&
        !item.subcategories?.includes(filter.category)
      ) {
        return false;
      }

      if (filter.difficulty && item.difficulty !== filter.difficulty) {
        return false;
      }

      if (filter.popularOnly && !item.isPopular) {
        return false;
      }

      if (!normQuery) return true;

      const score = calculateRelevance(item, normQuery, compactQuery);
      if (score > 0) {
        matchScoreMap[item.id] = score;
        return true;
      }
      return false;
    });

    if (normQuery) {
      results.sort((a, b) => {
        const scoreA = matchScoreMap[a.id] || 0;
        const scoreB = matchScoreMap[b.id] || 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return a.term.localeCompare(b.term);
      });
    } else {
      if (filter.sortBy === 'alphabetical') {
        results.sort((a, b) => a.term.localeCompare(b.term));
      } else if (filter.sortBy === 'popular') {
        results.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
      }
    }

    let didYouMean: string | undefined = undefined;
    if (normQuery && results.length === 0) {
      didYouMean = this.findDidYouMeanSuggestion(normQuery);
    }

    return Promise.resolve({
      terms: results,
      didYouMean,
      matchScoreMap,
      searchIntent,
    });
  }

  private findDidYouMeanSuggestion(normQuery: string): string | undefined {
    if (normQuery.length < 2) return undefined;

    let minDistance = Infinity;
    let closestTermName: string | undefined = undefined;

    for (const term of this.terms) {
      const candidates = [
        term.term,
        term.persianName,
        term.fullName,
        ...(term.aliases || []),
        ...(term.synonyms || []),
      ].filter(Boolean) as string[];

      for (const candidate of candidates) {
        const normCandidate = normalizePersian(candidate);
        const dist = levenshteinDistance(normQuery, normCandidate);

        const maxAllowed = normQuery.length > 5 ? 3 : 2;

        if (dist > 0 && dist <= maxAllowed && dist < minDistance) {
          minDistance = dist;
          closestTermName = term.term;
        }
      }
    }

    return closestTermName;
  }

  async getPopularTerms(limit: number = 8): Promise<Term[]> {
    const popular = this.terms.filter((t) => t.isPopular);
    return Promise.resolve(popular.slice(0, limit));
  }

  async getFeaturedTerms(limit: number = 6): Promise<Term[]> {
    const featured = this.terms.filter((t) => t.isFeatured || t.isPopular);
    return Promise.resolve(featured.slice(0, limit));
  }

  async getRecentlyAddedTerms(limit: number = 6): Promise<Term[]> {
    // Return curated terms or terms marked recently
    const recent = [...this.terms].reverse();
    return Promise.resolve(recent.slice(0, limit));
  }

  async getJobTitles(limit?: number): Promise<Term[]> {
    const jobs = this.terms.filter(
      (t) =>
        t.category === 'jobs' ||
        t.secondaryCategories?.includes('jobs') ||
        t.termType === 'job-title' ||
        t.termType === 'role'
    );
    if (limit) return Promise.resolve(jobs.slice(0, limit));
    return Promise.resolve(jobs);
  }

  // Recommendation Ranking Algorithm
  async getRelatedTerms(targetTerm: Term, limit: number = 6): Promise<Term[]> {
    const scoredTerms: { term: Term; score: number }[] = [];

    const targetRelated = (targetTerm.relatedTerms || []).map((s) => s.toLowerCase());
    const targetParent = (targetTerm.parentTerms || []).map((s) => s.toLowerCase());
    const targetChild = (targetTerm.childTerms || []).map((s) => s.toLowerCase());
    const targetSeeAlso = (targetTerm.seeAlso || []).map((s) => s.toLowerCase());
    const targetHeardWith = (targetTerm.oftenHeardWith || []).map((s) => s.toLowerCase());

    for (const term of this.terms) {
      if (term.slug.toLowerCase() === targetTerm.slug.toLowerCase()) continue;

      let score = 0;
      const termSlugLower = term.slug.toLowerCase();

      // 1. Direct Relation (seeAlso): +100
      if (targetSeeAlso.includes(termSlugLower)) {
        score += 100;
      }

      // 2. Parent / Child: +90
      if (
        targetParent.includes(termSlugLower) ||
        targetChild.includes(termSlugLower) ||
        (term.parentTerms || []).some((p) => p.toLowerCase() === targetTerm.slug.toLowerCase()) ||
        (term.childTerms || []).some((c) => c.toLowerCase() === targetTerm.slug.toLowerCase())
      ) {
        score += 90;
      }

      // 3. Explicit Related / Often heard with: +85
      if (targetRelated.includes(termSlugLower) || targetHeardWith.includes(termSlugLower)) {
        score += 85;
      }

      // 4. Same Concept Group: +70
      if (
        targetTerm.conceptGroup &&
        term.conceptGroup &&
        targetTerm.conceptGroup.toLowerCase() === term.conceptGroup.toLowerCase()
      ) {
        score += 70;
      }

      // 5. Same Category: +50
      if (
        term.category === targetTerm.category ||
        targetTerm.secondaryCategories?.includes(term.category) ||
        term.secondaryCategories?.includes(targetTerm.category)
      ) {
        score += 50;
      }

      // 6. Same Subcategory: +45
      if (
        targetTerm.subcategories &&
        term.subcategories &&
        targetTerm.subcategories.some((sub) => term.subcategories?.includes(sub))
      ) {
        score += 45;
      }

      // 7. Same Term Type: +30
      if (targetTerm.termType && term.termType && targetTerm.termType === term.termType) {
        score += 30;
      }

      // 8. Shared Workplace Context: +20
      if (
        targetTerm.workplaceContext &&
        term.workplaceContext &&
        targetTerm.workplaceContext.toLowerCase() === term.workplaceContext.toLowerCase()
      ) {
        score += 20;
      }

      // 9. Popularity boost: +5
      if (term.isPopular) score += 5;

      if (score > 0) {
        scoredTerms.push({ term, score });
      }
    }

    scoredTerms.sort((a, b) => b.score - a.score);

    return Promise.resolve(scoredTerms.map((st) => st.term).slice(0, limit));
  }

  async suggestTerm(submission: Omit<TermSubmission, 'id' | 'createdAt' | 'status'>): Promise<TermSubmission> {
    return suggestionService.submitSuggestion(submission);
  }

  async getSubmissions(): Promise<TermSubmission[]> {
    return suggestionService.getSuggestions();
  }

  // Comparisons
  async getAllComparisons(): Promise<TermComparison[]> {
    return Promise.resolve([...this.comparisons]);
  }

  async getComparisonBySlug(slug: string): Promise<TermComparison | null> {
    const found = this.comparisons.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
    return Promise.resolve(found || null);
  }

  async getComparisonsForTerm(termSlug: string): Promise<TermComparison[]> {
    const lower = termSlug.toLowerCase();
    const matched = this.comparisons.filter(
      (c) => c.termASlug.toLowerCase() === lower || c.termBSlug.toLowerCase() === lower || c.relatedTerms?.includes(lower)
    );
    return Promise.resolve(matched);
  }

  // Learning Paths
  async getAllLearningPaths(): Promise<LearningPath[]> {
    return Promise.resolve([...this.learningPaths]);
  }

  async getLearningPathBySlug(slug: string): Promise<LearningPath | null> {
    const found = this.learningPaths.find((lp) => lp.slug.toLowerCase() === slug.toLowerCase());
    return Promise.resolve(found || null);
  }

  // Knowledge Clusters
  async getAllClusters(): Promise<KnowledgeCluster[]> {
    return Promise.resolve([...this.clusters]);
  }

  async getClusterBySlug(slug: string): Promise<KnowledgeCluster | null> {
    const found = this.clusters.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
    return Promise.resolve(found || null);
  }

  validateContent() {
    const totalTerms = this.terms.length;
    const slugs = new Set<string>();
    const duplicateSlugs: string[] = [];
    const brokenReferences: { termSlug: string; brokenRef: string }[] = [];
    const missingPersianNames: string[] = [];
    const termsWithoutExamples: string[] = [];

    const allSlugs = new Set(this.terms.map((t) => t.slug.toLowerCase()));

    for (const term of this.terms) {
      const lowerSlug = term.slug.toLowerCase();
      if (slugs.has(lowerSlug)) {
        duplicateSlugs.push(term.slug);
      }
      slugs.add(lowerSlug);

      if (!term.persianName) {
        missingPersianNames.push(term.slug);
      }

      if (!term.example) {
        termsWithoutExamples.push(term.slug);
      }

      const refs = [
        ...(term.relatedTerms || []),
        ...(term.parentTerms || []),
        ...(term.childTerms || []),
        ...(term.seeAlso || []),
        ...(term.oftenHeardWith || []),
      ];

      for (const ref of refs) {
        if (!allSlugs.has(ref.toLowerCase())) {
          brokenReferences.push({ termSlug: term.slug, brokenRef: ref });
        }
      }
    }

    return {
      totalTerms,
      duplicateSlugs,
      brokenReferences,
      missingPersianNames,
      termsWithoutExamples,
    };
  }
}

// Helper functions for query cleaning & intent detection
function cleanSearchQuery(query: string): string {
  let cleaned = query.trim().toLowerCase();
  
  // Remove stop phrases
  const stopPhrases = [
    'چیست؟', 'چیست', 'یعنی چه؟', 'یعنی چه', 'چیه؟', 'چیه',
    'تعریف', 'معنی', 'مفهوم', 'چیه', 'توضیح',
    'what is', 'meaning of', 'definition of', 'meaning', 'definition'
  ];

  for (const phrase of stopPhrases) {
    cleaned = cleaned.replace(new RegExp(phrase, 'gi'), '');
  }

  // Remove question marks and punctuation
  cleaned = cleaned.replace(/[؟?،,!.]/g, '').trim();

  return cleaned;
}

function detectSearchIntent(
  rawQuery: string,
  cleanQuery: string,
  terms: Term[],
  comparisons: TermComparison[],
  learningPaths: LearningPath[]
): SearchIntentResult {
  const normRaw = normalizePersian(rawQuery.toLowerCase());
  const normClean = normalizePersian(cleanQuery.toLowerCase());

  // 1. Comparison Intent check (vs, یا, تفاوت)
  if (normRaw.includes(' vs ') || normRaw.includes('یا') || normRaw.includes('تفاوت') || normRaw.includes('فرق')) {
    // Check if there's a matching comparison in comparisonsData
    for (const comp of comparisons) {
      if (
        normRaw.includes(comp.termASlug) && normRaw.includes(comp.termBSlug) ||
        normRaw.includes(normalizePersian(comp.titleFa)) ||
        normRaw.includes(comp.slug)
      ) {
        return {
          intent: 'comparison',
          query: rawQuery,
          cleanQuery,
          comparisonSlug: comp.slug,
          termASlug: comp.termASlug,
          termBSlug: comp.termBSlug,
          targetTitleFa: comp.titleFa,
          confidence: 0.95,
        };
      }
    }

    // Try finding two terms mentioned
    const matchedTermSlugs = terms
      .filter((t) => normRaw.includes(t.slug) || normRaw.includes(normalizePersian(t.term.toLowerCase())))
      .map((t) => t.slug);

    if (matchedTermSlugs.length >= 2) {
      const termASlug = matchedTermSlugs[0];
      const termBSlug = matchedTermSlugs[1];
      const compSlug = `${termASlug}-vs-${termBSlug}`;
      return {
        intent: 'comparison',
        query: rawQuery,
        cleanQuery,
        comparisonSlug: compSlug,
        termASlug,
        termBSlug,
        targetTitleFa: `تفاوت ${termASlug.toUpperCase()} و ${termBSlug.toUpperCase()}`,
        confidence: 0.85,
      };
    }
  }

  // 2. Learning Path Intent check (یادگیری, مسیر, شروع)
  if (normRaw.includes('مسیر') || normRaw.includes('یادگیری') || normRaw.includes('از کجا شروع') || normRaw.includes('آموزش')) {
    for (const lp of learningPaths) {
      if (normRaw.includes(lp.slug) || normRaw.includes(normalizePersian(lp.titleFa))) {
        return {
          intent: 'learning',
          query: rawQuery,
          cleanQuery,
          learningPathSlug: lp.slug,
          targetTitleFa: lp.titleFa,
          confidence: 0.9,
        };
      }
    }
    return {
      intent: 'learning',
      query: rawQuery,
      cleanQuery,
      confidence: 0.7,
    };
  }

  // 3. Category / Job Intent
  if (normRaw.includes('بازاریابی') || normRaw.includes('مارکتینگ')) {
    return { intent: 'category', query: rawQuery, cleanQuery, categorySlug: 'marketing', targetTitleFa: 'اصطلاحات بازاریابی', confidence: 0.85 };
  }
  if (normRaw.includes('محصول') || normRaw.includes('پروداکت')) {
    return { intent: 'category', query: rawQuery, cleanQuery, categorySlug: 'product', targetTitleFa: 'اصطلاحات محصول', confidence: 0.85 };
  }
  if (normRaw.includes('هوش مصنوعی') || normRaw.includes('ai')) {
    return { intent: 'category', query: rawQuery, cleanQuery, categorySlug: 'ai', targetTitleFa: 'اصطلاحات هوش مصنوعی', confidence: 0.85 };
  }
  if (normRaw.includes('شغل') || normRaw.includes('نقش') || normRaw.includes('وظایف')) {
    return { intent: 'job', query: rawQuery, cleanQuery, categorySlug: 'jobs', targetTitleFa: 'عنوان‌های شغلی', confidence: 0.8 };
  }

  // Default to term intent
  const directMatch = terms.find((t) => t.slug.toLowerCase() === normClean || normalizePersian(t.term).toLowerCase() === normClean);
  if (directMatch) {
    return {
      intent: 'term',
      query: rawQuery,
      cleanQuery,
      targetSlug: directMatch.slug,
      targetTitleFa: directMatch.persianName,
      confidence: 1.0,
    };
  }

  return {
    intent: 'general',
    query: rawQuery,
    cleanQuery,
    confidence: 0.5,
  };
}

function calculateRelevance(term: Term, normQuery: string, compactQuery: string): number {
  if (!normQuery) return 0;

  const normTerm = normalizePersian(term.term);
  const normPersian = normalizePersian(term.persianName);
  const normFull = term.fullName ? normalizePersian(term.fullName) : '';
  const compactTermName = compactText(term.term);

  const aliases = (term.aliases || []).map((a) => normalizePersian(a));
  const synonyms = (term.synonyms || []).map((s) => normalizePersian(s));

  // 1. Exact term match (+100)
  if (normTerm === normQuery) return 100;

  // 2. Exact alias / synonym match (+90)
  if (aliases.some((a) => a === normQuery) || synonyms.some((s) => s === normQuery)) return 90;

  // 3. Persian name match (+85)
  if (normPersian === normQuery) return 85;

  // 4. Full name match (+80)
  if (normFull && normFull === normQuery) return 80;

  // 5. Slug match (+70)
  if (normalizePersian(term.slug) === normQuery) return 70;

  // Compact exact match (e.g. b2b vs b-2-b)
  if (compactQuery && compactTermName === compactQuery) return 88;

  // 6. Prefix matches (+60)
  if (normTerm.startsWith(normQuery)) return 60;
  if (normPersian.startsWith(normQuery)) return 58;
  if (aliases.some((a) => a.startsWith(normQuery))) return 56;
  if (normFull && normFull.startsWith(normQuery)) return 54;

  // 7. Word match / Substring matches (+50)
  if (normTerm.includes(normQuery)) return 50;
  if (normPersian.includes(normQuery)) return 48;
  if (aliases.some((a) => a.includes(normQuery))) return 46;
  if (synonyms.some((s) => s.includes(normQuery))) return 44;

  // 8. Definition match (+20)
  const normDef = normalizePersian(term.definition);
  const normWork = term.workplaceMeaning ? normalizePersian(term.workplaceMeaning) : '';
  if (normDef.includes(normQuery) || normWork.includes(normQuery)) return 20;

  // 9. Related terms / Category match (+10)
  const normCat = normalizePersian(term.category);
  if (normCat.includes(normQuery)) return 10;

  return 0;
}

export const termRepository: ITermRepository = new LocalTermRepository();


