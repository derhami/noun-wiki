import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Send, ArrowRight } from 'lucide-react';
import { termRepository } from '../repositories/termRepository';
import { Breadcrumb } from '../components/Breadcrumb';

interface SuggestPageProps {
  onNavigate: (path: string) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const SuggestPage: React.FC<SuggestPageProps> = ({ onNavigate, onShowToast }) => {
  const [term, setTerm] = useState('');
  const [context, setContext] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !context.trim()) {
      onShowToast('لطفاً عنوان اصطلاح و زمینه استفاده را وارد کنید', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await termRepository.suggestTerm({
        term: term.trim(),
        context: context.trim(),
        email: email.trim() || undefined
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      onShowToast('پیشنهاد شما با موفقیت ثبت شد', 'success');
    } catch {
      setIsSubmitting(false);
      onShowToast('خطایی در ثبت پیشنهاد رخ داد. دوباره تلاش کنید.', 'error');
    }
  };

  const handleReset = () => {
    setTerm('');
    setContext('');
    setEmail('');
    setIsSuccess(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumb items={[{ label: 'پیشنهاد اصطلاح جدید' }]} onNavigate={onNavigate} />
      
      {/* Top Header */}
      <div className="space-y-2">

        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
          <PlusCircle className="w-4 h-4 text-blue-500" />
          <span>مشارکت در توسعه دانشنامه</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100">
          اصطلاحی پیدا نکردی؟
        </h1>

        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          اگر کلمه‌ای در جلسات، ایمیل‌ها، آگهی‌های استخدام یا محیط کار شنیده‌ای که در Noun Wiki نیست، برای ما ارسالش کن تا پس از بررسی اضافه کنیم.
        </p>
      </div>

      {isSuccess ? (
        <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl text-center space-y-4 animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            پیشنهاد شما ثبت شد!
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
            پیشنهاد شما با موفقیت دریافت شد. پس از بررسی و تنظیم معادل فارسی و تعریف ساده، به دانشنامه اضافه خواهد شد.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-medium text-neutral-800 dark:text-neutral-200"
            >
              ارسال اصطلاح جدید
            </button>
            <button
              onClick={() => onNavigate('/terms')}
              className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-xl text-xs font-medium"
            >
              مرور اصطلاحات
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl space-y-5 shadow-xs">
          
          {/* Term name input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200">
              اصطلاح یا کلمه <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="مثلاً B2B، OKR، Onboarding یا مدیر محصول"
              required
              className="w-full h-11 px-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
            />
          </div>

          {/* Usage context text area */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200">
              توضیح یا زمینه استفاده <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="این کلمه را کجا شنیدی؟ در چه زمینه‌ای استفاده شد؟ یا اگر تعریفی از آن می‌دانی بنویس..."
              rows={4}
              required
              className="w-full p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Email input optional */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200">
              ایمیل شما <span className="text-neutral-400 font-normal">(اختیاری)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="برای اطلاع‌رسانی پس از انتشار اصطلاح"
              dir="ltr"
              className="w-full h-11 px-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors font-english text-right"
            />
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-xl text-xs font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'در حال ثبت...' : 'ارسال پیشنهاد'}</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
