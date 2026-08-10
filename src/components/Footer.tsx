import React from 'react';
import { BookOpen, Compass, GitCompare, Layers, Bookmark, PlusCircle, Activity, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/60 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm transition-colors" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center font-bold text-sm shadow-xs">
                NW
              </div>
              <div>
                <span className="font-extrabold text-base text-neutral-900 dark:text-neutral-100 block">نون ویکی</span>
                <span className="text-[11px] font-english text-neutral-400 dark:text-neutral-500">wiki.nounproject.ir</span>
              </div>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              دانشنامه تخصصی و کاربردی برای اصطلاحات دنیای کار، مدیریت، محصول، مارکتینگ، مالی و فناوری.
            </p>
            <div className="pt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>پایگاه مرجع واژه‌شناسی کسب‌وکارهای مدرن</span>
            </div>
          </div>

          {/* Column 2: Main Knowledge Base Sections */}
          <div>
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-4 flex items-center gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-2">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>پایگاه دانش</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors hover:underline text-right"
                >
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors hover:underline text-right"
                >
                  فهرست کامل اصطلاحات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/categories')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors hover:underline text-right"
                >
                  دسته‌بندی‌های موضوعی
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/favorites')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors hover:underline text-right flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                  <span>اصطلاحات نشان‌شده من</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Learning & Analysis Engines */}
          <div>
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-4 flex items-center gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-2">
              <Compass className="w-4 h-4 text-indigo-500" />
              <span>موتورهای یادگیری</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/comparisons')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors hover:underline text-right flex items-center gap-1.5"
                >
                  <GitCompare className="w-3.5 h-3.5 text-amber-500" />
                  <span>جدول مقایسه‌ها و تفاوت‌ها</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/learning-paths')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors hover:underline text-right flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-500" />
                  <span>مسیرهای گام‌به‌گام یادگیری</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/clusters')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors hover:underline text-right flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  <span>خوشه‌های دانش تخصصی</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Community & Tools */}
          <div>
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-4 flex items-center gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>ابزارها و مشارکت</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/suggest')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors hover:underline text-right flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>پیشنهاد اصطلاح جدید</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/audit')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors hover:underline text-right flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>پایش سلامت محتوا</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-neutral-200/70 dark:border-neutral-800/80 py-4 text-center text-xs text-neutral-500 dark:text-neutral-500 font-english">
        © {new Date().getFullYear()} Noun Wiki — Practical Business & Technology Glossary. All rights reserved.
      </div>
    </footer>
  );
};

