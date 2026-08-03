/**
 * Scaffold a new article with correct frontmatter.
 *
 *   npm run new:article -- "How to Pick a Smart Lock" security how-to
 *
 * Arguments: title, category key, article type.
 */
import fs from 'node:fs';
import path from 'node:path';

const CATEGORY_KEYS = [
  'security',
  'lighting',
  'energy',
  'entertainment',
  'climate',
  'hubs-and-platforms',
  'robot-vacuums',
  'setup-guides',
  'buying-guides',
];

const TYPES = ['review', 'comparison', 'buying-guide', 'how-to', 'explainer', 'roundup', 'pillar'];

const [title, category, type] = process.argv.slice(2);

if (!title || !category || !type) {
  console.error('Usage: npm run new:article -- "Article Title" <category> <type>');
  console.error(`\nCategories: ${CATEGORY_KEYS.join(', ')}`);
  console.error(`Types:      ${TYPES.join(', ')}`);
  process.exit(1);
}

if (!CATEGORY_KEYS.includes(category)) {
  console.error(`Unknown category "${category}". Valid: ${CATEGORY_KEYS.join(', ')}`);
  process.exit(1);
}

if (!TYPES.includes(type)) {
  console.error(`Unknown type "${type}". Valid: ${TYPES.join(', ')}`);
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const today = new Date().toISOString().slice(0, 10);
const filePath = path.join(process.cwd(), 'content', 'articles', `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`Already exists: content/articles/${slug}.md`);
  process.exit(1);
}

const template = `---
title: '${title.replace(/'/g, "''")}'
description: 'One or two sentences that would make someone click this in a search result. Aim for 140-160 characters.'
category: ${category}
type: ${type}
date: '${today}'
draft: true
keyTakeaway: 'The answer, in two sentences, for someone who will not read the whole thing.'
tags:
  - Tag one
  - Tag two
faq:
  - q: 'A question people actually search for'
    a: 'A direct answer in two to four sentences. This feeds FAQ structured data, so answer the question rather than teasing the article.'
---

Opening paragraph. Say what the reader is trying to decide and what this article will settle for them. No throat-clearing.

## First real heading

Body copy.

<!--
  Adding products? Put them in frontmatter, not inline. They render as buy boxes
  with affiliate-tracked links and feed ItemList structured data:

  products:
    - name: 'Product name'
      brand: 'Brand'
      bestFor: 'Who it suits'
      pros:
        - 'Something specific'
      cons:
        - 'Something honest'
      retailers:
        - name: 'JB Hi-Fi'
          url: 'https://www.jbhifi.com.au/search?query=example'

  Two fields are deliberately absent. Do not add a rating unless the device has
  genuinely been hands-on tested — a star rating claims a test that did not happen.
  Do not add a price: it goes stale between deploys and several affiliate
  programmes require far fresher pricing than this site rebuilds. Buttons say
  "Check price at X" instead. See CLAUDE.md rules 5 and 7.

  Better still, put the product in content/products/ and let
  scripts/link-products.mjs place it — one file, reusable across articles.

  Remove draft: true when ready to publish.
-->
`;

fs.writeFileSync(filePath, template);
console.log(`Created content/articles/${slug}.md`);
console.log('It is marked draft: true — remove that line to publish.');
