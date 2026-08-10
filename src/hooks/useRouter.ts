import { useState, useEffect } from 'react';

export interface RouteState {
  path: string; // e.g. '/', '/terms', '/term/ceo', '/category/business', '/favorites', '/suggest'
  page:
    | 'home'
    | 'terms'
    | 'term-detail'
    | 'categories'
    | 'category-detail'
    | 'favorites'
    | 'suggest'
    | 'comparisons'
    | 'compare-detail'
    | 'learning-paths'
    | 'learning-path-detail'
    | 'clusters'
    | 'cluster-detail'
    | 'audit'
    | 'not-found';
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

function parseHash(): RouteState {
  let hash = window.location.hash.replace(/^#/, '');
  if (!hash || hash === '') hash = '/';

  const [pathAndQuery] = hash.split('?');
  const path = pathAndQuery || '/';
  
  const searchParams: Record<string, string> = {};
  if (hash.includes('?')) {
    const queryString = hash.split('?')[1];
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((val, key) => {
      searchParams[key] = val;
    });
  }

  // Matching patterns
  if (path === '/' || path === '') {
    return { path, page: 'home', params: {}, searchParams };
  }

  if (path === '/terms') {
    return { path, page: 'terms', params: {}, searchParams };
  }

  if (path === '/categories') {
    return { path, page: 'categories', params: {}, searchParams };
  }

  if (path === '/favorites') {
    return { path, page: 'favorites', params: {}, searchParams };
  }

  if (path === '/suggest') {
    return { path, page: 'suggest', params: {}, searchParams };
  }

  if (path === '/comparisons') {
    return { path, page: 'comparisons', params: {}, searchParams };
  }

  if (path === '/learning-paths') {
    return { path, page: 'learning-paths', params: {}, searchParams };
  }

  if (path === '/clusters') {
    return { path, page: 'clusters', params: {}, searchParams };
  }

  if (path === '/audit') {
    return { path, page: 'audit', params: {}, searchParams };
  }

  // /compare/:slug
  const compareMatch = path.match(/^\/compare\/([^/]+)$/);
  if (compareMatch) {
    return { path, page: 'compare-detail', params: { slug: decodeURIComponent(compareMatch[1]) }, searchParams };
  }

  // /learning-path/:slug
  const lpMatch = path.match(/^\/learning-path\/([^/]+)$/);
  if (lpMatch) {
    return { path, page: 'learning-path-detail', params: { slug: decodeURIComponent(lpMatch[1]) }, searchParams };
  }

  // /cluster/:slug
  const clusterMatch = path.match(/^\/cluster\/([^/]+)$/);
  if (clusterMatch) {
    return { path, page: 'cluster-detail', params: { slug: decodeURIComponent(clusterMatch[1]) }, searchParams };
  }

  // /term/:slug
  const termMatch = path.match(/^\/term\/([^/]+)$/);
  if (termMatch) {
    return { path, page: 'term-detail', params: { slug: decodeURIComponent(termMatch[1]) }, searchParams };
  }

  // /category/:slug
  const catMatch = path.match(/^\/category\/([^/]+)$/);
  if (catMatch) {
    return { path, page: 'category-detail', params: { slug: decodeURIComponent(catMatch[1]) }, searchParams };
  }

  return { path, page: 'not-found', params: {}, searchParams };
}

export function useRouter() {
  const [route, setRoute] = useState<RouteState>(parseHash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash());
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (to: string) => {
    if (!to.startsWith('#')) {
      to = '#' + (to.startsWith('/') ? to : '/' + to);
    }
    window.location.hash = to;
  };

  return { route, navigate };
}
