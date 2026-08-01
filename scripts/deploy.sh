#!/usr/bin/env bash
#
# Build the static site and publish it to the nginx web root.
#
#   npm run deploy
#
# Deliberately manual — nothing auto-deploys on push. The source of truth is this
# directory on the server.

set -euo pipefail

PROJECT_DIR="/opt/nxtsmarthome.com.au"
WEB_ROOT="/var/www/html/nxtsmarthome.com.au"
BACKUP_DIR="/opt/backups/nxtsmarthome.com.au"

cd "$PROJECT_DIR"

# nvm is not loaded in non-interactive shells.
export NVM_DIR="${NVM_DIR:-/root/.nvm}"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 22 >/dev/null

echo "==> Building"
npm run build

if [ ! -f "out/index.html" ]; then
  echo "!! Build produced no out/index.html — refusing to deploy" >&2
  exit 1
fi

PAGE_COUNT=$(find out -name '*.html' | wc -l)
echo "==> Build produced ${PAGE_COUNT} HTML pages"

mkdir -p "$BACKUP_DIR"
if [ -d "$WEB_ROOT" ] && [ -n "$(ls -A "$WEB_ROOT" 2>/dev/null)" ]; then
  STAMP=$(date +%Y%m%d-%H%M%S)
  echo "==> Backing up current web root to ${BACKUP_DIR}/pre-deploy-${STAMP}.tar.gz"
  tar -czf "${BACKUP_DIR}/pre-deploy-${STAMP}.tar.gz" -C "$(dirname "$WEB_ROOT")" "$(basename "$WEB_ROOT")"
  # Keep the five most recent pre-deploy backups.
  ls -1t "${BACKUP_DIR}"/pre-deploy-*.tar.gz 2>/dev/null | tail -n +6 | xargs -r rm --
fi

mkdir -p "$WEB_ROOT"

echo "==> Publishing to ${WEB_ROOT}"
# --delete removes files for articles that no longer exist. The web root holds
# nothing but build output, so this is safe.
rsync -a --delete out/ "$WEB_ROOT/"

chown -R www-data:www-data "$WEB_ROOT"
find "$WEB_ROOT" -type d -exec chmod 755 {} +
find "$WEB_ROOT" -type f -exec chmod 644 {} +

echo "==> Reloading nginx"
nginx -t
systemctl reload nginx

echo "==> Done. https://nxtsmarthome.com.au/"
