import React, { useEffect, useState } from 'react';
import { termRepository } from '../repositories/termRepository';
import { LearningPath, Term } from '../types';
import { useRouter } from '../hooks/useRouter';
import { ArrowLeft, ArrowRight, Compass, CheckCircle, HelpCircle, BookOpen, Clock, Sparkles } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

interface Props {
  slug: string;
}

export const LearningPathDetailPage: React.FC<Props> = ({ slug }) => {
  const [path, setPath] = useState<LearningPath | null>(null);
  const [stepTerms, setStepTerms] = useState<Record<string, Term>>({});
  const [loading, setLoading] = useState(true);
  const { navigate } = useRouter();

  useEffect(() => {
    setLoading(true);
    termRepository.getLearningPathBySlug(slug).then(async (data) => {
      if (data) {
        setPath(data);
        const termMap: Record<string, Term> = {};
        for (const step of data.steps) {
          const t = await termRepository.getTermBySlug(step.termSlug);
          if (t) termMap[step.termSlug] = t;
        }
        setStepTerms(termMap);
      } else {
        setPath(null);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-neutral-500" dir="rtl">
        در حال بارگذاری مسیر یادگیری...
      </div>
    );
  }

  if (!path) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center" dir="rtl">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">مسیر یادگیری یافت نشد</h2>
        <button
          onClick={() => navigate('/learning-paths')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به مسیرهای یادگیری
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'مسیرهای یادگیری', path: '/learning-paths' },
          { label: path.titleFa }
        ]}
        onNavigate={navigate}
      />

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800/80 border border-emerald-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20" />
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              مسیر یادگیری موضوعی
            </span>
            {path.estimatedMinutes && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {path.estimatedMinutes} دقیقه زمان تقریبی
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4 leading-tight">
            {path.titleFa}
          </h1>

          <p className="text-neutral-700 dark:text-neutral-200 text-base sm:text-lg leading-relaxed mb-6">
            {path.description}
          </p>

          <div className="bg-white/90 dark:bg-neutral-800/90 p-4 rounded-2xl border border-emerald-200/60 dark:border-neutral-700 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 shadow-xs">
            <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">این مسیر مناسب چه کسانی است؟</strong>
            {path.targetAudience}
          </div>
        </div>
      </div>

      {/* Timeline steps */}
      <div className="relative border-r-2 border-emerald-200 dark:border-neutral-700 mr-4 sm:mr-6 pr-6 sm:pr-8 space-y-8">
        {path.steps.map((step) => {
          const term = stepTerms[step.termSlug];
          return (
            <div key={step.stepNumber} className="relative group">
              {/* Step indicator node */}
              <div className="absolute -right-[33px] sm:-right-[41px] top-1.5 w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-sm flex items-center justify-center ring-4 ring-white dark:ring-neutral-900 shadow-xs">
                {step.stepNumber}
              </div>

              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 sm:p-6 hover:border-emerald-400 transition-all shadow-xs">
                {term ? (
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/term/${term.slug}`)}
                          className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                          {step.stepNumber}. {term.term} ({term.persianName})
                        </button>
                      </div>
                      <button
                        onClick={() => navigate(`/term/${term.slug}`)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        مطالعه اصطلاح کامل
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                      {term.definition}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-700/60 text-xs">
                      <div className="bg-emerald-50/70 dark:bg-neutral-900/60 p-3 rounded-xl border border-emerald-100 dark:border-neutral-800">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                          چرا باید این اصطلاح را یاد بگیرید؟
                        </span>
                        <p className="text-neutral-700 dark:text-neutral-300">{step.whyLearnThis}</p>
                      </div>

                      <div className="bg-amber-50/70 dark:bg-neutral-900/60 p-3 rounded-xl border border-amber-100 dark:border-neutral-800">
                        <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                          نکته طلایی و برداشت اصلی:
                        </span>
                        <p className="text-neutral-700 dark:text-neutral-300">{step.keyTakeaway}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-neutral-800 dark:text-neutral-200">
                      گام {step.stepNumber}: {step.termSlug.toUpperCase()}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">{step.whyLearnThis}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
