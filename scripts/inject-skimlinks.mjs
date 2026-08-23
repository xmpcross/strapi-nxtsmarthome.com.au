/**
 * Inject the Skimlinks script into the exported HTML.
 *
 * Runs automatically as `npm postbuild`, after `next build` has written out/,
 * and for the same reason scripts/inject-sovrn.mjs does: in a static export
 * everything React renders is emitted twice, once as real HTML and once inside
 * the RSC hydration payload (self.__next_f.push([...])). The browser executes
 * it once, but an affiliate network's verifier text-scans the page and reads
 * the second copy as a duplicate install. Injecting after the export keeps
 * React unaware of the snippet, so it appears exactly once -- immediately
 * before </body>, which is where Skimlinks asks for it.
 *
 * No id set -> nothing is injected, and the build is unchanged.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'out');

/**
 * Read NEXT_PUBLIC_SKIMLINKS_ID, in Next's own precedence order.
 *
 * postbuild is a separate process from `next build`, so the env files Next
 * loaded are NOT in process.env here -- they have to be read off disk again.
 * The id lives in the committed .env for the reason spelled out there: a
 * checkout with no .env.local would otherwise find nothing, log "not
 * injected", exit 0, and ship a clean-looking build that earns nothing.
 */
function readId() {
  if (process.env.NEXT_PUBLIC_SKIMLINKS_ID) return process.env.NEXT_PUBLIC_SKIMLINKS_ID.trim();

  for (const name of ['.env.local', '.env.production', '.env']) {
    const envFile = path.join(ROOT, name);
    if (!fs.existsSync(envFile)) continue;
    for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
      const m = line.match(/^\s*NEXT_PUBLIC_SKIMLINKS_ID\s*=\s*(.*)\s*$/);
      if (m) {
        const value = m[1].replace(/^["']|["']$/g, '').trim();
        if (value) return value;
      }
    }
  }
  return '';
}

const id = readId();

if (!id) {
  console.log('[skimlinks] NEXT_PUBLIC_SKIMLINKS_ID not set — script not injected.');
  process.exit(0);
}
if (!fs.existsSync(OUT_DIR)) {
  console.error(`[skimlinks] ${OUT_DIR} does not exist — run next build first.`);
  process.exit(1);
}

/*
 * Skimlinks' own snippet, verbatim, so their verifier finds what it expects.
 *
 * Unlike the Sovrn loader beside it, this is NOT gated behind the cookie
 * banner -- it runs on sight. That is a deliberate difference and worth
 * revisiting: it rewrites outbound links and sets its own identifiers before
 * the visitor has consented. Gating it means wrapping it the way
 * inject-sovrn.mjs wraps vglnk, at the cost of the literal <script src> no
 * longer appearing in the markup a verifier scans.
 */
const snippet =
  `<script type="text/javascript" src="https://s.skimresources.com/js/${id}.skimlinks.js"></script>\n`;

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
  if (html.includes('s.skimresources.com/js/')) {
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
  `[skimlinks] injected into ${injected} page(s)` +
    (skipped ? `, ${skipped} already had it` : '') +
    (noBody ? `, ${noBody} had no </body>` : ''),
);
