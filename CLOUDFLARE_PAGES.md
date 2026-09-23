# Deploying on Cloudflare Pages

The site is a static export (`output: 'export'`), so Cloudflare Pages hosts it
directly. **Since 24 Sep 2026, `nxtsmarthome.com.au` is served by Cloudflare
Pages.** Every push to `master` builds and deploys the site: work on `master`
only.

The site does not update when a post is published in Strapi. Content is read at
build time, so a new post only appears after the next build. See "Rebuilding
after Strapi changes" below.

## What runs where on Pages

| Piece | On the /opt server | On Pages |
|---|---|---|
| HTML, assets | nginx from `/var/www/html/nxtsmarthome.com.au` | `out/` |
| Redirects (536 rules) | `_redirects.map` via nginx | `out/_redirects` (Pages limit: 2,000 static) |
| Security and cache headers | nginx snippet | `out/_headers` |
| `/api/contact`, `/api/comment` | `nxtsmarthome-contact.service` (port 4320) | Pages Functions in `functions/api/` |
| Mail | Stalwart SMTP, `mail.fxnstudio.com:465` | same, through `worker-mailer` over TCP sockets |
| IndexNow | submitted by `deploy.sh` | not run. Use `npm run indexnow` from the server after a deploy |

## Project settings

Workers & Pages → Create → Pages → Connect to Git → `xmpcross/strapi-nxtsmarthome.com.au`.

| Setting | Value |
|---|---|
| Production branch | `master` |
| Framework preset | None |
| Build command | `bash scripts/pages-build.sh` |
| Build output directory | `out` |
| Node version | from `.nvmrc` (22) |

Keep `wrangler.jsonc` without `pages_build_output_dir`, as it is now. If that key
is added, Pages treats the file as the source of truth for the project's settings
and variables, which can override what is set in the dashboard. No compatibility
flag is needed: `worker-mailer` only uses `cloudflare:sockets`.

`scripts/pages-build.sh` refuses to build if a required variable is missing.
Several build steps otherwise skip silently, and the site would ship without
affiliate links. It also refuses to publish an export with no `index.html`,
`_redirects` or `_headers`.

## Environment variables

Set these for **both Production and Preview**. `.env.local` does not exist in the
Pages build.

Required at build time (`pages-build.sh` checks them):

| Name | Notes |
|---|---|
| `STRAPI_URL` | `https://cms.fxnstudio.com` |
| `STRAPI_TOKEN` | secret, read token for articles, products, nav and authors |
| `NEXT_PUBLIC_AMAZON_TAG` | Amazon AU tag |
| `NEXT_PUBLIC_EBAY_CAMPID` | EPN campaign ID |
| `NEXT_PUBLIC_WALMART_PID` | Walmart publisher ID |

Optional at build time: `NEXT_PUBLIC_GENIUSLINK_TSID`,
`NEXT_PUBLIC_GENIUSLINK_BASE_URL`, `NEXT_PUBLIC_GENIUSLINK_PRESERVE_EXISTING`.
The GA ID is hard-coded in `scripts/inject-ga.mjs`, and the Sovrn key is
committed in `.env`.

Runtime (Functions):

| Name | Notes |
|---|---|
| `SMTP_USER`, `SMTP_PASS` | secret, the Stalwart account the form sends as |
| `SMTP_HOST`, `SMTP_PORT` | default `mail.fxnstudio.com`, `465` |
| `CONTACT_TO` | default `hello@nxtsmarthome.com.au` |
| `CONTACT_FROM` | default `SMTP_USER`. Stalwart rejects a sender the account does not own |
| `CONTACT_ORIGIN` | default `https://nxtsmarthome.com.au` |

Optional: bind a KV namespace as `CONTACT_THROTTLE` (Settings → Bindings) for
the per-IP limit of 5 messages every 10 minutes. The honeypot and 2-second
checks apply either way.

Do not set `FAL_KEY`, `SOVRN_API_KEY` or the DataForSEO keys on Pages. They are
used only by the content scripts on the server.

## Mail deliverability

The form sends from a Stalwart account to `hello@nxtsmarthome.com.au`. Before
relying on it, publish in Cloudflare DNS for `nxtsmarthome.com.au`:

- SPF: add `ip4:51.161.208.188` to the current
  `v=spf1 include:_spf.google.com ~all`.
- Both Stalwart DKIM records: Stalwart → Directory → Domains →
  nxtsmarthome.com.au → DNS records.

Without them, mail sent through Stalwart fails SPF and DKIM and may land in spam.
The MX records can stay on Google.

## Rebuilding after Strapi changes

Pages builds on a push to `master`, or on **Retry deployment** in the dashboard.
Publishing in Strapi does not trigger a build yet.

To trigger builds from Strapi, create a deploy hook (Settings → Builds → Deploy
hooks, branch `master`). Keep its URL secret. Two ways to call it:

- **Directly from a Strapi webhook.** One Strapi serves every FXN site, and
  webhooks cannot be limited to a content type, so every publish on every site
  would start a build. The free plan allows 500 builds a month.
- **Through a relay (preferred).** A relay forwards only `nxtsmarthome-*` changes
  and turns a burst of edits into one build. Add a nightly build as well, so
  product prices refresh.

## Remaining switch-over steps

1. Set the variables above, then change the build command to
   `bash scripts/pages-build.sh`.
2. Fix `www.nxtsmarthome.com.au`, which serves a 404: add a Cloudflare Redirect
   Rule from www to the apex (301).
3. Retire the `/opt` copy:
   - unlink `/etc/nginx/sites-enabled/nxtsmarthome.com.au`;
   - `systemctl disable --now nxtsmarthome-contact`;
   - pause certbot renewal for `nxtsmarthome.com.au`.
4. `npm run deploy` still publishes to the old nginx web root, which no longer
   serves the site. Run `npm run indexnow` from the server after a deploy.
