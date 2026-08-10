import React, { useState, useEffect } from 'react';
import { Bookmark, Share2, Volume2, ArrowRight, Sparkles, UserCheck, MessageSquare, Briefcase, Info, Check, Copy, Compass, GitCompare, HelpCircle, Layers } from 'lucide-react';
import { Term, TermComparison, LearningPath } from '../types';
import { termRepository } from '../repositories/termRepository';
import { CategoryBadge } from '../components/CategoryBadge';
import { Breadcrumb } from '../components/Breadcrumb';
import { CATEGORIES } from '../data/categoriesData';

interface TermDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
  onAddRecentlyViewed: (slug: string) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const TermDetailPage: React.FC<TermDetailPageProps> = ({
  slug,
  onNavigate,
  isFavorite,
  onToggleFavorite,
  onAddRecentlyViewed,
  onShowToast
}) => {
  const [term, setTerm] = useState<Term | null>(null);
  const [relatedTerms, setRelatedTerms] = useState<Term[]>([]);
  const [oftenHeardTerms, setOftenHeardTerms] = useState<Term[]>([]);
  const [readingNextTerms, setReadingNextTerms] = useState<Term[]>([]);
  const [comparisons, setComparisons] = useState<TermComparison[]>([]);
  const [relatedLearningPath, setRelatedLearningPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTermData = async () => {
      setIsLoading(true);
      const found = await termRepository.getTermBySlug(slug);
      if (found) {
        setTerm(found);
        onAddRecentlyViewed(found.slug);

        // Fetch ranked related terms
        const related = await termRepository.getRelatedTerms(found, 6);
        setRelatedTerms(related);

        // Fetch Often Heard With terms
        if (found.oftenHeardWith && found.oftenHeardWith.length > 0) {
          const heardList: Term[] = [];
          for (const s of found.oftenHeardWith) {
            const t = await termRepository.getTermBySlug(s);
            if (t) heardList.push(t);
          }
          setOftenHeardTerms(heardList);
        } else {
          setOftenHeardTerms([]);
        }

        // Fetch "If you're reading this..." terms
        if (found.ifYouAreReadingThis && found.ifYouAreReadingThis.length > 0) {
          const nextList: Term[] = [];
          for (const s of found.ifYouAreReadingThis) {
            const t = await termRepository.getTermBySlug(s);
            if (t) nextList.push(t);
          }
          setReadingNextTerms(nextList);
        } else {
          setReadingNextTerms([]);
        }

        // Fetch comparisons for this term
        const comps = await termRepository.getComparisonsForTerm(found.slug);
        setComparisons(comps);

        // Check if term belongs to a learning path
        const allPaths = await termRepository.getAllLearningPaths();
        const matchedPath = allPaths.find((p) => p.steps.some((st) => st.termSlug === found.slug));
        setRelatedLearningPath(matchedPath || null);
      } else {
        setTerm(null);
      }
      setIsLoading(false);
    };

    fetchTermData();
  }, [slug]);

  const handleSpeak = () => {
    if (term && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(term.term);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    onShowToast('لینک این اصطلاح در حافظه کپی شد', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share && term) {
      navigator.share({
        title: `${term.term} | نون ویکی`,
        text: `${term.term} (${term.persianName}): ${term.definition}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6 animate-pulse">
        <div className="h-8 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="h-32 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
        <div className="h-48 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
      </div>
    );
  }

  if (!term) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          اصطلاح مورد نظر یافت نشد
        </h2>
        <p className="text-xs text-neutral-500">
          احتمالاً این اصطلاح هنوز به دانشنامه اضافه نشده است.
        </p>
        <button
          onClick={() => onNavigate('/terms')}
          className="px-4 py-2 bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 rounded-xl text-xs font-semibold"
        >
          بازگشت به لیست اصطلاحات
        </button>
      </div>
    );
  }

  const categoryInfo = CATEGORIES.find(c => c.slug === term.category);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6" dir="rtl">
      
      {/* Top Breadcrumb & Category Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb
          items={[
            { label: 'اصطلاحات', path: '/terms' },
            ...(categoryInfo ? [{ label: categoryInfo.titleFa, path: `/category/${categoryInfo.slug}` }] : []),
            { label: term.term }
          ]}
          onNavigate={onNavigate}
        />

        <CategoryBadge
          categorySlug={term.category}
          onClick={() => onNavigate(`/category/${term.category}`)}
          size="md"
        />
      </div>

      {/* Related Learning Path Banner if part of a path */}
      {relatedLearningPath && (
        <div
          onClick={() => onNavigate(`/learning-path/${relatedLearningPath.slug}`)}
          className="cursor-pointer bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 border border-emerald-200 dark:border-slate-700 rounded-2xl p-4 flex items-center justify-between hover:border-emerald-400 transition-all"
        >
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold block">
                عضو مسیر یادگیری
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {relatedLearningPath.titleFa}
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            مشاهده مسیر کامل
            <ArrowRight className="w-4 h-4 rotate-180" />
          </span>
        </div>
      )}

      {/* Main Term Header Card */}
      <header className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl shadow-xs space-y-4">
        
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-3xl sm:text-4xl font-black font-english text-neutral-900 dark:text-neutral-100 tracking-tight">
                {term.term}
              </h1>

              {term.pronunciation && (
                <button
                  onClick={handleSpeak}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  title="پخش تلفظ انگلیسی"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-english">{term.pronunciation}</span>
                </button>
              )}

              {term.isPopular && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-md">
                  <Sparkles className="w-3 h-3" />
                  اصطلاح پرکاربرد
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-semibold text-neutral-600 dark:text-neutral-400 mt-2">
              <span className="font-english text-neutral-900 dark:text-neutral-200">{term.fullName}</span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span className="text-neutral-800 dark:text-neutral-200">{term.persianName}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(term.slug)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isFavorite
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                  : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
              title={isFavorite ? 'حذف از نشان‌شده‌ها' : 'نشان کردن'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500/20' : ''}`} />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              title="کپی لینک"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              title="اشتراک‌گذاری"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </header>

      {/* Aliases & Synonyms */}
      {((term.aliases && term.aliases.length > 0) || (term.synonyms && term.synonyms.length > 0)) && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-bold text-neutral-700 dark:text-neutral-300">نام‌های دیگر / مترادف‌ها:</span>
          {[...(term.aliases || []), ...(term.synonyms || [])].map((item, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* 1. Simple Definition */}
      <section className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
          <Info className="w-4 h-4" />
          <span>تعریف ساده</span>
        </div>
        <p className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 leading-relaxed font-medium">
          {term.simpleDefinition || term.definition}
        </p>
      </section>

      {/* Confused With callout if available */}
      {term.confusedWith && term.confusedWith.length > 0 && (
        <section className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
            <Info className="w-4 h-4" />
            <span>با این اصطلاحات اشتباه نشود</span>
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
            {term.confusedWith.map((item, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/50 dark:bg-neutral-900/50">
                <span className="font-bold font-english text-amber-800 dark:text-amber-300 ml-1">
                  {item.term}:
                </span>
                <span>{item.explanation}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Comparison Engine Suggestions ( if comparisons exist ) */}
      {comparisons.length > 0 && (
        <section className="p-6 bg-amber-50 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
              <GitCompare className="w-4 h-4 text-amber-600" />
              <span>جدول مقایسه اختصاصی (Compare Engine)</span>
            </div>
            <button
              onClick={() => onNavigate('/comparisons')}
              className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline"
            >
              مشاهده همه مقایسه‌ها
            </button>
          </div>

          <div className="space-y-2">
            {comparisons.map((c) => (
              <div
                key={c.id}
                onClick={() => onNavigate(`/compare/${c.slug}`)}
                className="cursor-pointer p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/70 dark:border-slate-700 hover:border-amber-400 transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{c.titleFa}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{c.keyDifference}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600 rotate-180 shrink-0" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formula display if available */}
      {term.formula && (
        <section className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <Info className="w-4 h-4" />
            <span>فرمول محاسبه</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-neutral-900/70 text-sm font-mono font-bold text-emerald-900 dark:text-emerald-200 dir-ltr text-left">
            {term.formula}
          </div>
        </section>
      )}

      {/* 2. Workplace Meaning */}
      <section className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
          <Briefcase className="w-4 h-4" />
          <span>معنی در محیط کار</span>
        </div>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {term.workplaceMeaning}
        </p>
      </section>

      {/* 3. Real Example */}
      <section className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
          <MessageSquare className="w-4 h-4" />
          <span>مثال در گفتگوهای واقعی</span>
        </div>
        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 italic text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
          {term.example}
        </div>
      </section>

      {/* 4. KEY FEATURE: "اگر این اصطلاح را در شرکت شنیدی..." Callout */}
      <section className="p-6 sm:p-8 rounded-3xl bg-blue-500/10 border border-blue-500/20 dark:bg-blue-950/20 text-neutral-900 dark:text-neutral-100 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
          <Sparkles className="w-4 h-4" />
          <span>اگر این اصطلاح را در شرکت شنیدی...</span>
        </div>
        <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
          {term.heardAtWork}
        </p>
      </section>

      {/* Often heard with section */}
      {oftenHeardTerms.length > 0 && (
        <section className="p-6 bg-purple-50/70 dark:bg-slate-900/60 border border-purple-200/60 dark:border-slate-800 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-400">
            <Sparkles className="w-4 h-4" />
            <span>اغلب کنار هم شنیده می‌شوند (Often Heard With)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {oftenHeardTerms.map((t) => (
              <button
                key={t.id}
                onClick={() => onNavigate(`/term/${t.slug}`)}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-slate-700 hover:border-purple-400 text-xs font-semibold text-purple-900 dark:text-purple-200 transition-colors flex items-center gap-1.5"
              >
                <span>{t.term}</span>
                <span className="text-purple-500 dark:text-purple-400">({t.persianName})</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* If you're reading this... section */}
      {readingNextTerms.length > 0 && (
        <section className="p-6 bg-emerald-50/70 dark:bg-slate-900/60 border border-emerald-200/60 dark:border-slate-800 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <Compass className="w-4 h-4" />
            <span>اگر {term.term} را می‌خوانی، احتمالاً این‌ها هم برایت مفیدند:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {readingNextTerms.map((t) => (
              <div
                key={t.id}
                onClick={() => onNavigate(`/term/${t.slug}`)}
                className="cursor-pointer p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-emerald-100 dark:border-slate-700 hover:border-emerald-400 transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white block">{t.term}</span>
                  <span className="text-xs text-slate-500">{t.persianName}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 rotate-180" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Special Job Title Details if applicable */}
      {term.jobTitleInfo && (
        <section className="p-6 sm:p-8 bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 rounded-3xl space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold opacity-80">
            <UserCheck className="w-4 h-4" />
            <span>راهنمای موقعیت شغلی</span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <span className="font-bold opacity-70 block mb-1">این شخص چه کاری انجام می‌دهد؟</span>
              <p className="leading-relaxed">{term.jobTitleInfo.whatTheyDo}</p>
            </div>

            <div className="pt-2 border-t border-white/10 dark:border-black/10">
              <span className="font-bold opacity-70 block mb-1">معمولاً با چه تیم‌هایی همکاری می‌کند؟</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {term.jobTitleInfo.collaboratesWith.map((item, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/10 dark:bg-black/10 font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {term.jobTitleInfo.keySkills && (
              <div className="pt-2 border-t border-white/10 dark:border-black/10">
                <span className="font-bold opacity-70 block mb-1">مهارت‌های کلیدی:</span>
                <div className="flex flex-wrap gap-1.5 mt-1 font-english">
                  {term.jobTitleInfo.keySkills.map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/10 dark:bg-black/10 font-medium text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Terms Section */}
      {relatedTerms.length > 0 && (
        <section className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            اصطلاحات مرتبط (رتبه‌بندی شده با هوش دانشنامه)
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedTerms.map((rel) => (
              <button
                key={rel.id}
                onClick={() => onNavigate(`/term/${rel.slug}`)}
                className="px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors flex items-center gap-1.5"
              >
                <span className="font-english font-bold">{rel.term}</span>
                <span className="text-neutral-400">({rel.persianName})</span>
              </button>
            ))}
          </div>
        </section>
      )}

    </article>
  );
};

