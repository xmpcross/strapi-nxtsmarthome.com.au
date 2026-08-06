/**
 * scripts/fetch-single-product.mjs
 *
 * Fetches a single test product ("Smart Wi-Fi Plug Mini AU (MSS210) Ultra")
 * from DataForSEO Google Shopping API (Location: 2036 Australia, Depth: 1).
 */

import fs from 'node:fs';
import path from 'node:path';

// Parse .env.local if present
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envLines = fs.readFileSync(envLocalPath, 'utf8').split('\n');
  for (const line of envLines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valParts] = trimmed.split('=');
      const val = valParts.join('=').trim();
      if (key && val && !process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  }
}

const PRODUCT_KEYWORD = 'Smart Wi-Fi Plug Mini AU MSS210 Ultra';
const DATAFORSEO_API_URL = 'https://api.dataforseo.com/v3/merchant/google/products/live';
const LOCATION_CODE = 2036; // Australia
const LANGUAGE_CODE = 'en';

async function fetchSingleProduct() {
  console.log(`🔍 Preparing single product fetch query: "${PRODUCT_KEYWORD}"...`);

  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;

  if (!login || !password || login.trim() === '' || password.trim() === '') {
    console.error('\n❌ ERROR: DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD credentials are missing in .env.local!');
    console.log('👉 Please add your DataForSEO login and password to .env.local:');
    console.log('DATAFORSEO_LOGIN=your_email_or_login');
    console.log('DATAFORSEO_PASSWORD=your_api_password');
    process.exit(1);
  }

  const auth = Buffer.from(`${login}:${password}`).toString('base64');
  const postData = [
    {
      keyword: PRODUCT_KEYWORD,
      location_code: LOCATION_CODE,
      language_code: LANGUAGE_CODE,
      depth: 5, // fetch top 5 items for best match
    },
  ];

  console.log(`🚀 Sending API request to DataForSEO Google Shopping Live API...`);
  const response = await fetch(DATAFORSEO_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error(`DataForSEO HTTP Error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  const tasks = json.tasks || [];
  const items = tasks[0]?.result?.[0]?.items || [];

  console.log(`\n✅ DataForSEO Response Received! (${items.length} items found)`);

  if (items.length === 0) {
    console.log('ℹ️ No items returned for query. Raw Task Status:', JSON.stringify(tasks[0]?.status_message));
    return;
  }

  const firstItem = items[0];
  console.log('\n📦 --- FETCHED PRODUCT DETAILS ---');
  console.log('Title:', firstItem.title);
  console.log('Brand:', firstItem.brand);
  console.log('Price:', firstItem.price, firstItem.currency || 'AUD');
  console.log('High Price (RRP):', firstItem.high_price);
  console.log('Rating:', firstItem.rating?.value, `(${firstItem.rating?.votes_count || 0} votes)`);
  console.log('Seller:', firstItem.seller);
  console.log('Main URL:', firstItem.url);
  console.log('Product ID (GID):', firstItem.product_id);
  console.log('GTIN:', firstItem.gtin);
  console.log('MPN:', firstItem.mpn);
  console.log('Main Image:', firstItem.profile_image_url || firstItem.image_url);
  console.log('Sellers Count:', firstItem.sellers?.length || 0);

  // Save detailed single product test output to scratch/single_product_fetch.json
  const outputDir = path.join(process.cwd(), 'scratch');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'single_product_fetch.json');
  fs.writeFileSync(outputPath, JSON.stringify(firstItem, null, 2), 'utf8');
  console.log(`\n💾 Saved raw single product API payload to ${outputPath}`);
}

fetchSingleProduct().catch((err) => {
  console.error('Fatal error fetching single product:', err);
  process.exit(1);
});
