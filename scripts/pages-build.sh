#!/usr/bin/env bash
# Cloudflare Pages build command: `bash scripts/pages-build.sh`, output directory `out`.
#
# Several build steps skip silently when a variable is missing (affiliate IDs are
# baked into the HTML, fetch-authors needs STRAPI_URL) — a build that succeeds
# but ships a site with no affiliate links. .env.local does not exist in the Pages
# container, so this refuses to build until the dashboard variables are set, and
# refuses to publish an export that is missing its pages or redirect rules.
set -euo pipefail
cd "$(dirname "$0")/.."

required=(STRAPI_URL STRAPI_TOKEN NEXT_PUBLIC_AMAZON_TAG NEXT_PUBLIC_EBAY_CAMPID NEXT_PUBLIC_WALMART_PID)
missing=()
for name in "${required[@]}"; do
  [ -n "${!name:-}" ] || missing+=("$name")
done
if [ ${#missing[@]} -gt 0 ]; then
  echo "pages-build: missing environment variables: ${missing[*]}" >&2
  echo "Set them in Pages → Settings → Variables and Secrets (Production and Preview), then retry." >&2
  exit 1
fi

npm run build

for f in out/index.html out/404.html out/_redirects out/_headers; do
  [ -s "$f" ] || { echo "pages-build: $f is missing or empty — not publishing." >&2; exit 1; }
done
lines=$(grep -cv '^\s*\(#\|$\)' out/_redirects || true)
if [ "$lines" -gt 2100 ]; then
  echo "pages-build: out/_redirects has $lines rules; Pages allows 2,000 static + 100 dynamic." >&2
  exit 1
fi
echo "pages-build: ok — $(find out -name '*.html' | wc -l) HTML files, $lines redirect rules."
