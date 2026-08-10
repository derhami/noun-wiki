import React, { useEffect, useState } from 'react';
import { termRepository } from '../repositories/termRepository';
import { TermComparison } from '../types';
import { useRouter } from '../hooks/useRouter';
import { ArrowRight } from 'lucide-react';
import { ComparisonView } from '../components/ComparisonView';
import { Breadcrumb } from '../components/Breadcrumb';

interface Props {
  slug: string;
}

export const ComparisonPage: React.FC<Props> = ({ slug }) => {
  const [comparison, setComparison] = useState<TermComparison | null>(null);
  const [termASlug, setTermASlug] = useState<string>('');
  const [termBSlug, setTermBSlug] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { navigate } = useRouter();

  useEffect(() => {
    setLoading(true);
    termRepository.getComparisonBySlug(slug).then(async (data) => {
      if (data) {
        setComparison(data);
        setTermASlug(data.termASlug);
        setTermBSlug(data.termBSlug);
      } else {
        // Check if slug is formatted like "termA-vs-termB"
        if (slug.includes('-vs-')) {
          const parts = slug.split('-vs-');
          setTermASlug(parts[0]);
          setTermBSlug(parts[1]);
        } else {
          setComparison(null);
        }
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-slate-500" dir="rtl">
        در حال بارگذاری مقایسه...
      </div>
    );
  }

  if (!termASlug || !termBSlug) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center" dir="rtl">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">مقایسه مورد نظر یافت نشد</h2>
        <button
          onClick={() => navigate('/comparisons')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl text-sm font-medium hover:bg-amber-600 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به لیست مقایسه‌ها
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8" dir="rtl">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'مقایسه‌ها', path: '/comparisons' },
          { label: comparison ? comparison.titleFa : `مقایسه ${termASlug.toUpperCase()} با ${termBSlug.toUpperCase()}` }
        ]}
        onNavigate={navigate}
      />

      {/* Main Comparison View Component */}
      <ComparisonView
        termASlug={termASlug}
        termBSlug={termBSlug}
        comparisonSlug={slug}
        onNavigateTerm={(targetSlug) => navigate(`/term/${targetSlug}`)}
      />
    </div>
  );
};

