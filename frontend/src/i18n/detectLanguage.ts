/**
 * detectLanguage.ts
 * Detects the language of a text string and returns 'te', 'hi', or 'en'.
 * Uses Unicode block ranges to identify Telugu and Hindi (Devanagari) scripts.
 * Falls back to 'en' if neither is detected.
 */

export type SupportedLang = 'te' | 'hi' | 'en';

// Count characters in a given Unicode range inside text
function countInRange(text: string, start: number, end: number): number {
  let count = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if (code >= start && code <= end) count++;
  }
  return count;
}

export function detectLanguage(text: string): SupportedLang {
  if (!text || text.trim().length === 0) return 'en';

  // Telugu: U+0C00–U+0C7F
  const teluguCount = countInRange(text, 0x0C00, 0x0C7F);
  // Hindi (Devanagari): U+0900–U+097F
  const hindiCount = countInRange(text, 0x0900, 0x097F);

  const total = text.replace(/\s/g, '').length || 1;
  const teluguRatio = teluguCount / total;
  const hindiRatio = hindiCount / total;

  // If more than 10% of characters are Telugu script → Telugu
  if (teluguRatio > 0.10) return 'te';
  // If more than 10% of characters are Devanagari → Hindi
  if (hindiRatio > 0.10) return 'hi';

  // Fallback: keyword matching for romanized Telugu/Hindi
  const lower = text.toLowerCase();
  const teluguKeywords = ['kilo', 'kilolu', 'tomato', 'naa', 'daggar', 'ready', 'raapu', 'indu', 'vellipothundi', 'vaddu'];
  const hindiKeywords = ['mera', 'mere', 'paas', 'kilo', 'tamatar', 'pyaz', 'aloo', 'hai', 'hain', 'kal'];

  // Script-based wins; romanized keywords are just a secondary hint
  const teHits = teluguKeywords.filter(k => lower.includes(k)).length;
  const hiHits = hindiKeywords.filter(k => lower.includes(k)).length;

  if (teHits > hiHits) return 'te';
  if (hiHits > teHits) return 'hi';

  return 'en';
}
