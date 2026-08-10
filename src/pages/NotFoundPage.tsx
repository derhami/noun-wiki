import React from 'react';
import { SearchBox } from '../components/SearchBox';
import { HelpCircle } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
        <HelpCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
          این اصطلاح هنوز اینجا نیست
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
          صفحه یا اصطلاح مورد نظر شما یافت نشد. می‌توانید آن را جستجو کنید یا به ما پیشنهاد دهید.
        </p>
      </div>

      <div className="max-w-md mx-auto pt-2">
        <SearchBox
          onSelectTerm={(slug) => onNavigate(`/term/${slug}`)}
          onSearchSubmit={(q) => onNavigate(`/terms?q=${encodeURIComponent(q)}`)}
        />
      </div>

      <div className="pt-4 flex justify-center gap-3">
        <button
          onClick={() => onNavigate('/')}
          className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-xl text-xs font-semibold"
        >
          بازگشت به خانه
        </button>
        <button
          onClick={() => onNavigate('/suggest')}
          className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-semibold"
        >
          پیشنهاد این اصطلاح
        </button>
      </div>
    </div>
  );
};
