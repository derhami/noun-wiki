import React from 'react';
import { CATEGORIES } from '../data/categoriesData';

interface CategoryBadgeProps {
  categorySlug: string;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  categorySlug,
  onClick,
  size = 'sm'
}) => {
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  const title = category ? category.titleFa : categorySlug;
  const colorClass = category ? category.color : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400';

  return (
    <span
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
      className={`inline-flex items-center gap-1 rounded-md font-medium border transition-all ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      } ${colorClass} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
    >
      {title}
    </span>
  );
};
