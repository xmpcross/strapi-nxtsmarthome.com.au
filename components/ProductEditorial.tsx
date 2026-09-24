import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import type { Product } from '@/lib/products';

/**
 * "Our research notes": the curated editorial for a product
 * (content/products/<slug>.md), on the product page. Server component.
 *
 * Only curated products render it, and they are the only product pages that
 * can be indexable (lib/products.ts isIndexableProduct): this is the original
 * writing that rule counts, so it has to be on the page, not only in the file.
 *
 * Says plainly what it is: research, not a test (CLAUDE.md rule 5). There is
 * no rating anywhere in it.
 */
async function markdownToHtml(md: string): Promise<string> {
  const file = await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(md);
  // Source links leave the site: open them in a new tab, no referrer.
  return String(file).replace(/<a href="(https?:\/\/[^"]+)">/g, '<a href="$1" target="_blank" rel="noopener noreferrer nofollow">');
}

export default async function ProductEditorial({ product }: { product: Product }) {
  const note = (product.note ?? '').replace(/<!--[\s\S]*?-->/g, '').trim();
  if (!note && !product.pros?.length) return null;
  const html = note ? await markdownToHtml(note) : '';

  return (
    <section className="rounded-[8px] bg-white p-5 dark:bg-slate-800 sm:p-6" aria-labelledby="research-notes">
      <h2 id="research-notes" className="text-xl font-bold text-[#1d252c] dark:text-white">
        Our research notes
      </h2>
      <p className="mt-1 text-sm text-[#55555a] dark:text-slate-400">
        Research-based: compiled from the manufacturer&apos;s information and Australian retailer
        listings. NXT Smart Home has not tested this product.
      </p>

      {product.bestFor ? (
        <p className="mt-4 text-[15px] text-[#1d252c] dark:text-slate-100">
          <span className="font-bold">Best for:</span> {product.bestFor}
        </p>
      ) : null}

      {product.pros?.length || product.cons?.length ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {product.pros?.length ? (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#318000] dark:text-emerald-400">Pros</h3>
              <ul className="mt-2 space-y-1.5">
                {product.pros.map((pro) => (
                  <li key={pro} className="flex gap-2 text-sm leading-relaxed text-[#1d252c] dark:text-slate-200">
                    <span className="text-[#318000] dark:text-emerald-400" aria-hidden="true">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {product.cons?.length ? (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#b42318] dark:text-rose-400">Cons</h3>
              <ul className="mt-2 space-y-1.5">
                {product.cons.map((con) => (
                  <li key={con} className="flex gap-2 text-sm leading-relaxed text-[#1d252c] dark:text-slate-200">
                    <span className="text-[#b42318] dark:text-rose-400" aria-hidden="true">−</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {html ? (
        <div
          className="prose prose-sm mt-6 max-w-none leading-relaxed text-[#55555a] dark:prose-invert dark:text-slate-300 prose-h2:mt-6 prose-h2:text-lg prose-a:break-all"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : null}
    </section>
  );
}
