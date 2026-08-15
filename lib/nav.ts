/**
 * Header navigation.
 *
 * The nav used to be derived from `categories` in lib/site.ts at module load.
 * It is now managed in Strapi (`nxtsmart-menu`) so it can be changed without a
 * code change — but it is still resolved entirely at build time, because this
 * is a static export.
 *
 * `scripts/fetch-nav.mjs` (npm prebuild) pulls it from Strapi into
 * lib/nav-cache.json; this module only reads that file. Nothing here fetches:
 * `output: 'export'` rejects any fetch that is not statically cacheable, so a
 * fetch in the React tree is dropped and the fallback renders in its place —
 * quietly, on every page.
 *
 * Two levels of fallback, so a build can never fail for want of a nav:
 *
 *   1. lib/nav-cache.json     — last successful fetch, so CMS edits survive an outage
 *   2. lib/site.ts derivation — always in the repo, correct for a fresh clone
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  guideNavLinks,
  latestNavLink,
  productCategoryNavLinks,
  productsNavLink,
  searchLink,
  topicNavLinks,
} from '@/lib/site';

export interface NavLink {
  href: string;
  label: string;
  emoji?: string;
}

export interface Nav {
  productsNavLink: NavLink;
  productCategoryNavLinks: NavLink[];
  topicNavLinks: NavLink[];
  guideNavLinks: NavLink[];
  latestNavLink: NavLink;
  searchLink: NavLink;
}

const CACHE_PATH = path.join(process.cwd(), 'lib', 'nav-cache.json');

/** The in-repo fallback. Derived from `categories`, so it tracks the taxonomy
 *  automatically and is correct even with no CMS reachable. */
const STATIC_NAV: Nav = {
  productsNavLink,
  productCategoryNavLinks: [...productCategoryNavLinks],
  topicNavLinks: [...topicNavLinks],
  guideNavLinks: [...guideNavLinks],
  latestNavLink,
  searchLink,
};

/* A dropdown that renders empty is a worse outcome than one link out of date,
   so every group the header needs must be populated before the cache is used. */
function isUsable(nav: Nav | null): nav is Nav {
  if (!nav) return false;
  return Boolean(
    nav.productsNavLink?.href &&
      nav.latestNavLink?.href &&
      nav.searchLink?.href &&
      nav.productCategoryNavLinks?.length &&
      nav.topicNavLinks?.length &&
      nav.guideNavLinks?.length,
  );
}

let resolved: Nav | null = null;

/** Resolve the nav once per build. Never throws and never returns an empty nav. */
export function getNav(): Nav {
  if (resolved) return resolved;

  let fromCache: Nav | null = null;
  try {
    fromCache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) as Nav;
  } catch {
    fromCache = null;
  }

  if (isUsable(fromCache)) {
    resolved = fromCache;
  } else {
    console.warn('[nav] No usable lib/nav-cache.json — using the nav from lib/site.ts.');
    resolved = STATIC_NAV;
  }
  return resolved;
}
