import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'noun_wiki_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore write errors
    }
  }, [favorites]);

  const isFavorite = (slug: string) => {
    return favorites.includes(slug.toLowerCase());
  };

  const toggleFavorite = (slug: string) => {
    const normSlug = slug.toLowerCase();
    setFavorites(prev => {
      if (prev.includes(normSlug)) {
        return prev.filter(s => s !== normSlug);
      } else {
        return [...prev, normSlug];
      }
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
}
