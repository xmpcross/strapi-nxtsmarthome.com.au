#!/usr/bin/env bash
#
# Build a preview of the site WITH drafts included and publish it to /preview/.
#
#   npm run deploy:preview
#
# The preview is for reading unfinished work in a real browser. It is deliberately
# kept out of search:
#   - nginx sends X-Robots-Tag: noindex, nofollow for /preview/
#   - robots.txt disallows /preview/
#   - it is never linked from the live site
#
# It does NOT touch the live site. The live build still excludes drafts, because
# INCLUDE_DRAFTS is only set here.

set -euo pipefail

PROJECT_DIR="/opt/nxtsmarthome.com.au"
PREVIEW_DIR="/var/www/html/nxtsmarthome.com.au/preview"

cd "$PROJECT_DIR"

export NVM_DIR="${NVM_DIR:-/root/.nvm}"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 22 >/dev/null

echo "==> Building preview (drafts included, basePath /preview)"
INCLUDE_DRAFTS=1 PREVIEW_BASE_PATH=/preview npm run build

if [ ! -f "out/index.html" ]; then
  echo "!! Preview build produced no out/index.html — refusing to publish" >&2
  exit 1
fi

PAGES=$(find out -name '*.html' | wc -l)
echo "==> Preview build produced ${PAGES} HTML pages"

mkdir -p "$PREVIEW_DIR"
rsync -a --delete out/ "$PREVIEW_DIR/"

chown -R www-data:www-data "$PREVIEW_DIR"
find "$PREVIEW_DIR" -type d -exec chmod 755 {} +
find "$PREVIEW_DIR" -type f -exec chmod 644 {} +

# Leave the working tree in the state the live deploy expects.
echo "==> Rebuilding without drafts so out/ matches the live site"
npm run build >/dev/null

echo "==> Done. https://nxtsmarthome.com.au/preview/"
echo "    Not indexed, not linked. Run 'npm run deploy' to publish the live site."
