# Deploying on Cloudflare Pages

The site is a static export (`output: 'export'`), so Cloudflare Pages can host it
directly. Production is still the `/opt` server (`npm run deploy`, see README)
until the switch below is made. This file covers the Pages setup.

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

Workers & Pages → Create → Pages → Connect to Git → `xmpcross/strapi-nxtsmarthomes`.

| Setting | Value |
|---|---|
| Production branch | `master` |
| Framework preset | None |
| Build command | `bash scripts/pages-build.sh` |
| Build output directory | `out` |
| Node version | from `.nvmrc` (22) |

`wrangler.jsonc` holds the output directory and the `nodejs_compat` flag that the
Functions need. Pages reads it on git builds, so do not also set the flag in the
dashboard.

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

## Switching production to Pages

1. Merge the in-flight branches into `master` first. Pages builds `master`, not
   whatever the server checkout has.
2. Deploy once to `*.pages.dev`. Check the home page, an article, a redirected
   old URL (`curl -I`), and a contact form send.
3. Custom domains → add `nxtsmarthome.com.au` and `www.nxtsmarthome.com.au`. Add
   a Cloudflare Redirect Rule from www to the apex (301). `_redirects` cannot
   match on hostname.
4. To rebuild when content is published, add a Pages deploy hook and call it
   from a Strapi webhook on `nxtsmarthome-*` publish. Without the hook, Strapi
   edits appear only on the next push.
5. Then retire the server copy:
   - stop `nxtsmarthome-contact`;
   - unlink the nginx vhost;
   - update README, CLAUDE.md and `/opt/CLAUDE.md`, which currently say "do not
     publish by pushing master".
