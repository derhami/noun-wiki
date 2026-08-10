import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, X } from 'lucide-react';
import { Term, TermDifficulty } from '../types';
import { CATEGORIES } from '../data/categoriesData';
import { termRepository } from '../repositories/termRepository';
import { TermCard } from '../components/TermCard';
import { EmptyState } from '../components/EmptyState';
import { Breadcrumb } from '../components/Breadcrumb';

interface TermsPageProps {
  onNavigate: (path: string) => void;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
  initialQuery?: string;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  onNavigate,
  favorites,
  onToggleFavorite,
  initialQuery = ''
}) => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [didYouMean, setDidYouMean] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<TermDifficulty | null>(null);
  const [popularOnly, setPopularOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'alphabetical' | 'popular'>('popular');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      setIsLoading(true);
      const searchResult = await termRepository.searchWithDetails({
        query,
        category: selectedCategory,
        difficulty: selectedDifficulty,
        popularOnly,
        sortBy
      });
      setTerms(searchResult.terms);
      setDidYouMean(searchResult.didYouMean);
      setIsLoading(false);
    };

    fetchTerms();
  }, [query, selectedCategory, selectedDifficulty, popularOnly, sortBy]);


  const clearAllFilters = () => {
    setQuery('');
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setPopularOnly(false);
    setSortBy('popular');
  };

  const hasActiveFilters = query || selectedCategory || selectedDifficulty || popularOnly;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumb items={[{ label: 'فهرست اصطلاحات' }]} onNavigate={onNavigate} />
      
      {/* Header title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 mb-2">
          دانشنامه اصطلاحات
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          لیست کامل اصطلاحات دنیای کار، مدیریت، محصول، برنامه‌نویسی و کسب‌وکار
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl space-y-4 shadow-xs">
        
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی عنوان، نام فارسی یا انگلیسی، معادل و..."
            className="w-full h-11 pr-10 pl-10 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-neutral-100 dark:border-neutral-800">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Select */}
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none"
            >
              <option value="">همه دسته‌بندی‌ها</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.slug}>{c.titleFa}</option>
              ))}
            </select>

            {/* Difficulty Select */}
            <select
              value={selectedDifficulty || ''}
              onChange={(e) => setSelectedDifficulty((e.target.value as TermDifficulty) || null)}
              className="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none"
            >
              <option value="">همه سطح‌ها</option>
              <option value="beginner">مبتدی (مقدماتی)</option>
              <option value="intermediate">متوسط</option>
              <option value="advanced">پیشرفته</option>
            </select>

            {/* Popular Toggle button */}
            <button
              onClick={() => setPopularOnly(!popularOnly)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-colors ${
                popularOnly
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>فقط محبوب‌ها</span>
            </button>
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">مرتب‌سازی:</span>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                sortBy === 'popular'
                  ? 'bg-neutral-200 dark:bg-neutral-700 font-semibold text-neutral-900 dark:text-neutral-100'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              بر اساس محبوبیت
            </button>
            <button
              onClick={() => setSortBy('alphabetical')}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                sortBy === 'alphabetical'
                  ? 'bg-neutral-200 dark:bg-neutral-700 font-semibold text-neutral-900 dark:text-neutral-100'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              حروف الفبا
            </button>
          </div>

        </div>

        {/* Did You Mean Suggestion */}
        {didYouMean && query && (
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <span>آیا منظور شما این بود؟</span>
            <button
              onClick={() => setQuery(didYouMean)}
              className="font-bold underline hover:text-blue-900 dark:hover:text-blue-100"
            >
              «{didYouMean}»
            </button>
          </div>
        )}

        {/* Active Filters bar */}

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 text-xs text-neutral-500">
            <span>نمایش {terms.length} اصطلاح یافت‌شده</span>
            <button
              onClick={clearAllFilters}
              className="text-rose-500 hover:underline"
            >
              پاک کردن همه فیلترها
            </button>
          </div>
        )}
      </div>

      {/* Terms Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-44 rounded-2xl bg-neutral-200/50 dark:bg-neutral-800/50 animate-pulse" />
          ))}
        </div>
      ) : terms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {terms.map((term) => (
            <TermCard
              key={term.id}
              term={term}
              isFavorite={favorites.includes(term.slug.toLowerCase())}
              onToggleFavorite={onToggleFavorite}
              onClick={(slug) => onNavigate(`/term/${slug}`)}
              onCategoryClick={(catSlug) => onNavigate(`/category/${catSlug}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          onSuggestClick={() => onNavigate('/suggest')}
          onClearFilters={clearAllFilters}
        />
      )}

    </div>
  );
};
