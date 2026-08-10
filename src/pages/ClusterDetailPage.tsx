import React, { useEffect, useState } from 'react';
import { termRepository } from '../repositories/termRepository';
import { KnowledgeCluster, Term, TermComparison, LearningPath } from '../types';
import { useRouter } from '../hooks/useRouter';
import { TermCard } from '../components/TermCard';
import { Layers, ArrowRight, ArrowLeft, GitCompare, Compass, Briefcase, BookOpen } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

interface Props {
  slug: string;
}

export const ClusterDetailPage: React.FC<Props> = ({ slug }) => {
  const [cluster, setCluster] = useState<KnowledgeCluster | null>(null);
  const [coreTerms, setCoreTerms] = useState<Term[]>([]);
  const [jobTerms, setJobTerms] = useState<Term[]>([]);
  const [comparisons, setComparisons] = useState<TermComparison[]>([]);
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const { navigate } = useRouter();

  useEffect(() => {
    setLoading(true);
    termRepository.getClusterBySlug(slug).then(async (data) => {
      if (data) {
        setCluster(data);

        // Fetch core terms
        const fetchedCore: Term[] = [];
        for (const tSlug of data.coreTerms) {
          const t = await termRepository.getTermBySlug(tSlug);
          if (t) fetchedCore.push(t);
        }
        setCoreTerms(fetchedCore);

        // Fetch related jobs
        if (data.relatedJobs) {
          const fetchedJobs: Term[] = [];
          for (const jSlug of data.relatedJobs) {
            const j = await termRepository.getTermBySlug(jSlug);
            if (j) fetchedJobs.push(j);
          }
          setJobTerms(fetchedJobs);
        }

        // Fetch featured comparisons
        if (data.featuredComparisons) {
          const fetchedComps: TermComparison[] = [];
          for (const cSlug of data.featuredComparisons) {
            const c = await termRepository.getComparisonBySlug(cSlug);
            if (c) fetchedComps.push(c);
          }
          setComparisons(fetchedComps);
        }

        // Fetch learning path
        if (data.learningPathSlug) {
          const lp = await termRepository.getLearningPathBySlug(data.learningPathSlug);
          setLearningPath(lp);
        }
      } else {
        setCluster(null);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-neutral-500" dir="rtl">
        در حال بارگذاری خوشه دانش...
      </div>
    );
  }

  if (!cluster) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center" dir="rtl">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">خوشه دانش یافت نشد</h2>
        <button
          onClick={() => navigate('/clusters')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به خوشه‌های دانش
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'خوشه‌های دانش', path: '/clusters' },
          { label: cluster.titleFa }
        ]}
        onNavigate={navigate}
      />

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/40 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800/80 border border-indigo-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 mb-3">
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>خوشه دانش تخصصی</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-3">
            {cluster.titleFa}
          </h1>

          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed max-w-3xl mb-6">
            {cluster.description}
          </p>

          {/* Quick action buttons */}
          <div className="flex flex-wrap gap-3">
          {learningPath && (
            <button
              onClick={() => navigate(`/learning-path/${learningPath.slug}`)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
            >
              <Compass className="w-4 h-4" />
              ورود به مسیر یادگیری {learningPath.titleFa}
            </button>
          )}
        </div>
      </div>
      </div>

      {/* Featured Comparisons if any */}
      {comparisons.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            مقایسه‌های کلیدی این حوزه
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comparisons.map((c) => (
              <div
                key={c.id}
                onClick={() => navigate(`/compare/${c.slug}`)}
                className="cursor-pointer bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 hover:border-indigo-400 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{c.titleEn}</span>
                  <ArrowLeft className="w-4 h-4 text-neutral-400" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">{c.titleFa}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2">{c.keyDifference}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Job Titles if any */}
      {jobTerms.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            نقش‌های شغلی مرتبط با این حوزه
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {jobTerms.map((j) => (
              <div
                key={j.id}
                onClick={() => navigate(`/term/${j.slug}`)}
                className="cursor-pointer bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 hover:border-indigo-400 transition-all"
              >
                <h3 className="font-bold text-neutral-900 dark:text-white text-base mb-1">{j.term} ({j.persianName})</h3>
                <p className="text-xs text-neutral-500 line-clamp-2">{j.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Terms */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            اصطلاحات کلیدی این خوشه ({coreTerms.length} اصطلاح)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreTerms.map((term) => (
            <TermCard key={term.id} term={term} onClick={() => navigate(`/term/${term.slug}`)} />
          ))}
        </div>
      </div>
    </div>
  );
};
