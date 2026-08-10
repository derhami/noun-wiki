import React, { useEffect, useState } from 'react';
import { Term, TermComparison } from '../types';
import { termRepository } from '../repositories/termRepository';
import { GitCompare, CheckCircle2, ArrowLeft, BookOpen, Briefcase, MessageSquare, Lightbulb, Sparkles } from 'lucide-react';

interface ComparisonViewProps {
  termASlug: string;
  termBSlug: string;
  comparisonSlug?: string;
  onNavigateTerm?: (slug: string) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  termASlug,
  termBSlug,
  comparisonSlug,
  onNavigateTerm,
}) => {
  const [termA, setTermA] = useState<Term | null>(null);
  const [termB, setTermB] = useState<Term | null>(null);
  const [comparison, setComparison] = useState<TermComparison | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadData = async () => {
      const [tA, tB] = await Promise.all([
        termRepository.getTermBySlug(termASlug),
        termRepository.getTermBySlug(termBSlug),
      ]);

      let comp: TermComparison | null = null;
      if (comparisonSlug) {
        comp = await termRepository.getComparisonBySlug(comparisonSlug);
      }
      if (!comp) {
        // Try finding a matching comparison for these two terms
        const compsForA = await termRepository.getComparisonsForTerm(termASlug);
        comp = compsForA.find(
          (c) =>
            (c.termASlug.toLowerCase() === termASlug.toLowerCase() && c.termBSlug.toLowerCase() === termBSlug.toLowerCase()) ||
            (c.termASlug.toLowerCase() === termBSlug.toLowerCase() && c.termBSlug.toLowerCase() === termASlug.toLowerCase())
        ) || null;
      }

      if (isMounted) {
        setTermA(tA);
        setTermB(tB);
        setComparison(comp);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [termASlug, termBSlug, comparisonSlug]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 text-center text-neutral-500 animate-pulse" dir="rtl">
        در حال گردآوری و تحلیل داده‌های مقایسه‌ای...
      </div>
    );
  }

  if (!termA && !termB) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 text-center text-neutral-500" dir="rtl">
        اطلاعات مربوط به اصطلاحات مورد نظر برای مقایسه پیدا نشد.
      </div>
    );
  }

  const nameA = termA ? termA.term : termASlug.toUpperCase();
  const persianA = termA ? termA.persianName : '';
  const nameB = termB ? termB.term : termBSlug.toUpperCase();
  const persianB = termB ? termB.persianName : '';

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header Summary Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800/80 border border-amber-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-4">
            <GitCompare className="w-4 h-4" />
            <span>جدول مقایسه تطبیقی (Comparison View)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mb-3">
            مقایسه جامع {nameA} ({persianA}) با {nameB} ({persianB})
          </h1>

          {comparison ? (
            <p className="text-neutral-700 dark:text-neutral-200 text-sm sm:text-base leading-relaxed mb-6">
              {comparison.summary}
            </p>
          ) : (
            <p className="text-neutral-700 dark:text-neutral-200 text-sm sm:text-base leading-relaxed mb-6">
              بررسی و تحلیل تفاوت‌های کلیدی، کاربردها و تعاریف این دو اصطلاح در محیط‌های کاری واقعی.
            </p>
          )}

          {comparison?.keyDifference && (
            <div className="bg-white/90 dark:bg-neutral-800/90 p-4 sm:p-5 rounded-2xl border border-amber-300/60 dark:border-neutral-700 flex items-start gap-3 shadow-xs">
              <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-neutral-900 dark:text-white text-sm block mb-1">
                  تفاوت اصلی در یک نگاه:
                </span>
                <p className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  {comparison.keyDifference}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Cards for Both Terms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {termA && (
          <div
            onClick={() => onNavigateTerm && onNavigateTerm(termA.slug)}
            className="cursor-pointer bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 hover:border-amber-400 transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold block mb-1">اصطلاح اول</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                {termA.term} <span className="text-sm font-normal text-neutral-500">({termA.persianName})</span>
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 mt-1">{termA.definition}</p>
            </div>
            <ArrowLeft className="w-5 h-5 text-neutral-400 shrink-0 mr-2" />
          </div>
        )}

        {termB && (
          <div
            onClick={() => onNavigateTerm && onNavigateTerm(termB.slug)}
            className="cursor-pointer bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 hover:border-amber-400 transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold block mb-1">اصطلاح دوم</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                {termB.term} <span className="text-sm font-normal text-neutral-500">({termB.persianName})</span>
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 mt-1">{termB.definition}</p>
            </div>
            <ArrowLeft className="w-5 h-5 text-neutral-400 shrink-0 mr-2" />
          </div>
        )}
      </div>

      {/* Structured Comparison Table */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            جدول مقایسه شاخص‌ها و ویژگی‌ها
          </h2>
          <span className="text-xs text-neutral-500 font-medium">تفکیک ابعاد</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="bg-neutral-100/80 dark:bg-neutral-900/90 border-b border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold">
                <th className="p-4 w-1/4">معیار مقایسه</th>
                <th className="p-4 w-3/8 text-amber-800 dark:text-amber-300">{nameA} ({persianA})</th>
                <th className="p-4 w-3/8 text-indigo-800 dark:text-indigo-300">{nameB} ({persianB})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700/60 text-neutral-700 dark:text-neutral-300">
              
              {/* Row 1: Simple Definition */}
              <tr className="hover:bg-neutral-50/80 dark:hover:bg-neutral-900/30 transition-colors">
                <td className="p-4 font-bold text-neutral-900 dark:text-white bg-neutral-50/50 dark:bg-neutral-900/20">
                  تعریف ساده
                </td>
                <td className="p-4 leading-relaxed">{termA?.simpleDefinition || termA?.definition || '-'}</td>
                <td className="p-4 leading-relaxed">{termB?.simpleDefinition || termB?.definition || '-'}</td>
              </tr>

              {/* Row 2: Workplace Meaning */}
              <tr className="hover:bg-neutral-50/80 dark:hover:bg-neutral-900/30 transition-colors">
                <td className="p-4 font-bold text-neutral-900 dark:text-white bg-neutral-50/50 dark:bg-neutral-900/20">
                  کاربرد در محیط کار
                </td>
                <td className="p-4 leading-relaxed">{termA?.workplaceMeaning || '-'}</td>
                <td className="p-4 leading-relaxed">{termB?.workplaceMeaning || '-'}</td>
              </tr>

              {/* Row 3: Real Example */}
              <tr className="hover:bg-neutral-50/80 dark:hover:bg-neutral-900/30 transition-colors">
                <td className="p-4 font-bold text-neutral-900 dark:text-white bg-neutral-50/50 dark:bg-neutral-900/20">
                  مثال گفتگو در جلسه
                </td>
                <td className="p-4 leading-relaxed italic text-amber-900 dark:text-amber-200 bg-amber-50/30 dark:bg-amber-950/20 rounded-lg">
                  {termA?.example || '-'}
                </td>
                <td className="p-4 leading-relaxed italic text-indigo-900 dark:text-indigo-200 bg-indigo-50/30 dark:bg-indigo-950/20 rounded-lg">
                  {termB?.example || '-'}
                </td>
              </tr>

              {/* Row 4: Formula / Indicator */}
              {(termA?.formula || termB?.formula) && (
                <tr className="hover:bg-neutral-50/80 dark:hover:bg-neutral-900/30 transition-colors">
                  <td className="p-4 font-bold text-neutral-900 dark:text-white bg-neutral-50/50 dark:bg-neutral-900/20">
                    فرمول یا معیار سنجش
                  </td>
                  <td className="p-4 font-mono dir-ltr text-left text-xs bg-neutral-100 dark:bg-neutral-900 p-2 rounded-lg">
                    {termA?.formula || 'فرمول مشخصی ندارد'}
                  </td>
                  <td className="p-4 font-mono dir-ltr text-left text-xs bg-neutral-100 dark:bg-neutral-900 p-2 rounded-lg">
                    {termB?.formula || 'فرمول مشخصی ندارد'}
                  </td>
                </tr>
              )}

              {/* Additional Curated Differences from TermComparison model if present */}
              {comparison?.differences.map((diff, index) => (
                <tr key={index} className="hover:bg-neutral-50/80 dark:hover:bg-neutral-900/30 transition-colors">
                  <td className="p-4 font-bold text-neutral-900 dark:text-white bg-neutral-50/50 dark:bg-neutral-900/20">
                    {diff.feature}
                  </td>
                  <td className="p-4 leading-relaxed">{diff.termAValue}</td>
                  <td className="p-4 leading-relaxed">{diff.termBValue}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* When to use section */}
      {(comparison?.whenToUseA || comparison?.whenToUseB) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparison.whenToUseA && (
            <div className="bg-amber-50/70 dark:bg-neutral-800/80 border border-amber-200 dark:border-neutral-700 rounded-2xl p-6">
              <h3 className="text-base font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                چه زمانی از {nameA} استفاده کنیم؟
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                {comparison.whenToUseA}
              </p>
            </div>
          )}

          {comparison.whenToUseB && (
            <div className="bg-indigo-50/70 dark:bg-neutral-800/80 border border-indigo-200 dark:border-neutral-700 rounded-2xl p-6">
              <h3 className="text-base font-bold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                چه زمانی از {nameB} استفاده کنیم؟
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                {comparison.whenToUseB}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
