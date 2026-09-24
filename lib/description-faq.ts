/**
 * Split the FAQ section out of a product's CMS description HTML, so the
 * product page can render it as an accordion instead of a run of h3s.
 *
 * The description arrives as HTML converted from markdown (see
 * scripts/fetch-product-descriptions.mjs and the product rewrite), where the
 * FAQs are written as "## FAQs" followed by "### Question" + answer
 * paragraphs. Everything before the FAQ heading, and any h2 section after it,
 * is returned untouched.
 *
 * No imports: ProductAccordion, a client component, uses it.
 */
export interface DescriptionFaq {
  q: string;
  /** Answer as HTML (one or more paragraphs), from the same trusted build-time source. */
  aHtml: string;
}

const FAQ_HEADING = /<h2[^>]*>\s*(?:FAQs?|Frequently asked questions)\s*<\/h2>/i;

const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();

export function splitDescriptionFaqs(html: string): { before: string; faqs: DescriptionFaq[]; after: string } {
  const head = html.match(FAQ_HEADING);
  if (!head || head.index === undefined) return { before: html, faqs: [], after: '' };

  const before = html.slice(0, head.index);
  const rest = html.slice(head.index + head[0].length);
  // The FAQ section runs to the next h2, or the end.
  const nextH2 = rest.search(/<h2[\s>]/i);
  const section = nextH2 === -1 ? rest : rest.slice(0, nextH2);
  const after = nextH2 === -1 ? '' : rest.slice(nextH2);

  const faqs: DescriptionFaq[] = [];
  const parts = section.split(/<h3[^>]*>/i).slice(1);
  for (const part of parts) {
    const end = part.search(/<\/h3>/i);
    if (end === -1) continue;
    const q = stripTags(part.slice(0, end));
    const aHtml = part.slice(end + 5).trim();
    if (q && aHtml) faqs.push({ q, aHtml });
  }

  // Nothing parseable: leave the section as it was rather than drop it.
  if (!faqs.length) return { before: html, faqs: [], after: '' };
  return { before, faqs, after };
}
