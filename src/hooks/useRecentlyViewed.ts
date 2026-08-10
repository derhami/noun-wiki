import { useState, useEffect } from 'react';

const RECENT_KEY = 'noun_wiki_recently_viewed';
const MAX_RECENT = 10;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed));
    } catch {
      // Ignore
    }
  }, [recentlyViewed]);

  const addRecentlyViewed = (slug: string) => {
    const normSlug = slug.toLowerCase();
    setRecentlyViewed(prev => {
      const filtered = prev.filter(s => s !== normSlug);
      return [normSlug, ...filtered].slice(0, MAX_RECENT);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return { recentlyViewed, addRecentlyViewed, clearRecentlyViewed };
}
