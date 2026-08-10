import React, { useEffect, useState } from 'react';
import { termRepository } from '../repositories/termRepository';
import { TermComparison } from '../types';
import { useRouter } from '../hooks/useRouter';
import { ArrowLeft, GitCompare, Sparkles, Compass } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

export const ComparisonsListPage: React.FC = () => {
  const [comparisons, setComparisons] = useState<TermComparison[]>([]);
  const { navigate } = useRouter();

  useEffect(() => {
    termRepository.getAllComparisons().then(setComparisons);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: 'جدول مقایسه‌ها' }]} onNavigate={navigate} />

      {/* Header */}
      <div className="relative overflow-hidden mb-8 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800/80 border border-amber-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-3">
            <GitCompare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>جدول مقایسه‌های تطبیقی</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-3">
            اصطلاحات نزدیک که نباید با هم اشتباه گرفته شوند
          </h1>
          
          <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed text-sm sm:text-base">
            جدول‌های مقایسه‌ای کاربردی برای درک تفاوت‌های ظریف، موارد کاربرد و مرز بین مفاهیم پرکاربرد در دنیای محصول، مارکتینگ، مالی و فناوری.
          </p>
        </div>
      </div>

      {/* Comparisons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisons.map((comp) => (
          <div
            key={comp.id}
            onClick={() => navigate(`/compare/${comp.slug}`)}
            className="group cursor-pointer bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  {comp.titleEn}
                </span>
                <span className="text-xs text-neutral-400 dir-ltr font-mono">
                  {comp.termASlug} vs {comp.termBSlug}
                </span>
              </div>

              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {comp.titleFa}
              </h2>

              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {comp.summary}
              </p>

              <div className="bg-neutral-50 dark:bg-neutral-900/60 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 font-medium mb-4">
                <strong className="text-amber-700 dark:text-amber-400 ml-1">تفاوت کلیدی:</strong>
                {comp.keyDifference}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700/50 flex items-center justify-between text-amber-600 dark:text-amber-400 text-sm font-semibold group-hover:translate-x-[-4px] transition-transform">
              <span>مشاهده جدول مقایسه کامل</span>
              <ArrowLeft className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
