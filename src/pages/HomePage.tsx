import React, { useState, useEffect } from 'react';
import { SearchBox } from '../components/SearchBox';
import { TermCard } from '../components/TermCard';
import { CATEGORIES } from '../data/categoriesData';
import { Term } from '../types';
import { termRepository } from '../repositories/termRepository';
import { Sparkles, ArrowLeft, PlusCircle, Briefcase, Clock, Layers, UserCheck } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
  recentlyViewedSlugs: string[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  favorites,
  onToggleFavorite,
  recentlyViewedSlugs
}) => {
  const [popularTerms, setPopularTerms] = useState<Term[]>([]);
  const [jobTitles, setJobTitles] = useState<Term[]>([]);
  const [recentTerms, setRecentTerms] = useState<Term[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const popular = await termRepository.getPopularTerms(8);
      const jobs = await termRepository.getJobTitles(6);
      setPopularTerms(popular);
      setJobTitles(jobs);

      if (recentlyViewedSlugs.length > 0) {
        const all = await termRepository.getAllTerms();
        const matched = recentlyViewedSlugs
          .map(slug => all.find(t => t.slug === slug))
          .filter((t): t is Term => t !== undefined);
        setRecentTerms(matched.slice(0, 6));
      }
    };
    loadData();
  }, [recentlyViewedSlugs]);

  const handleSearchSubmit = (query: string) => {
    onNavigate(`/terms?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>دانشنامه اصطلاحات دنیای کار و کسب‌وکار</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight sm:leading-tight mb-4">
          اصطلاحات دنیای کار را <span className="underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-8">ساده بفهم.</span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mb-8 leading-relaxed">
          هر کلمه‌ای را که در شرکت، جلسه، آگهی استخدام یا محیط حرفه‌ای می‌شنوی، اینجا جستجو کن و در چند ثانیه معنی ساده آن را متوجه شو.
        </p>

        {/* Main Hero Search Bar */}
        <div className="w-full">
          <SearchBox
            onSelectTerm={(slug) => onNavigate(`/term/${slug}`)}
            onSearchSubmit={handleSearchSubmit}
          />
        </div>

        {/* Discovery Engines Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-8">
          <button
            onClick={() => onNavigate('/comparisons')}
            className="p-4 bg-gradient-to-l from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 border border-amber-200/80 dark:border-slate-700 rounded-2xl text-right hover:border-amber-400 transition-all group flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block mb-0.5">جدول مقایسه اصطلاحات</span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">KPI vs OKR و موارد دیگر</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-amber-600 group-hover:translate-x-[-3px] transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('/learning-paths')}
            className="p-4 bg-gradient-to-l from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 border border-emerald-200/80 dark:border-slate-700 rounded-2xl text-right hover:border-emerald-400 transition-all group flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">مسیرهای یادگیری موضوعی</span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">از کجا شروع کنم؟ (نقشه راه)</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-emerald-600 group-hover:translate-x-[-3px] transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('/clusters')}
            className="p-4 bg-gradient-to-l from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 border border-indigo-200/80 dark:border-slate-700 rounded-2xl text-right hover:border-indigo-400 transition-all group flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 block mb-0.5">خوشه‌های دانش تخصصی</span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">شبکه مفاهیم و نقش‌ها</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-indigo-600 group-hover:translate-x-[-3px] transition-transform" />
          </button>
        </div>
      </section>

      {/* Popular Categories Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-neutral-500" />
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              دسته‌بندی‌های محبوب
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/categories')}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 transition-colors"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CATEGORIES.slice(0, 12).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate(`/category/${cat.slug}`)}
              className="p-3.5 bg-white dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-xl text-right transition-all group shadow-2xs hover:shadow-xs"
            >
              <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                {cat.titleFa}
              </div>
              <div className="text-[10px] text-neutral-400 font-english">
                {cat.titleEn}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Popular Terms Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-neutral-500" />
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              پرجستجوترین اصطلاحات
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/terms')}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 transition-colors"
          >
            <span>مشاهده همه اصطلاحات ({popularTerms.length}+)</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTerms.map((term) => (
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
      </section>

      {/* Job Titles Spotlight Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 bg-neutral-100/70 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                <UserCheck className="w-4 h-4" />
                <span>عنوان‌های شغلی و موقعیت‌ها</span>
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                این اشخاص در شرکت‌ها دقیقاً چه کاره‌اند؟
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/category/jobs')}
              className="self-start sm:self-auto px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors shadow-2xs"
            >
              مشاهده تمام موقعیت‌های شغلی
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobTitles.slice(0, 6).map((term) => (
              <div
                key={term.id}
                onClick={() => onNavigate(`/term/${term.slug}`)}
                className="p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold font-english text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {term.term}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">{term.persianName}</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {term.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed Section (if exists) */}
      {recentTerms.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-neutral-500" />
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              اصطلاحات اخیر شما
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {recentTerms.map((term) => (
              <button
                key={term.id}
                onClick={() => onNavigate(`/term/${term.slug}`)}
                className="shrink-0 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-right transition-colors"
              >
                <div className="text-xs font-bold font-english text-neutral-900 dark:text-neutral-100">
                  {term.term}
                </div>
                <div className="text-[10px] text-neutral-500">
                  {term.persianName}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Suggest Term CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-right">
            <h3 className="text-lg font-bold mb-1">اصطلاحی پیدا نکردی؟</h3>
            <p className="text-xs text-neutral-300 dark:text-neutral-600 leading-relaxed">
              اگر اصطلاحی در جلسات یا محیط کار شنیدی که در دانشنامه نیست، برامون بفرست تا معنیش رو اضافه کنیم.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/suggest')}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 text-xs font-bold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ارسال پیشنهاد اصطلاح</span>
          </button>
        </div>
      </section>

    </div>
  );
};
