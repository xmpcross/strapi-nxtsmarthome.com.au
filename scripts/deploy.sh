#!/usr/bin/env bash
#
# Build the static site and publish it to the web server.
#
# History: retired 13 Aug 2026 when the site moved to Cloudflare Pages, and
# un-retired 23 Aug 2026 when it moved back to this host. The vhost, the
# certificate and /var/www/html/nxtsmarthome.com.au all exist again, so the
# guard that used to sit here would now refuse a deploy that works.
#
# This is the only supported way to publish. It is preferred over a bare
# `npm run build && rsync` because it refuses to publish a failed build — an
# rsync on the line after a failed build silently republishes the PREVIOUS
# output and looks like a success, which has happened twice.
#
#   npm run deploy
#
# Deliberately manual — nothing auto-deploys on push. The source of truth is this
# directory; the web root holds nothing but build output.
#
# Build and serve are the same machine, so the default publishes locally. Set
# DEPLOY_HOST=user@host to build here and publish to a different server.

set -euo pipefail

# Resolved from this script's location. The absolute path was
# '/opt/nxtsmarthome.com.au' and broke when the repo moved under /opt/projects/.
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_ROOT="/var/www/html/nxtsmarthome.com.au"
BACKUP_DIR="/opt/backups/nxtsmarthome.com.au"
DEPLOY_HOST="${DEPLOY_HOST:-local}"
INDEXNOW_URLS=$(mktemp)
trap 'rm -f "$INDEXNOW_URLS"' EXIT

# Every command below runs either through ssh or in a subshell, so the rest of
# the script reads the same whichever target is in play.
if [ "$DEPLOY_HOST" = "local" ]; then
  RSYNC_TARGET="$WEB_ROOT/"
  WHERE="this machine"
  remote() { bash -c "$1"; }
else
  RSYNC_TARGET="${DEPLOY_HOST}:${WEB_ROOT}/"
  WHERE="$DEPLOY_HOST"
  remote() { ssh -o BatchMode=yes "$DEPLOY_HOST" "$1"; }
fi

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

# The vhost includes this from the web root, so nginx cannot reload without it.
if [ ! -f "out/_redirects.map" ]; then
  echo "!! Build produced no out/_redirects.map — refusing to deploy" >&2
  exit 1
fi

PAGE_COUNT=$(find out -name '*.html' | wc -l)
echo "==> Build produced ${PAGE_COUNT} HTML pages"

echo "==> Backing up the current web root on ${WHERE}"
remote "set -e
  mkdir -p '$BACKUP_DIR' '$WEB_ROOT'
  if [ -n \"\$(ls -A '$WEB_ROOT' 2>/dev/null)\" ]; then
    tar -czf '${BACKUP_DIR}'/pre-deploy-\$(date +%Y%m%d-%H%M%S).tar.gz \\
      -C '$(dirname "$WEB_ROOT")' '$(basename "$WEB_ROOT")'
    # Keep the five most recent pre-deploy backups.
    ls -1t '${BACKUP_DIR}'/pre-deploy-*.tar.gz 2>/dev/null | tail -n +6 | xargs -r rm --
  fi"

echo "==> Publishing to ${WEB_ROOT} on ${WHERE}"
# Record changed and deleted public pages before rsync replaces the live tree.
# IndexNow wants URL changes, not assets; both a changed page and a removed page
# are submitted so participating engines can recrawl the new status promptly.
{
  rsync -ain --delete --out-format='%i|%n' out/ "$RSYNC_TARGET" \
    | awk -F'|' '$1 ~ /^>f/ && $2 ~ /(^|\/)index\.html$/ { print $2 }'
  rsync -ain --delete --out-format='%i|%n' out/ "$RSYNC_TARGET" \
    | awk -F'|' '$1 == "*deleting" && $2 ~ /(^|\/)index\.html$/ { print $2 }'
} \
  | sed -E 's#index\.html$##; s#^#/#' \
  | awk '!/^\/(404\/|search\/|preview\/|design-preview\/)/' \
  | sort -u > "$INDEXNOW_URLS"

# --delete removes files for articles that no longer exist. The web root holds
# nothing but build output, so this is safe.
rsync -a --delete out/ "$RSYNC_TARGET"

echo "==> Fixing ownership and reloading nginx"
remote "set -e
  chown -R www-data:www-data '$WEB_ROOT'
  find '$WEB_ROOT' -type d -exec chmod 755 {} +
  find '$WEB_ROOT' -type f -exec chmod 644 {} +
  nginx -t
  systemctl reload nginx"

echo "==> Notifying IndexNow"
# A notification failure must not roll back an otherwise successful site deploy.
node scripts/submit-indexnow.mjs "$INDEXNOW_URLS" \
  || echo "!! IndexNow notification failed; the deployment remains live" >&2

echo "==> Done. https://nxtsmarthome.com.au/"
