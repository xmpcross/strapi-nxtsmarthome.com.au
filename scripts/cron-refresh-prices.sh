#!/usr/bin/env bash
# Daily price refresh for nxtsmarthome.com.au (run from root's crontab).
#
#   1. refresh-prices.mjs: DataForSEO product_info by Google product id (~$0.30 a run)
#   2. if products.json changed, and it is the ONLY change in the working tree, deploy.
#
# Skips (does not fail) when another price run is going, or a deploy/build is in progress
# (two builds into .next-build wipe each other). Never deploys other uncommitted work.
# Changes of more than 50% are held back by refresh-prices.mjs and listed in the log.
set -uo pipefail

APP_DIR="/opt/projects/nxtsmarthome.com.au"
SOURCING_ENV="/opt/strapi-cms-git/backend/nxt-sourcing/.env.local"
export PATH="/usr/local/lib/nodejs/current/bin:$PATH"
log() { echo "$(date -Is) $*"; }

exec 9>/tmp/nxtsmarthome-price-refresh.lock
flock -n 9 || { log "another price refresh is running; skipping"; exit 0; }
if pgrep -f "$APP_DIR.*(deploy.sh|next build)" >/dev/null || pgrep -f "deploy.sh --allow-dirty" >/dev/null; then
  log "a deploy/build is in progress; skipping"; exit 0
fi

# The stored DataForSEO password is a base64 "login:password" token; the script wants the plain pair.
PW=$(grep -E '^DATAFORSEO_PASSWORD=' "$SOURCING_ENV" | cut -d= -f2-)
DEC=$(printf %s "$PW" | base64 -d 2>/dev/null)
if [[ "$DEC" != *:* ]]; then log "could not read DataForSEO credentials from $SOURCING_ENV"; exit 1; fi
export DATAFORSEO_LOGIN="${DEC%%:*}" DATAFORSEO_PASSWORD="${DEC#*:}"

cd "$APP_DIR" || exit 1
log "refreshing prices"
node scripts/refresh-prices.mjs || { log "refresh failed; nothing deployed"; exit 1; }

if git diff --quiet -- public/data/products.json; then
  log "no price changes; not deploying"; exit 0
fi
other=$(git status --porcelain | grep -v ' public/data/products.json$' | grep -v '^?? scratch/' || true)
if [[ -n "$other" ]]; then
  log "products.json changed but the tree has other uncommitted changes; NOT deploying:"; echo "$other"; exit 0
fi
log "deploying"
./deploy.sh --allow-dirty && log "deployed" || { log "deploy failed"; exit 1; }
