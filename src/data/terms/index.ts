import { Term } from '../../types';
import { JOB_TERMS } from './jobTerms';
import { BUSINESS_TERMS } from './businessTerms';
import { MARKETING_TERMS } from './marketingTerms';
import { PRODUCT_TERMS } from './productTerms';
import { TECH_TERMS } from './techTerms';
import { AI_TERMS } from './aiTerms';
import { FINANCE_TERMS } from './financeTerms';
import { STARTUP_TERMS } from './startupTerms';
import { HR_TERMS } from './hrTerms';
import { COMPREHENSIVE_TERMS } from './comprehensiveTerms';

const RAW_TERMS: Term[] = [
  ...JOB_TERMS,
  ...BUSINESS_TERMS,
  ...MARKETING_TERMS,
  ...PRODUCT_TERMS,
  ...TECH_TERMS,
  ...AI_TERMS,
  ...FINANCE_TERMS,
  ...STARTUP_TERMS,
  ...HR_TERMS,
  ...COMPREHENSIVE_TERMS,
];

/**
 * Deduplicate terms by slug to guarantee data integrity across modules.
 */
function buildUniqueTermsList(terms: Term[]): Term[] {
  const seenSlugs = new Set<string>();
  const uniqueTerms: Term[] = [];

  for (const item of terms) {
    const lowerSlug = item.slug.toLowerCase().trim();
    if (!seenSlugs.has(lowerSlug)) {
      seenSlugs.add(lowerSlug);
      uniqueTerms.push(item);
    }
  }

  return uniqueTerms;
}

export const ALL_MODULAR_TERMS: Term[] = buildUniqueTermsList(RAW_TERMS);
