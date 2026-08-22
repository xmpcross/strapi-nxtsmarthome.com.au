/**
 * Inject the Sovrn Commerce (VigLink) script into the exported HTML.
 *
 * Runs automatically as `npm postbuild`, after `next build` has written out/.
 *
 * Why not just render it in app/layout.tsx?
 * ----------------------------------------
 * In a static export, everything React renders is emitted twice: once as real
 * HTML and once inside the RSC hydration payload (self.__next_f.push([...])).
 * The browser only executes it once, but Sovrn's verifier text-scans the page
 * and rejects it with "multiple instances of the code were found".
 *
 * Injecting after the export keeps React unaware of the snippet, so it appears
 * exactly once — immediately before </body>, which is where Sovrn asks for it.
 *
 * No key set → nothing is injected, and the build is unchanged.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'out');

/**
 * Read NEXT_PUBLIC_SOVRN_KEY, in Next's own precedence order.
 *
 * This runs as `npm postbuild`, a separate process from `next build`, so the
 * env files Next loaded are NOT in process.env here - they have to be read off
 * disk again. Reading only .env.local (as this did) meant any checkout without
 * one produced a clean, successful build with no affiliate script in it: the
 * log said "not injected", the exit code was 0, and nothing else complained.
 * A build that quietly earns nothing is the worst kind to ship.
 *
 * .env is committed and holds the key, so a fresh clone injects correctly;
 * .env.local still wins where it exists.
 */
function readKey() {
  if (process.env.NEXT_PUBLIC_SOVRN_KEY) return process.env.NEXT_PUBLIC_SOVRN_KEY.trim();

  for (const name of ['.env.local', '.env.production', '.env']) {
    const envFile = path.join(ROOT, name);
    if (!fs.existsSync(envFile)) continue;
    for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
      const m = line.match(/^\s*NEXT_PUBLIC_SOVRN_KEY\s*=\s*(.*)\s*$/);
      if (m) {
        const value = m[1].replace(/^["']|["']$/g, '').trim();
        if (value) return value;
      }
    }
  }
  return '';
}

const key = readKey();

if (!key) {
  console.log('[sovrn] NEXT_PUBLIC_SOVRN_KEY not set — script not injected.');
  process.exit(0);
}
if (!fs.existsSync(OUT_DIR)) {
  console.error(`[sovrn] ${OUT_DIR} does not exist — run next build first.`);
  process.exit(1);
}

const snippet =
  '<script type="text/javascript">\n' +
  `  var vglnk = {key: ${JSON.stringify(key)}};\n` +
  "  (function(d, t) {var s = d.createElement(t);\n" +
  "    s.type = 'text/javascript';s.async = true;\n" +
  "    s.src = 'https://cdn.viglink.com/api/vglnk.js';\n" +
  "    var r = d.getElementsByTagName(t)[0];\n" +
  '    r.parentNode.insertBefore(s, r);\n' +
  "  }(document, 'script'));\n" +
  '</script>\n';

function* htmlFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) yield full;
  }
}

let injected = 0;
let skipped = 0;
let noBody = 0;

for (const file of htmlFiles(OUT_DIR)) {
  const html = fs.readFileSync(file, 'utf8');

  // Idempotent: never add a second copy.
  if (html.includes('cdn.viglink.com/api/vglnk.js')) {
    skipped++;
    continue;
  }
  const idx = html.lastIndexOf('</body>');
  if (idx === -1) {
    noBody++;
    continue;
  }
  fs.writeFileSync(file, html.slice(0, idx) + snippet + html.slice(idx), 'utf8');
  injected++;
}

console.log(
  `[sovrn] injected into ${injected} page(s)` +
    (skipped ? `, ${skipped} already had it` : '') +
    (noBody ? `, ${noBody} had no </body>` : ''),
);
