import React from 'react';
import { Bookmark, Sparkles, ArrowLeft, Volume2 } from 'lucide-react';
import { Term } from '../types';
import { CategoryBadge } from './CategoryBadge';

interface TermCardProps {
  term: Term;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
  onClick: (slug: string) => void;
  onCategoryClick?: (categorySlug: string) => void;
}

export const TermCard: React.FC<TermCardProps> = ({
  term,
  isFavorite,
  onToggleFavorite,
  onClick,
  onCategoryClick
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(term.slug);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(term.term);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      onClick={() => onClick(term.slug)}
      className="group relative p-5 bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-2xl transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between gap-4"
    >
      <div>
        {/* Top bar: Term name & actions */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold font-english text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {term.term}
            </h3>
            {term.pronunciation && (
              <button
                onClick={handleSpeak}
                className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                title={`تلفظ: ${term.pronunciation}`}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            )}
            {term.isPopular && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-md">
                <Sparkles className="w-2.5 h-2.5" />
                محبوب
              </span>
            )}
          </div>

          <button
            onClick={handleFavoriteClick}
            className={`p-1.5 rounded-lg border transition-all ${
              isFavorite
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            title={isFavorite ? 'حذف از نشان‌شده‌ها' : 'نشان کردن اصطلاح'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500/20' : ''}`} />
          </button>
        </div>

        {/* English Full Name & Persian Name */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400 mb-3 font-medium">
          <span className="font-english text-neutral-700 dark:text-neutral-300">{term.fullName}</span>
          <span>•</span>
          <span className="text-neutral-800 dark:text-neutral-200">{term.persianName}</span>
        </div>

        {/* Definition preview */}
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {term.definition}
        </p>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800/60 mt-auto text-xs">
        <CategoryBadge
          categorySlug={term.category}
          onClick={() => onCategoryClick && onCategoryClick(term.category)}
        />

        <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors">
          <span>مشاهده</span>
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
        </div>
      </div>
    </div>
  );
};
