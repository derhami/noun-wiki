import React from 'react';
import { Search, Moon, Sun, Bookmark, BookOpen, Layers, PlusCircle, GitCompare, Compass } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearchModal: () => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearchModal,
  favoritesCount
}) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'اصطلاحات', path: '/terms', icon: BookOpen },
    { label: 'دسته‌بندی‌ها', path: '/categories', icon: Layers },
    { label: 'مقایسه‌ها', path: '/comparisons', icon: GitCompare },
    { label: 'مسیرهای یادگیری', path: '/learning-paths', icon: Compass },
    { label: 'خوشه‌های دانش', path: '/clusters', icon: Layers },
    { label: 'پیشنهاد اصطلاح', path: '/suggest', icon: PlusCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-50/80 dark:bg-neutral-950/80 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Right side: Logo & Navigation */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate('/')} 
            className="flex items-center gap-2.5 text-right group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-neutral-100 leading-none">
                نون ویکی
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-english mt-0.5 tracking-wider">
                Noun Wiki
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Left side: Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearchModal}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
            title="جستجوی سریع (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span>جستجو...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded font-english">
              ⌘K
            </kbd>
          </button>

          {/* Favorites Button */}
          <button
            onClick={() => onNavigate('/favorites')}
            className={`relative p-2 rounded-lg border transition-colors ${
              currentPath === '/favorites'
                ? 'bg-neutral-200/70 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100'
                : 'bg-transparent border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900'
            }`}
            title="اصطلاحات نشان‌شده"
          >
            <Bookmark className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -left-1 w-4 h-4 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            title={theme === 'light' ? 'حالت تاریک' : 'حالت روشن'}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex md:hidden items-center justify-around border-t border-neutral-200/60 dark:border-neutral-800/60 px-2 py-1.5 bg-neutral-50/90 dark:bg-neutral-950/90 text-xs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-md transition-colors ${
                isActive
                  ? 'text-neutral-900 dark:text-neutral-100 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[11px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
