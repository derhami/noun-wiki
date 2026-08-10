import React from 'react';
import { Home, ChevronLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center flex-wrap gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-6" aria-label="راهنمای مسیر">
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus:outline-hidden"
      >
        <Home className="w-3.5 h-3.5 shrink-0" />
        <span>خانه</span>
      </button>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronLeft className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600 shrink-0" />
          {item.path ? (
            <button
              onClick={() => onNavigate(item.path!)}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus:outline-hidden"
            >
              {item.label}
            </button>
          ) : (
            <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[200px] sm:max-w-xs">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
