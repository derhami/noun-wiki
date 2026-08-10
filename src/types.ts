export type TermDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type TermType =
  | 'business'
  | 'job-title'
  | 'concept'
  | 'technology'
  | 'metric'
  | 'methodology'
  | 'tool'
  | 'role'
  | 'abbreviation'
  | 'framework'
  | 'strategy'
  | 'process';

export type CareerLevel = 'junior' | 'mid-level' | 'senior' | 'lead' | 'manager' | 'executive';

export interface JobTitleInfo {
  whatTheyDo?: string;
  role?: string;
  responsibilities?: string[];
  collaboratesWith?: string[];
  keySkills?: string[];
  careerLevel?: CareerLevel;
  relatedTeams?: string[];
}

export interface ConfusedWithTerm {
  term: string;
  explanation: string;
}

export interface Term {
  id: string;
  slug: string;

  term: string;
  fullName?: string;
  persianName: string;

  aliases?: string[];
  synonyms?: string[];
  antonyms?: string[];

  pronunciation?: string;

  definition: string;
  simpleDefinition?: string;

  workplaceMeaning?: string;

  example?: string;

  heardAtWork?: string;

  confusedWith?: ConfusedWithTerm[];

  category: string;

  secondaryCategories?: string[];

  subcategories?: string[];

  relatedTerms?: string[];

  parentTerms?: string[];

  childTerms?: string[];

  seeAlso?: string[];

  difficulty?: TermDifficulty;

  termType?: TermType;

  isPopular?: boolean;

  isFeatured?: boolean;

  formula?: string;

  whereHeard?: string[];

  qualityScore?: number;

  jobTitleInfo?: JobTitleInfo;

  oftenHeardWith?: string[];

  roleVocabulary?: string[];

  ifYouAreReadingThis?: string[];

  seoTitle?: string;

  seoDescription?: string;

  conceptGroup?: string;

  workplaceContext?: string;

  createdAt?: string;

  updatedAt?: string;
}

export interface Category {
  id: string;
  slug: string;
  titleFa: string;
  titleEn: string;
  description: string;
  iconName: string;
  color: string;
  subcategories?: { id: string; titleFa: string; titleEn: string }[];
}

export interface TermSubmission {
  id: string;
  term: string;
  context?: string;
  email?: string;
  createdAt: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
}

export interface TermSearchFilter {
  query?: string;
  category?: string | null;
  difficulty?: TermDifficulty | null;
  popularOnly?: boolean;
  sortBy?: 'alphabetical' | 'popular' | 'recent';
}

export interface SearchResult {
  terms: Term[];
  didYouMean?: string;
  matchScoreMap?: Record<string, number>;
  searchIntent?: SearchIntentResult;
}

export interface TermComparisonDifference {
  feature: string;
  termAValue: string;
  termBValue: string;
}

export interface TermComparison {
  id: string;
  slug: string; // e.g., "kpi-vs-okr"
  termASlug: string;
  termBSlug: string;
  titleFa: string;
  titleEn: string;
  summary: string; // 2-3 sentences overview
  keyDifference: string;
  differences: TermComparisonDifference[];
  useCases?: {
    termA: string;
    termB: string;
  };
  whenToUseA?: string;
  whenToUseB?: string;
  relatedTerms?: string[];
}

export interface LearningPathStep {
  stepNumber: number;
  termSlug: string;
  whyLearnThis: string;
  keyTakeaway: string;
}

export interface LearningPath {
  id: string;
  slug: string;
  titleFa: string;
  titleEn: string;
  description: string;
  targetAudience: string;
  difficulty: TermDifficulty;
  startHereTermSlug: string;
  categorySlug?: string;
  steps: LearningPathStep[];
  estimatedMinutes?: number;
}

export interface KnowledgeCluster {
  id: string;
  slug: string;
  titleFa: string;
  titleEn: string;
  description: string;
  iconName?: string;
  coreTerms: string[]; // term slugs
  relatedJobs?: string[]; // term slugs
  learningPathSlug?: string;
  featuredComparisons?: string[]; // comparison slugs
}

export type SearchIntentType = 'term' | 'category' | 'job' | 'comparison' | 'learning' | 'general';

export interface SearchIntentResult {
  intent: SearchIntentType;
  query: string;
  cleanQuery: string;
  targetSlug?: string;
  targetTitleFa?: string;
  comparisonSlug?: string;
  termASlug?: string;
  termBSlug?: string;
  categorySlug?: string;
  learningPathSlug?: string;
  confidence: number;
}

