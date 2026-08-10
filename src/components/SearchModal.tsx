import React, { useEffect } from 'react';
import { SearchBox } from './SearchBox';
import { X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTerm: (slug: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTerm,
  onSearchSubmit
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-neutral-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-4 sm:p-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            جستجوی سریع در نون ویکی
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <SearchBox
          autoFocus={true}
          onSelectTerm={(slug) => {
            onClose();
            onSelectTerm(slug);
          }}
          onSearchSubmit={(q) => {
            onClose();
            onSearchSubmit(q);
          }}
        />

        <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
          <div className="flex items-center gap-2">
            <span>برای انتخاب: <kbd className="px-1 bg-neutral-100 dark:bg-neutral-800 rounded font-english">↑↓</kbd></span>
            <span>ورود: <kbd className="px-1 bg-neutral-100 dark:bg-neutral-800 rounded font-english">Enter</kbd></span>
          </div>
          <span>خروج: <kbd className="px-1 bg-neutral-100 dark:bg-neutral-800 rounded font-english">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
};
