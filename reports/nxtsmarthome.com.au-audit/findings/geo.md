# GEO / AI Search Readiness: nxtsmarthome.com.au

Audited 6 Oct 2026 (live site, Cloudflare edge SYD). Source read-only at `/opt/projects/nxtsmarthome.com.au`.
Every finding below comes from a live HTTP response or a source file named here. Nothing is estimated from traffic data.

## AI Search Readiness score: 58 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 58 | 14.5 |
| Structural readability | 20% | 65 | 13.0 |
| Multi-modal content | 15% | 50 | 7.5 |
| Authority and brand signals | 20% | 45 | 9.0 |
| Technical accessibility | 20% | 70 | 14.0 |
| **Total** | | | **58** |

Platform readiness (judgement based on the evidence below):

| Platform | Score | Basis |
|---|---|---|
| Google AI Overviews | 62 | Googlebot 200, SSR, Article/FAQPage/Breadcrumb schema. Held back by thin entity signals. |
| ChatGPT Search | 55 | OAI-SearchBot and ChatGPT-User get 200. GPTBot gets 403, but that only affects training. No off-site mentions found. |
| Perplexity | 55 | PerplexityBot and Perplexity-User get 200. No Reddit or YouTube footprint found. Few outbound citations on legal content. |
| Bing Copilot | 60 | bingbot 200, IndexNow key live (`/982d15ff….txt`, `scripts/submit-indexnow.mjs`). |

## AI crawler access

robots.txt (`app/robots.ts`) has one rule, `User-Agent: *`, `Allow: /`, which disallows only `/search/`, `/preview/`, `/design-preview/` and `/cdn-cgi/`. No AI bot is named, and there is no Content-Signal line.

Cloudflare blocks some crawlers at the edge whatever robots.txt says. The test was a GET of `/` with each bot's user-agent string. Blocked responses were `403`, body `Your request was blocked.` (25 bytes).

| Crawler | What it governs | Result |
|---|---|---|
| OAI-SearchBot | ChatGPT Search index | 200 allowed |
| ChatGPT-User | ChatGPT live fetch | 200 allowed |
| GPTBot | OpenAI training only | **403 blocked** (both the full UA and `GPTBot/1.2`) |
| Claude-SearchBot | Claude search | 200 allowed |
| Claude-User | Claude live fetch | 200 allowed |
| ClaudeBot, anthropic-ai | Anthropic training only | **403 blocked** |
| PerplexityBot / Perplexity-User | Perplexity index / live fetch | 200 allowed |
| Googlebot | Google Search and AI Overviews | 200 allowed |
| Google-Extended | Gemini training and grounding (not AIO) | 200 allowed |
| bingbot | Bing and Copilot | 200 allowed |
| Applebot / Applebot-Extended | Siri/Spotlight / Apple training | 200 / 200 |
| CCBot, Bytespider, cohere-ai, Amazonbot | training (Amazonbot also feeds Alexa answers) | **403 blocked** |
| meta-externalagent, DuckAssistBot, MistralAI-User | | 200 |

Caveat: these tests sent spoofed user-agents from this host's IP. Cloudflare's AI-bot rule acts on verified bot traffic too, but its pattern looks version-sensitive: a bare `GPTBot` UA got 200 on `/articles/`. Confirm the exact rule in Cloudflare under Security → Bots / AI Crawl Control.

## What works

- **Server-rendered.** `is_spa: false` on all pages tested. The full article text is in the raw HTML, so crawlers that do not run JavaScript still get the content.
- **The search crawlers for every major AI platform are allowed** (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, bingbot).
- **Schema on every article:** Organization and WebSite with SearchAction, Article (with datePublished and dateModified), BreadcrumbList, and FAQPage with 4–6 Q&As that match the visible `<details>` accordions. `lib/seo.ts` types the author correctly: Person for named writers, Organization for the editorial team.
- **Named author with a profile page.** `/authors/kritin-curtis/` carries Person schema. The byline is visible, a `<time datetime>` is present, and `og:type=article` comes with published and modified times.
- **Honest methodology.** The author bio says the guides are "research-based rather than hands-on reviews", which matches `/how-we-test/`. That is a trust signal AI systems can quote safely.
- **Strong AU-specific facts in the smart plug guide:** 10 A / 2300 W ratings, RCM, the EESS registration database, ACCC warranties, and ESV marketplace guidance. It has 7 outbound links to .gov.au regulators. This is the best page on the site to be cited.
- **The Reolink vs Eufy article opens with the answer.** Its first 60 words give the verdict ("Reolink generally suits… while Eufy suits…").
- **Discovery:** `sitemap.xml` (117 URLs, all with lastmod), `feed.xml` (30 items), IndexNow, `lang="en-AU"`, self-referencing canonicals.
- **Accessibility basics:** a "Skip to content" link, one each of `<header>`, `<main>`, `<article>` and `<footer>`, one H1 per page, and alt text on every article image tested.
- **Drafts are held back properly.** 24 draft or `[VERIFY]`-tagged files in `content/articles/` are absent from the sitemap, and the live text of the 4 tested articles contains no `[VERIFY]`.

## Articles sampled

| Article | Words | Answer-first | Question headings | Tables | Ext. links (gov) | Paras ≥60w |
|---|---|---|---|---|---|---|
| /hubs-and-platforms/best-smart-home-platform-australia/ | 1405 | No (scene-setting intro) | 5 (FAQ only) | 1 | 7 (0) | 2 |
| /setup-guides/smart-home-electrical-work-australia-legal/ | 894 | Partial (answer in the 3rd paragraph) | 4 (FAQ only) | 0 | **0 (0)** | 0 |
| /energy-and-solar/smart-plug-buying-guide-australia/ | 1695 | No (intro, then answer) | 5 (FAQ only) | 0 | 34 (7) | 6 |
| /security-and-cameras/reolink-vs-eufy-security-cameras/ | 1758 | **Yes** | 7 | 0 (the "Quick Comparison" is not a table) | 26 (0) | 14 |

Average paragraph length is 20–32 words. No paragraph falls in the 130–170-word "self-contained block" band, which is a third-party heuristic: Google says content does not need chunking for AI.

## Findings

### GEO-1: The legal/safety article cites no sources (High)
Evidence: `/setup-guides/smart-home-electrical-work-australia-legal/` has 0 outbound links. It still makes claims stated as settled law: "In every Australian state and territory, fixed electrical wiring work must be carried out by a licensed electrician. There is no general homeowner exemption", plus claims about insurance exclusions. The author bio says "legal or safety points link to the official source", and site rule 6 says never state law as settled. For "can I install a smart switch myself" queries, AI engines prefer passages they can attribute to a source. An uncited legal claim is both less likely to be cited and a liability.
Fix: link each state or territory regulator (ESV, the QLD Electrical Safety Office, NSW Fair Trading, and so on). Add a short "check your state's regulator" table. Soften the claim about "every state" until it has been checked against each regulator. Effort: 1–2 h of editorial work plus a fact-check.

### GEO-2: Cloudflare blocks crawlers that robots.txt allows (Medium)
Evidence: robots.txt says `User-Agent: * Allow: /`, but the edge returns 403 to GPTBot, ClaudeBot, anthropic-ai, CCBot, Bytespider, cohere-ai and Amazonbot. Search and live-fetch citation is **not** affected (OAI-SearchBot, Claude-SearchBot, PerplexityBot, ChatGPT-User and Claude-User all get 200). The cost is lost presence in model training data, which matters for a new brand that has no entity footprint, and Amazonbot's role in Alexa answers. A smart-home site has a real Alexa audience.
Fix: make a deliberate decision and make both layers agree. Either relax the Cloudflare AI-crawler block (allowing at least Amazonbot, and GPTBot/ClaudeBot if training exposure is wanted for brand recall), or keep it and state the same policy in robots.txt with named `Disallow` groups and a Content-Signal line, so the two layers match. Effort: 15 min in the Cloudflare dashboard plus `app/robots.ts`.

### GEO-3: Organization entity is thin (Medium)
Evidence: the Organization JSON-LD has only `name`, `url`, `email` and `sameAs: [facebook]`. `lib/site.ts` has `twitter: ''` and `youtube: ''`. There is no `logo`, `description`, `foundingDate`, `areaServed` or `address`. The Person schema for Kritin Curtis has no `sameAs`, `image`, `jobTitle` or `knowsAbout` (`role: ''` in `content/authors/kritin-curtis.md`), even though an avatar URL exists. The Wikipedia API search for "nxtsmarthome" returns 0 hits. A DuckDuckGo check found no Reddit or YouTube mentions; the only third-party result for the domain was kogan.com. That check is low-confidence, since DuckDuckGo results are rate-limited.
Fix: add `logo` (the site already has `/logo.svg` and `/icon-512.png`), `description` and `areaServed: AU` to `organisationJsonLd()`. Add `image`, `jobTitle`, `knowsAbout`, and a LinkedIn `sameAs` (if the author has one) to the author Person schema. Create a YouTube channel or LinkedIn page and add them to `site.social`. Effort: 1 h of code, then ongoing off-site work.

### GEO-4: Answers arrive late in 3 of 4 articles (Medium)
Evidence: the platform guide opens "The platform you choose matters more than any individual device…". The smart plug guide opens "Smart plugs are the cheapest way into home automation…". Neither gives a verdict until after the intro. The Reolink vs Eufy article does lead with the answer and shows the pattern to copy. Outside the FAQ blocks, H2s are mostly statements ("The rule, plainly", "A simple decision rule") rather than the questions people ask.
Fix: open each article with a 40–60-word direct answer or verdict. Rephrase the main H2s as questions where it reads naturally ("Can I install a smart switch myself in Australia?"). Effort: about 20 min per article.

### GEO-5: Navigation and commercial headings mixed into the article outline (Medium)
Evidence: inside `<article>`, every page has the H2s "Read Also", "Affiliate Link" and "Comments" / H3 "Leave a comment". In the platform guide, "Read Also" sits between "Samsung SmartThings" and "Home Assistant", breaking up the comparison. Product boxes add H3s (for example "TP-Link Tapo P110…") under unrelated H2s. Parsers that split content by heading will pull this chrome into answer passages.
Fix: render the Read Also, affiliate and comments blocks as `<aside>` with non-heading labels (or `aria-label`), and place Read Also after the main content. Render product-box titles as non-heading elements. Effort: 1–2 h of component work.

### GEO-6: Too few comparison tables (Low–Medium)
Evidence: 1 `<table>` across the 4 articles. "Making Your Choice: A Quick Comparison" (Reolink vs Eufy) has no table. AI engines often lift comparison tables directly.
Fix: add a real HTML table to each comparison or buying guide: specs, storage, subscription, AU retailers. Only use verified figures and leave out any that cannot be confirmed (rule 7). Effort: about 30 min per article.

### GEO-7: No llms.txt, no Markdown version, no /.well-known files (Low)
Evidence: `/llms.txt`, `/llms-full.txt`, `/index.md`, `/<article>.md`, `/.well-known/security.txt`, `/.well-known/mcp.json`, `agent-card.json` and `agents.json` all return 404 (full HTML 404 pages of 65–108 KB). A request with `Accept: text/markdown` still returns `text/html`. There is no RSL licence (`/license.xml`). No AI platform has confirmed that it uses llms.txt, so the impact is speculative, but it is cheap to add.
Fix: add a static `public/llms.txt` listing the about, how-we-test and affiliate-disclosure pages and the pillar articles by category. Optionally serve `.md` versions of articles from the existing Markdown source. Add a `security.txt`. Effort: 1 h.

### GEO-8: Heavy HTML, and the visible date is ambiguous (Low)
Evidence: raw HTML is 323 KB for the smart plug article and 551 KB for the homepage, mostly RSC payload. That is fine for crawlers but wasteful for agents with token limits. The visible byline shows one date in US format ("August 1, 2026"). The electrical article was published 2026-03-19 and modified 2026-08-01, but the date is not labelled "Updated". Seven "Save to reading list" buttons have only a `title` attribute and no `aria-label`.
Fix: label the date "Updated 1 August 2026" in AU format. Add `aria-label` to the icon buttons. Effort: 30 min.

### GEO-9: No feed autodiscovery (Low)
Evidence: `/feed.xml` is live, but there is no `<link rel="alternate" type="application/rss+xml">` in the article `<head>`.
Fix: add `alternates.types` to the root metadata. Effort: 5 min.

## Top 5 changes by impact

1. GEO-1: cite the state regulators on the legal and safety articles (High, 1–2 h).
2. GEO-4: open every article with a direct answer, and use question H2s (Medium, ~20 min per article).
3. GEO-3: Organization logo, description and sameAs, a richer author Person, plus off-site YouTube/LinkedIn/Reddit presence (Medium, 1 h of code, then ongoing).
4. GEO-5: move Read Also, Affiliate Link and Comments out of the article heading outline (Medium, 1–2 h).
5. GEO-2: make the Cloudflare AI-bot blocking and robots.txt agree, and reconsider Amazonbot (Medium, 15 min).

## Structured findings (audit-data.json, category "AI Search Readiness")

```json
{
  "category": "AI Search Readiness",
  "score": 58,
  "subscores": {"citability": 58, "structure": 65, "multimodal": 50, "authority": 45, "technical": 70},
  "platforms": {"google_aio": 62, "chatgpt": 55, "perplexity": 55, "bing_copilot": 60},
  "findings": [
    {"id": "GEO-1", "severity": "high", "title": "Legal electrical-work article has zero outbound citations", "url": "/setup-guides/smart-home-electrical-work-australia-legal/"},
    {"id": "GEO-2", "severity": "medium", "title": "Cloudflare 403s GPTBot, ClaudeBot, anthropic-ai, CCBot, Bytespider, cohere-ai, Amazonbot while robots.txt allows all"},
    {"id": "GEO-3", "severity": "medium", "title": "Organization schema lacks logo/description; sameAs only Facebook; author Person lacks sameAs/image/jobTitle; no Wikipedia/Reddit/YouTube footprint found"},
    {"id": "GEO-4", "severity": "medium", "title": "3 of 4 sampled articles do not lead with a direct answer; few question H2s outside FAQs"},
    {"id": "GEO-5", "severity": "medium", "title": "'Read Also', 'Affiliate Link', 'Comments' H2s and product H3s inside <article> outline"},
    {"id": "GEO-6", "severity": "low", "title": "Only 1 HTML table across 4 sampled articles"},
    {"id": "GEO-7", "severity": "low", "title": "No llms.txt, no Markdown delivery, no /.well-known files, no RSL licence"},
    {"id": "GEO-8", "severity": "low", "title": "323-551 KB HTML; ambiguous US-format visible date; icon buttons title-only"},
    {"id": "GEO-9", "severity": "low", "title": "No RSS autodiscovery link"}
  ]
}
```
