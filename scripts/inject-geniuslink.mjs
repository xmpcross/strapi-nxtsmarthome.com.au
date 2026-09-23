/**
 * Inject Geniuslink into the exported HTML.
 *
 * Runs as `npm postbuild`, after `next build` has written out/. Keeping this
 * outside React avoids duplicate snippet text in the RSC hydration payload.
 *
 * Set NEXT_PUBLIC_GENIUSLINK_TSID to the TSID from Geniuslink's JavaScript
 * snippet wizard. No TSID set -> no injection.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'out');

function readEnvValue(name) {
  if (process.env[name]) return process.env[name].trim();

  for (const fileName of ['.env.local', '.env.production', '.env']) {
    const envFile = path.join(ROOT, fileName);
    if (!fs.existsSync(envFile)) continue;
    for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
      const match = line.match(new RegExp(`^\\s*${name}\\s*=\\s*(.*)\\s*$`));
      if (!match) continue;
      const value = match[1].replace(/^["']|["']$/g, '').trim();
      if (value) return value;
    }
  }

  return '';
}

const tsid = readEnvValue('NEXT_PUBLIC_GENIUSLINK_TSID');
const baseUrl = readEnvValue('NEXT_PUBLIC_GENIUSLINK_BASE_URL') || 'https://buy.geni.us';
const preserveExisting = readEnvValue('NEXT_PUBLIC_GENIUSLINK_PRESERVE_EXISTING') === 'true';

if (!tsid) {
  console.log('[geniuslink] NEXT_PUBLIC_GENIUSLINK_TSID not set - script not injected.');
  process.exit(0);
}

if (!/^\d+$/.test(tsid)) {
  console.error('[geniuslink] NEXT_PUBLIC_GENIUSLINK_TSID must be numeric.');
  process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) {
  console.error(`[geniuslink] ${OUT_DIR} does not exist - run next build first.`);
  process.exit(1);
}

const snippet =
  '<script type="text/javascript" src="https://geniuslinkcdn.com/snippet.min.js" defer></script>\n' +
  '<script type="text/javascript">\n' +
  '  window.addEventListener("DOMContentLoaded", function() {\n' +
  '    if (!window.Genius || !window.Genius.amazon) return;\n' +
  `    window.Genius.amazon.convertLinks(${tsid}, ${preserveExisting ? 'true' : 'false'}, ${JSON.stringify(baseUrl)});\n` +
  '  });\n' +
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
let noHead = 0;

for (const file of htmlFiles(OUT_DIR)) {
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('geniuslinkcdn.com/snippet.min.js')) {
    skipped++;
    continue;
  }

  const idx = html.lastIndexOf('</head>');
  if (idx === -1) {
    noHead++;
    continue;
  }

  fs.writeFileSync(file, html.slice(0, idx) + snippet + html.slice(idx), 'utf8');
  injected++;
}

console.log(
  `[geniuslink] injected into ${injected} page(s)` +
    (skipped ? `, ${skipped} already had it` : '') +
    (noHead ? `, ${noHead} had no </head>` : ''),
);
