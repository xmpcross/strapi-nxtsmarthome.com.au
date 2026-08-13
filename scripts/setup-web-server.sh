#!/usr/bin/env bash
#
# RETIRED 13 Aug 2026 — the site moved to Cloudflare Pages, which needs no
# origin server. This provisions one, so it is off by default.
#
# Kept because it is the only record of the origin's nginx configuration, and
# because deploy/nginx/ is useless without something that installs it.
#
# TWO TRAPS if you ever run this again:
#
#   * conf.d/10-gzip.conf duplicates gzip_vary/gzip_types that Ubuntu's stock
#     nginx.conf already sets at http level. On such a host `nginx -t` fails
#     with `"gzip_vary" directive is duplicate` and EVERY site on that server
#     stops being served on the next reload. This script copies all of
#     conf.d/*.conf, so skip that file where nginx.conf already sets gzip.
#   * conf.d/20-cloudflare-real-ip.conf sets set_real_ip_from at http level,
#     which rewrites $remote_addr for every other site on a shared box —
#     including any IP-based blocks. Only install it where Cloudflare really
#     fronts the domain.
#
# ---------------------------------------------------------------------------
# What it used to do:
#
# Provision a bare host to serve the site, and install the nginx config from
# deploy/nginx/. Idempotent — safe to re-run to push a config change.
#
#   bash scripts/setup-web-server.sh                  # this machine
#   bash scripts/setup-web-server.sh root@1.2.3.4     # somewhere else
#
# It does not build or copy the site; `npm run deploy` does that. It also does
# not touch DNS or issue a certificate — see README, "Deployment".

set -euo pipefail

# Installs packages and rewrites nginx config, so it refuses by default rather
# than reprovisioning a host that no longer serves this domain.
if [ "${ALLOW_RETIRED_SETUP:-0}" != "1" ]; then
  cat >&2 <<'RETIRED'
nxtsmarthome.com.au is served by Cloudflare Pages, which has no origin server.

This script installs nginx and certbot, writes /etc/nginx config and reloads
nginx. On this host that would reinstate a vhost for a domain whose DNS now
points at Cloudflare, and it copies conf.d/10-gzip.conf, which breaks nginx
for every other site here (see the header).

To provision a real origin deliberately:

  ALLOW_RETIRED_SETUP=1 bash scripts/setup-web-server.sh [user@host]
RETIRED
  exit 1
fi

TARGET="${1:-local}"
CONFIG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../deploy/nginx" && pwd)"
WEB_ROOT="/var/www/html/nxtsmarthome.com.au"

# Same two verbs either way, so the body below reads the same for both targets.
if [ "$TARGET" = "local" ]; then
  run() { bash -c "$1"; }
  put() { cp "$@"; }
else
  run() { ssh -o BatchMode=yes "$TARGET" "$1"; }
  put() { scp -q -o BatchMode=yes "${@:1:$#-1}" "$TARGET:${*: -1}"; }
fi

echo "==> Installing nginx and certbot on ${TARGET}"
run 'export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y -qq nginx certbot python3-certbot-nginx rsync'

echo "==> Creating directories"
# The ACME webroot sits outside the site tree so that renewals cannot be broken
# by the deploy rsync, which runs with --delete.
run "mkdir -p '$WEB_ROOT' /var/www/certbot-webroot /etc/nginx/snippets
  chown -R www-data:www-data /var/www/certbot-webroot
  # The vhost includes the redirect map from the web root, so on a host with no
  # deploy yet nginx would refuse to start. A stub keeps it valid until the
  # first deploy overwrites it with the real one.
  [ -f '$WEB_ROOT/_redirects.map' ] ||
    echo '# Placeholder until the first deploy.' > '$WEB_ROOT/_redirects.map'"

echo "==> Installing nginx config"
put "$CONFIG_DIR"/conf.d/*.conf /etc/nginx/conf.d/
put "$CONFIG_DIR"/snippets/*.conf /etc/nginx/snippets/
put "$CONFIG_DIR"/sites-available/nxtsmarthome.com.au \
  /etc/nginx/sites-available/nxtsmarthome.com.au

run 'ln -sfn /etc/nginx/sites-available/nxtsmarthome.com.au \
    /etc/nginx/sites-enabled/nxtsmarthome.com.au
  nginx -t
  systemctl reload nginx
  systemctl enable --now nginx >/dev/null'

echo "==> Done. Publish the site with: npm run deploy"
