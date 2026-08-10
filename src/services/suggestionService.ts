import { TermSubmission } from '../types';

const SUGGESTIONS_KEY = 'noun_wiki_user_suggestions';

export interface ISuggestionService {
  submitSuggestion(data: Omit<TermSubmission, 'id' | 'createdAt' | 'status'>): Promise<TermSubmission>;
  getSuggestions(): Promise<TermSubmission[]>;
}

class LocalSuggestionService implements ISuggestionService {
  async submitSuggestion(data: Omit<TermSubmission, 'id' | 'createdAt' | 'status'>): Promise<TermSubmission> {
    const newSubmission: TermSubmission = {
      ...data,
      id: `sub-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    try {
      const existing = localStorage.getItem(SUGGESTIONS_KEY);
      const list: TermSubmission[] = existing ? JSON.parse(existing) : [];
      list.unshift(newSubmission);
      localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(list));
    } catch {
      // Fallback for private browsing or disabled localStorage
    }

    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 300));
    return newSubmission;
  }

  async getSuggestions(): Promise<TermSubmission[]> {
    try {
      const existing = localStorage.getItem(SUGGESTIONS_KEY);
      return existing ? JSON.parse(existing) : [];
    } catch {
      return [];
    }
  }
}

export const suggestionService: ISuggestionService = new LocalSuggestionService();
