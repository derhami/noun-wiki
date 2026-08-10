import React, { useEffect, useState } from 'react';
import { termRepository } from '../repositories/termRepository';
import { useRouter } from '../hooks/useRouter';
import { CheckCircle2, AlertTriangle, ShieldCheck, FileCheck, ArrowRight, Link, Search } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

export const AuditPage: React.FC = () => {
  const [auditResult, setAuditResult] = useState<{
    totalTerms: number;
    duplicateSlugs: string[];
    brokenReferences: { termSlug: string; brokenRef: string }[];
    missingPersianNames: string[];
    termsWithoutExamples: string[];
  } | null>(null);

  const { navigate } = useRouter();

  useEffect(() => {
    const result = termRepository.validateContent();
    setAuditResult(result);
  }, []);

  if (!auditResult) return null;

  const isHealthy =
    auditResult.duplicateSlugs.length === 0 &&
    auditResult.brokenReferences.length === 0 &&
    auditResult.missingPersianNames.length === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: 'پایش سلامت محتوا' }]}
        onNavigate={navigate}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-md mb-8">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">گزارش و ابزار پایش سلامت محتوا (Audit System)</h1>
            <p className="text-slate-300 text-sm mt-1">تست بن‌بست‌های لینک‌دهی، رفرنس‌های نامعتبر و سلامت داده‌های دانشنامه</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-xs text-slate-400 block mb-1">کل اصطلاحات</span>
            <span className="text-2xl font-bold text-white">{auditResult.totalTerms}</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-xs text-slate-400 block mb-1">اسلاگ‌های تکراری</span>
            <span className={`text-2xl font-bold ${auditResult.duplicateSlugs.length === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {auditResult.duplicateSlugs.length}
            </span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-xs text-slate-400 block mb-1">ارتباطات شکسته‌شده</span>
            <span className={`text-2xl font-bold ${auditResult.brokenReferences.length === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {auditResult.brokenReferences.length}
            </span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-xs text-slate-400 block mb-1">وضعیت کلی سیستم</span>
            <span className={`text-sm font-bold block mt-1 ${isHealthy ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isHealthy ? 'عالی و سالم' : 'نیازمند بررسی'}
            </span>
          </div>
        </div>
      </div>

      {/* Duplicate Slugs */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 mb-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-amber-500" />
          بررسی اسلاگ‌های تکراری
        </h2>
        {auditResult.duplicateSlugs.length === 0 ? (
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm bg-emerald-50 dark:bg-slate-900/50 p-3 rounded-xl border border-emerald-200 dark:border-slate-700">
            <CheckCircle2 className="w-5 h-5" />
            هیچ اسلاگ تکراری یافت نشد. تمام شناسه اصطلاحات یکتا هستند.
          </div>
        ) : (
          <div className="space-y-2">
            {auditResult.duplicateSlugs.map((slug, i) => (
              <div key={i} className="text-rose-600 dark:text-rose-400 font-mono text-xs bg-rose-50 dark:bg-slate-900/50 p-2 rounded-lg">
                تکراری: {slug}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Broken References */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 mb-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Link className="w-5 h-5 text-amber-500" />
          بررسی بن‌بست‌ها و ارجاعات شکسته‌شده (Broken References)
        </h2>
        {auditResult.brokenReferences.length === 0 ? (
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm bg-emerald-50 dark:bg-slate-900/50 p-3 rounded-xl border border-emerald-200 dark:border-slate-700">
            <CheckCircle2 className="w-5 h-5" />
            تمام ارجاعات بین اصطلاحات (سلسله مراتب، مرتبط و کلمات هم‌خانواده) کاملاً معتبر بوده و هیچ لینک بن‌بستی وجود ندارد.
          </div>
        ) : (
          <div className="space-y-2">
            {auditResult.brokenReferences.map((ref, i) => (
              <div key={i} className="flex items-center justify-between text-xs bg-amber-50 dark:bg-slate-900/50 p-3 rounded-xl border border-amber-200 dark:border-slate-700">
                <span className="font-semibold text-slate-800 dark:text-slate-200">اصطلاح مبدا: {ref.termSlug}</span>
                <span className="text-amber-700 dark:text-amber-400 font-mono">ارجاع ناموجود: {ref.brokenRef}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Missing Examples or Persian Names */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          کیفیت داده‌ها و مثال‌های کاربردی
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
            <span className="text-slate-700 dark:text-slate-300">تعداد اصطلاحات بدون ترجمه یا اسم فارسی:</span>
            <span className="font-bold text-slate-900 dark:text-white">{auditResult.missingPersianNames.length}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
            <span className="text-slate-700 dark:text-slate-300">تعداد اصطلاحات بدون مثال در محیط کار:</span>
            <span className="font-bold text-slate-900 dark:text-white">{auditResult.termsWithoutExamples.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
