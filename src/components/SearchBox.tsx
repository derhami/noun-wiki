import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowLeft, Sparkles } from 'lucide-react';
import { Term } from '../types';
import { termRepository } from '../repositories/termRepository';

interface SearchBoxProps {
  onSelectTerm: (slug: string) => void;
  onSearchSubmit?: (query: string) => void;
  autoFocus?: boolean;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  onSelectTerm,
  onSearchSubmit,
  autoFocus = false,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Term[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const [didYouMean, setDidYouMean] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        setDidYouMean(undefined);
        setIsOpen(false);
        return;
      }

      const result = await termRepository.searchWithDetails({ query, sortBy: 'popular' });
      setSuggestions(result.terms.slice(0, 7)); // Max 7 suggestions
      setDidYouMean(result.didYouMean);
      setIsOpen(true);
      setSelectedIndex(-1);
    };

    const timer = setTimeout(fetchSuggestions, 120);
    return () => clearTimeout(timer);
  }, [query]);


  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter' && query.trim() && onSearchSubmit) {
        onSearchSubmit(query.trim());
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelect(suggestions[selectedIndex].slug);
      } else if (onSearchSubmit && query.trim()) {
        onSearchSubmit(query.trim());
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    onSelectTerm(slug);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative flex items-center w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && suggestions.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="مثلاً CEO، KPI، ERP یا مدیر محصول..."
          className="w-full h-14 sm:h-16 pr-12 pl-12 sm:pl-28 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-neutral-200/50 dark:shadow-none focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-800/50 text-base sm:text-lg transition-all"
          dir="rtl"
        />

        <Search className="absolute right-4 w-5 h-5 text-neutral-400 pointer-events-none" />

        {query ? (
          <button
            onClick={handleClear}
            className="absolute left-3 sm:left-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <span className="hidden sm:inline-flex absolute left-4 items-center gap-1 text-[11px] font-english text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800/80 px-2 py-1 rounded-md border border-neutral-200 dark:border-neutral-700/50">
            Search
          </span>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full right-0 left-0 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-neutral-100 dark:divide-neutral-800/60 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-2">
            {suggestions.map((term, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={term.id}
                  onClick={() => handleSelect(term.slug)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-right p-3 rounded-xl flex items-start justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm font-english text-neutral-900 dark:text-neutral-100">
                        {term.term}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        ({term.persianName})
                      </span>
                      {term.isPopular && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded">
                          <Sparkles className="w-2.5 h-2.5" />
                          محبوب
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 leading-relaxed">
                      {term.definition}
                    </p>
                  </div>

                  <ArrowLeft className="w-4 h-4 text-neutral-400 mt-1 shrink-0 rotate-180" />
                </button>
              );
            })}
          </div>

          <div className="p-2.5 bg-neutral-50 dark:bg-neutral-900/60 text-center">
            <button
              onClick={() => onSearchSubmit && onSearchSubmit(query)}
              className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 font-medium transition-colors"
            >
              مشاهده تمام نتایج برای «{query}»
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
