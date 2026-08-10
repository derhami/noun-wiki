import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
import { Term } from '../types';
import { termRepository } from '../repositories/termRepository';
import { TermCard } from '../components/TermCard';
import { EmptyState } from '../components/EmptyState';
import { Breadcrumb } from '../components/Breadcrumb';

interface FavoritesPageProps {
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
  onClearFavorites: () => void;
  onNavigate: (path: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
  onToggleFavorite,
  onClearFavorites,
  onNavigate
}) => {
  const [favoriteTerms, setFavoriteTerms] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      if (favorites.length === 0) {
        setFavoriteTerms([]);
        setIsLoading(false);
        return;
      }

      const all = await termRepository.getAllTerms();
      const matched = favorites
        .map(slug => all.find(t => t.slug.toLowerCase() === slug.toLowerCase()))
        .filter((t): t is Term => t !== undefined);

      setFavoriteTerms(matched);
      setIsLoading(false);
    };

    loadFavorites();
  }, [favorites]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumb items={[{ label: 'اصطلاحات نشان‌شده' }]} onNavigate={onNavigate} />
      
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span>نشان‌شده‌های شما</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100">
            اصطلاحات ذخیره‌شده
          </h1>
        </div>

        {favoriteTerms.length > 0 && (
          <button
            onClick={onClearFavorites}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-medium hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>حذف همه</span>
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-44 rounded-2xl bg-neutral-200/50 dark:bg-neutral-800/50 animate-pulse" />
          ))}
        </div>
      ) : favoriteTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteTerms.map((term) => (
            <TermCard
              key={term.id}
              term={term}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onClick={(slug) => onNavigate(`/term/${slug}`)}
              onCategoryClick={(catSlug) => onNavigate(`/category/${catSlug}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="هنوز اصطلاحی را نشان نکرده‌اید"
          description="با کلیک روی آیکون نشان کردن در کنار هر اصطلاح، می‌توانید آن را برای مطالعه سریع ذخیره کنید."
          onClearFilters={() => onNavigate('/terms')}
        />
      )}

    </div>
  );
};
