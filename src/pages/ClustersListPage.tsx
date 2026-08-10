import React, { useEffect, useState } from 'react';
import { termRepository } from '../repositories/termRepository';
import { KnowledgeCluster } from '../types';
import { useRouter } from '../hooks/useRouter';
import { Layers, ArrowLeft, Boxes, TrendingUp, Coins, Brain, Code2, Sparkles } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

export const ClustersListPage: React.FC = () => {
  const [clusters, setClusters] = useState<KnowledgeCluster[]>([]);
  const { navigate } = useRouter();

  useEffect(() => {
    termRepository.getAllClusters().then(setClusters);
  }, []);

  const renderIcon = (name?: string) => {
    switch (name) {
      case 'Boxes': return <Boxes className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'Coins': return <Coins className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'Brain': return <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      default: return <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: 'خوشه‌های دانش' }]} onNavigate={navigate} />

      {/* Header */}
      <div className="relative overflow-hidden mb-8 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/40 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800/80 border border-indigo-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 mb-3">
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>خوشه‌های دانش تخصصی</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mb-3">
            شبکه مفاهیم و اصطلاحات هم‌بسته
          </h1>
          
          <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed text-sm sm:text-base">
            خوشه‌های دانش مجموعه‌ای تمام‌عیار از اصطلاحات کلیدی، نقش‌های شغلی مرتبط، مقایسه‌ها و مسیرهای یادگیری در یک حوزه موضوعی خاص هستند.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clusters.map((cluster) => (
          <div
            key={cluster.id}
            onClick={() => navigate(`/cluster/${cluster.slug}`)}
            className="group cursor-pointer bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-50 dark:bg-neutral-700/60 rounded-xl">
                  {renderIcon(cluster.iconName)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cluster.titleFa}
                  </h2>
                  <span className="text-xs text-neutral-400 dir-ltr font-mono">{cluster.titleEn}</span>
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {cluster.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {cluster.coreTerms.slice(0, 6).map((termSlug) => (
                  <span
                    key={termSlug}
                    className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700/60 rounded-lg text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    {termSlug.toUpperCase()}
                  </span>
                ))}
                {cluster.coreTerms.length > 6 && (
                  <span className="px-2 py-1 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-xs text-neutral-400">
                    +{cluster.coreTerms.length - 6} مورد دیگر
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700/50 flex items-center justify-between text-indigo-600 dark:text-indigo-400 text-sm font-semibold group-hover:translate-x-[-4px] transition-transform">
              <span>ورود به خوشه دانش</span>
              <ArrowLeft className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
