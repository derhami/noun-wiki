import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/categoriesData';
import { termRepository } from '../repositories/termRepository';
import { Term } from '../types';
import { TermCard } from '../components/TermCard';
import { EmptyState } from '../components/EmptyState';
import { Layers } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

interface CategoryDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  slug,
  onNavigate,
  favorites,
  onToggleFavorite
}) => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const category = CATEGORIES.find(c => c.slug === slug);

  useEffect(() => {
    const loadTerms = async () => {
      setIsLoading(true);
      const res = await termRepository.getTermsByCategory(slug);
      setTerms(res);
      setIsLoading(false);
    };

    loadTerms();
  }, [slug]);

  if (!category) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          دسته‌بندی یافت نشد
        </h2>
        <button
          onClick={() => onNavigate('/categories')}
          className="px-4 py-2 bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 rounded-xl text-xs font-semibold"
        >
          بازگشت به دسته‌بندی‌ها
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'دسته‌بندی‌ها', path: '/categories' },
          { label: category.titleFa }
        ]}
        onNavigate={onNavigate}
      />

      {/* Category Hero Header */}
      <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
          <Layers className="w-4 h-4" />
          <span className="font-english">{category.titleEn}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100">
          {category.titleFa}
        </h1>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          {category.description}
        </p>

        <div className="pt-2 text-xs text-neutral-400 font-medium">
          شامل {terms.length} اصطلاح تخصصی
        </div>
      </div>

      {/* Terms list */}
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
              onClick={(termSlug) => onNavigate(`/term/${termSlug}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="هنوز اصطلاحی در این دسته ثبت نشده است"
          description="می‌توانید اولین اصطلاح را برای این دسته‌بندی ارسال کنید."
          onSuggestClick={() => onNavigate('/suggest')}
        />
      )}

    </div>
  );
};
