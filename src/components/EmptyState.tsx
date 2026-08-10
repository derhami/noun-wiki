import React from 'react';
import { SearchX, PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onSuggestClick?: () => void;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'اصطلاحی پیدا نشد',
  description = 'برای عبارت مورد نظر شما اصطلاحی در دانشنامه یافت نشد.',
  onSuggestClick,
  onClearFilters
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl my-6">
      <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mb-4">
        <SearchX className="w-6 h-6" />
      </div>

      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-1">
        {title}
      </h3>
      
      <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            پاک کردن فیلترها
          </button>
        )}

        {onSuggestClick && (
          <button
            onClick={onSuggestClick}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 text-xs font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>پیشنهاد افزودن این اصطلاح</span>
          </button>
        )}
      </div>
    </div>
  );
};
