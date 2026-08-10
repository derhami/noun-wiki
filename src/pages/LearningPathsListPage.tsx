import React, { useEffect, useState } from 'react';
import { termRepository } from '../repositories/termRepository';
import { LearningPath } from '../types';
import { useRouter } from '../hooks/useRouter';
import { Compass, BookOpen, Clock, ArrowLeft, Target, Award } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

export const LearningPathsListPage: React.FC = () => {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const { navigate } = useRouter();

  useEffect(() => {
    termRepository.getAllLearningPaths().then(setPaths);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: 'مسیرهای یادگیری' }]} onNavigate={navigate} />

      {/* Header */}
      <div className="relative overflow-hidden mb-8 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800/80 border border-emerald-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>مسیرهای یادگیری موضوعی</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mb-3">
            از کجا شروع کنم؟ مسیر گام‌به‌گام اصطلاحات
          </h1>
          
          <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed text-sm sm:text-base">
            اگر نمی‌دانید اصطلاحات حوزه کاری خود را به چه ترتیبی یاد بگیرید، نقشه راه‌های زیر اصطلاحات پرکاربرد را گام به گام و با دلیل یادگیری به شما آموزش می‌دهند.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paths.map((path) => (
          <div
            key={path.id}
            onClick={() => navigate(`/learning-path/${path.slug}`)}
            className="group cursor-pointer bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <BookOpen className="w-3.5 h-3.5" />
                  {path.steps.length} گام یادگیری
                </span>
                {path.estimatedMinutes && (
                  <span className="inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                    <Clock className="w-3.5 h-3.5" />
                    {path.estimatedMinutes} دقیقه مطالعه
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {path.titleFa}
              </h2>

              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {path.description}
              </p>

              <div className="bg-neutral-50 dark:bg-neutral-900/60 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                <span className="font-bold text-neutral-700 dark:text-neutral-300 ml-1">مخاطبان هدف:</span>
                {path.targetAudience}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700/50 flex items-center justify-between text-emerald-600 dark:text-emerald-400 text-sm font-semibold group-hover:translate-x-[-4px] transition-transform">
              <span>مشاهده مسیر یادگیری</span>
              <ArrowLeft className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
