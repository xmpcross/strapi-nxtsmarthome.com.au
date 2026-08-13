#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const siteUrl = 'https://nxtsmarthome.com.au';
const host = 'nxtsmarthome.com.au';
const key = '982d15ff0cc8a13e34b98d230c838560';
const keyLocation = `${siteUrl}/${key}.txt`;
const endpoint = 'https://api.indexnow.org/indexnow';

const listFile = process.argv[2];
if (!listFile) {
  console.error('Usage: node scripts/submit-indexnow.mjs <url-list-file>');
  process.exit(2);
}

const paths = (await readFile(listFile, 'utf8'))
  .split(/\r?\n/)
  .map((value) => value.trim())
  .filter(Boolean);

const urlList = [...new Set(paths.map((pathname) => new URL(pathname, siteUrl).toString()))];
if (urlList.length === 0) {
  console.log('==> IndexNow: no changed public URLs to submit');
  process.exit(0);
}

if (urlList.length > 10_000) {
  throw new Error(`IndexNow accepts at most 10,000 URLs per request; received ${urlList.length}`);
}

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (![200, 202].includes(response.status)) {
  const details = (await response.text()).trim();
  throw new Error(`IndexNow returned HTTP ${response.status}${details ? `: ${details}` : ''}`);
}

console.log(`==> IndexNow: submitted ${urlList.length} changed URL(s), HTTP ${response.status}`);
