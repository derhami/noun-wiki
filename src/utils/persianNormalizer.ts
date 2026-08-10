/**
 * Persian & English text normalization utility for search and matching.
 */

export function normalizePersian(text: string): string {
  if (!text) return '';

  return text
    // Convert Arabic characters to Persian
    .replace(/ي|ى/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/أ|إ|آ/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ی')
    // Convert Arabic and Persian digits to ASCII
    .replace(/[٠۰]/g, '0')
    .replace(/[١۱]/g, '1')
    .replace(/[٢۲]/g, '2')
    .replace(/[٣۳]/g, '3')
    .replace(/[٤۴]/g, '4')
    .replace(/[٥۵]/g, '5')
    .replace(/[٦۶]/g, '6')
    .replace(/[٧۷]/g, '7')
    .replace(/[٨۸]/g, '8')
    .replace(/[٩۹]/g, '9')
    // Replace zero-width non-joiner (ZWNJ) with space or remove
    .replace(/\u200C/g, ' ')
    // Replace punctuation with spaces
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»]/g, ' ')
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Strips all non-alphanumeric characters for strict compact matching (e.g., "b2b" vs "b 2 b", "b-2-b").
 */
export function compactText(text: string): string {
  return normalizePersian(text).replace(/[\s\-_]/g, '');
}

/**
 * Computes Levenshtein Distance for "Did you mean?" suggestions and fuzzy matching.
 */
export function levenshteinDistance(a: string, b: string): number {
  const normA = normalizePersian(a);
  const normB = normalizePersian(b);

  if (normA === normB) return 0;
  if (!normA.length) return normB.length;
  if (!normB.length) return normA.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= normB.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= normA.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= normB.length; i++) {
    for (let j = 1; j <= normA.length; j++) {
      if (normB.charAt(i - 1) === normA.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[normB.length][normA.length];
}

