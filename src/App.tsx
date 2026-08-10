import React, { useState } from 'react';
import { useRouter } from './hooks/useRouter';
import { useFavorites } from './hooks/useFavorites';
import { useRecentlyViewed } from './hooks/useRecentlyViewed';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { Toast, ToastMessage } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { TermsPage } from './pages/TermsPage';
import { TermDetailPage } from './pages/TermDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SuggestPage } from './pages/SuggestPage';
import { ComparisonsListPage } from './pages/ComparisonsListPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { LearningPathsListPage } from './pages/LearningPathsListPage';
import { LearningPathDetailPage } from './pages/LearningPathDetailPage';
import { ClustersListPage } from './pages/ClustersListPage';
import { ClusterDetailPage } from './pages/ClusterDetailPage';
import { AuditPage } from './pages/AuditPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const { route, navigate } = useRouter();
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({
      id: String(Date.now()),
      text,
      type
    });
  };

  const handleToggleFavorite = (slug: string) => {
    const isFavBefore = favorites.includes(slug.toLowerCase());
    toggleFavorite(slug);
    if (!isFavBefore) {
      showToast('اصطلاح به نشان‌شده‌ها اضافه شد', 'success');
    } else {
      showToast('اصطلاح از نشان‌شده‌ها حذف شد', 'info');
    }
  };

  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return (
          <HomePage
            onNavigate={navigate}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            recentlyViewedSlugs={recentlyViewed}
          />
        );

      case 'terms':
        return (
          <TermsPage
            onNavigate={navigate}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            initialQuery={route.searchParams.q || ''}
          />
        );

      case 'term-detail':
        return (
          <TermDetailPage
            slug={route.params.slug}
            onNavigate={navigate}
            isFavorite={favorites.includes((route.params.slug || '').toLowerCase())}
            onToggleFavorite={handleToggleFavorite}
            onAddRecentlyViewed={addRecentlyViewed}
            onShowToast={showToast}
          />
        );

      case 'categories':
        return <CategoriesPage onNavigate={navigate} />;

      case 'category-detail':
        return (
          <CategoryDetailPage
            slug={route.params.slug}
            onNavigate={navigate}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'favorites':
        return (
          <FavoritesPage
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onClearFavorites={clearFavorites}
            onNavigate={navigate}
          />
        );

      case 'suggest':
        return (
          <SuggestPage
            onNavigate={navigate}
            onShowToast={showToast}
          />
        );

      case 'comparisons':
        return <ComparisonsListPage />;

      case 'compare-detail':
        return <ComparisonPage slug={route.params.slug} />;

      case 'learning-paths':
        return <LearningPathsListPage />;

      case 'learning-path-detail':
        return <LearningPathDetailPage slug={route.params.slug} />;

      case 'clusters':
        return <ClustersListPage />;

      case 'cluster-detail':
        return <ClusterDetailPage slug={route.params.slug} />;

      case 'audit':
        return <AuditPage />;

      case 'not-found':
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors">
      
      {/* Top Header */}
      <Header
        currentPath={route.path}
        onNavigate={navigate}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Quick Search Modal (Cmd+K) */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectTerm={(slug) => navigate(`/term/${slug}`)}
        onSearchSubmit={(q) => navigate(`/terms?q=${encodeURIComponent(q)}`)}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
