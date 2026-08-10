import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/categoriesData';
import { termRepository } from '../repositories/termRepository';
import { ArrowLeft, Layers } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

interface CategoriesPageProps {
  onNavigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate }) => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadCounts = async () => {
      const allTerms = await termRepository.getAllTerms();
      const map: Record<string, number> = {};
      
      CATEGORIES.forEach(c => {
        const count = allTerms.filter(t => t.category === c.slug || t.subcategories?.includes(c.slug)).length;
        map[c.slug] = count;
      });
      setCounts(map);
    };

    loadCounts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumb items={[{ label: 'دسته‌بندی‌های موضوعی' }]} onNavigate={onNavigate} />
      
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
          <Layers className="w-4 h-4" />
          <span>دسته‌بندی موضوعی</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 mb-2">
          دسته‌بندی‌های اصطلاحات
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
          اصطلاحات را بر اساس حوزه تخصصی، دپارتمان شغلی یا زمینه کاری مرور کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const count = counts[cat.slug] || 0;
          return (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/category/${cat.slug}`)}
              className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-2xl transition-all cursor-pointer group shadow-2xs hover:shadow-md flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-english font-medium text-neutral-400">
                    {cat.titleEn}
                  </span>
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    {count} اصطلاح
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.titleFa}
                </h3>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center justify-end gap-1 text-xs font-medium text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
                <span>مشاهده دسته‌بندی</span>
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
