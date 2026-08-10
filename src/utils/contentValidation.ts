import { termRepository } from '../repositories/termRepository';

export interface ValidationReport {
  totalTerms: number;
  duplicateSlugs: string[];
  brokenReferences: { termSlug: string; brokenRef: string }[];
  missingPersianNames: string[];
  termsWithoutExamples: string[];
  isValid: boolean;
}

/**
 * Runs automated content checks for data integrity across the Noun Wiki knowledge base.
 */
export function runContentValidation(): ValidationReport {
  const result = termRepository.validateContent();
  const isValid =
    result.duplicateSlugs.length === 0 &&
    result.brokenReferences.length === 0 &&
    result.missingPersianNames.length === 0;

  return {
    ...result,
    isValid,
  };
}

/**
 * Logs a human-readable validation summary to the console for development and CI checks.
 */
export function logValidationSummary(): void {
  const report = runContentValidation();
  console.log('=== NOUN WIKI CONTENT VALIDATION REPORT ===');
  console.log(`Total Terms: ${report.totalTerms}`);
  console.log(`Valid: ${report.isValid ? 'YES' : 'NO'}`);
  if (report.duplicateSlugs.length > 0) {
    console.warn('Duplicate Slugs found:', report.duplicateSlugs);
  }
  if (report.brokenReferences.length > 0) {
    console.warn('Broken References found:', report.brokenReferences);
  }
  if (report.missingPersianNames.length > 0) {
    console.warn('Missing Persian Names found:', report.missingPersianNames);
  }
  if (report.termsWithoutExamples.length > 0) {
    console.info('Terms without examples count:', report.termsWithoutExamples.length);
  }
}
