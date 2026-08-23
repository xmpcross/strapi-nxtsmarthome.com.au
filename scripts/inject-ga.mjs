/**
 * Inject the Google Analytics 4 tag into the exported HTML.
 *
 * Runs as part of `npm postbuild`, after `next build` has written out/.
 *
 * Why not render it in app/layout.tsx?
 * -----------------------------------
 * Same reason inject-sovrn.mjs exists: in a static export everything React
 * renders is emitted twice — once as real HTML and once inside the RSC
 * hydration payload (self.__next_f.push([...])). The browser executes it once,
 * but any verifier that text-scans the page sees two copies, and Google's own
 * instruction is "don't add more than one Google tag to each page".
 *
 * Injecting after the export keeps React unaware of the snippet, so it appears
 * exactly once — immediately after <head>, which is where Google asks for it.
 *
 * No measurement id set → nothing is injected and the build is unchanged.
 *
 * Why the id is hardcoded below
 * -----------------------------
 * It used to come only from the environment or .env.local. Both are absent in
 * the Cloudflare Pages build container -- .env.local is gitignored and lives
 * only on the origin box -- so every published build logged "not injected" and
 * the live site carried no tag while local builds looked fine. A GA4
 * measurement id is not a secret (it is readable in the page source of every
 * site that uses one), so committing it is the fix that survives a fresh clone.
 * The environment still wins if it is set, which is what a staging property
 * would use.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'out');

/** The site's own GA4 property. Overridable, but never absent. */
const DEFAULT_ID = 'G-SY9XCRZH2K';

/** Read the id from the environment, falling back to .env.local, then to the default. */
function readId() {
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID.trim();
  }
  const envFile = path.join(ROOT, '.env.local');
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
      const m = line.match(/^\s*NEXT_PUBLIC_GA_MEASUREMENT_ID\s*=\s*(.*)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '').trim();
    }
  }
  return DEFAULT_ID;
}

const id = readId();

if (!id) {
  console.log('[ga] NEXT_PUBLIC_GA_MEASUREMENT_ID not set — tag not injected.');
  process.exit(0);
}

if (!fs.existsSync(OUT_DIR)) {
  console.error('[ga] out/ does not exist — run next build first.');
  process.exit(1);
}

/*
 * Consent Mode v2. The consent defaults must be pushed BEFORE gtag.js is
 * fetched, which is why the inline block now comes first and the loader second
 * — the reverse of Google's copy-paste snippet, and the reason not to "tidy"
 * the order back.
 *
 * Everything starts denied, so the tag buffers rather than writing storage.
 * components/CookieBanner.tsx sends the 'update' that releases it, and the
 * localStorage read here re-grants on later page loads without a second ask.
 * wait_for_update gives that read a moment on a slow device before the tag
 * decides it is running unconsented.
 */
const SNIPPET = `<!-- Google tag (gtag.js) -->
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try {
  if (window.localStorage.getItem('nxt.consent.v1') === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${id}');
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>`;

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.isFile() && entry.name.endsWith('.html') ? [full] : [];
  });
}

let injected = 0;

for (const file of htmlFiles(OUT_DIR)) {
  const html = fs.readFileSync(file, 'utf8');

  // Idempotent: a rebuilt page must not accumulate tags, and Google is explicit
  // that a second tag on the page is a fault rather than a duplicate no-op.
  if (html.includes('googletagmanager.com/gtag/js')) continue;

  const head = html.indexOf('<head>');
  if (head === -1) continue;

  fs.writeFileSync(file, html.slice(0, head + 6) + SNIPPET + html.slice(head + 6));
  injected += 1;
}

console.log(`[ga] injected into ${injected} page(s).`);
