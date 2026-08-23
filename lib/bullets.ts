/**
 * Split a bulleted blurb into its lines, dropping the bullet characters.
 *
 * Its own module, with no imports, because it is needed by a client component.
 * lib/products.ts reads the catalogue off disk — importing this from there
 * dragged node:path into the browser bundle and failed the build outright.
 *
 * The CMS blurbs are written as "• one per line". Printed as a paragraph those
 * markers show as literal text, and under a line-clamp they run together
 * mid-sentence, so the page renders a real list instead. This is what decides
 * whether there is one to render.
 */
export function bulletsOf(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.replace(/^\s*[•\-*]\s*/, '').trim())
    .filter(Boolean);
}
