import fs from 'node:fs';
import path from 'node:path';

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

const login = process.env.DATAFORSEO_LOGIN;
const password = process.env.DATAFORSEO_PASSWORD;
const auth = Buffer.from(`${login}:${password}`).toString('base64');

async function fetchHighPriority() {
  console.log('🚀 Sending High-Priority Task to DataForSEO Google Merchant Products API...');
  const postUrl = 'https://api.dataforseo.com/v3/merchant/google/products/task_post';
  const postData = [
    {
      keyword: 'Smart Wi-Fi Plug Mini AU MSS210 Ultra',
      location_code: 2036, // Australia
      language_code: 'en',
      depth: 5,
      priority: 2, // High priority
    },
  ];

  const postRes = await fetch(postUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  const postJson = await postRes.json();
  const taskId = postJson.tasks?.[0]?.id;
  console.log(`Priority Task Created! Task ID: ${taskId}`);

  if (!taskId) {
    console.error('Error creating task:', postJson);
    return;
  }

  const getUrl = `https://api.dataforseo.com/v3/merchant/google/products/task_get/advanced/${taskId}`;
  for (let i = 1; i <= 15; i++) {
    console.log(`Checking task status (Attempt ${i}/15)...`);
    await new Promise((r) => setTimeout(r, 3000));

    const getRes = await fetch(getUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    const getJson = await getRes.json();
    const task = getJson.tasks?.[0];
    console.log(`Status: ${task?.status_code} - ${task?.status_message}`);

    if (task?.status_code === 20000) {
      const items = task.result?.[0]?.items || [];
      console.log(`\n🎉 SUCCESS! Fetched ${items.length} items from DataForSEO.`);
      if (items.length > 0) {
        const item = items[0];
        console.log('\n📦 --- FETCHED SINGLE PRODUCT DETAILS ---');
        console.log('Title:', item.title);
        console.log('Brand:', item.brand);
        console.log('Price:', item.price, item.currency || 'AUD');
        console.log('High Price (RRP):', item.high_price);
        console.log('Rating:', item.rating?.value, `(${item.rating?.votes_count || 0} votes)`);
        console.log('Seller:', item.seller);
        console.log('URL:', item.url);
        console.log('Product ID (GID):', item.product_id);
        console.log('GTIN:', item.gtin);
        console.log('MPN:', item.mpn);
        console.log('Image:', item.profile_image_url || item.image_url);
        console.log('Sellers Count:', item.sellers?.length || 0);

        const outputDir = path.join(process.cwd(), 'scratch');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
        const outputPath = path.join(outputDir, 'single_product_fetch.json');
        fs.writeFileSync(outputPath, JSON.stringify(item, null, 2), 'utf8');
        console.log(`\n💾 Saved raw product payload to ${outputPath}`);
      }
      return;
    }
  }
}

fetchHighPriority().catch((err) => console.error('Error:', err));
