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
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'out');

/** Read the id from the environment, falling back to .env.local. */
function readId() {
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID.trim();
  }
  const envFile = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envFile)) return '';
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*NEXT_PUBLIC_GA_MEASUREMENT_ID\s*=\s*(.*)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, '').trim();
  }
  return '';
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

const SNIPPET = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');
</script>`;

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
