import fs from 'node:fs';
import path from 'node:path';

// Parse .env.local
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

const ENDPOINTS_TO_TEST = [
  'https://api.dataforseo.com/v3/merchant/google/products/live/advanced',
  'https://api.dataforseo.com/v3/merchant/google/products/live/html',
  'https://api.dataforseo.com/v3/merchant/google/sellers/live/advanced',
  'https://api.dataforseo.com/v3/merchant/google/shopping/live/advanced',
];

const postData = [
  {
    keyword: 'Smart Wi-Fi Plug Mini AU MSS210 Ultra',
    location_code: 2036,
    language_code: 'en',
  },
];

async function testEndpoints() {
  console.log('Testing DataForSEO API Endpoints with provided credentials...');
  for (const url of ENDPOINTS_TO_TEST) {
    try {
      console.log(`\nTesting POST ${url}...`);
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      console.log(`Status: ${res.status} ${res.statusText}`);
      if (res.ok) {
        const json = await res.json();
        console.log('SUCCESS! Tasks returned:', json.tasks?.length);
        if (json.tasks?.[0]?.status_message) {
          console.log('Status Message:', json.tasks[0].status_message);
        }
        if (json.tasks?.[0]?.result?.[0]?.items) {
          console.log('Items count:', json.tasks[0].result[0].items.length);
        }
      } else {
        const text = await res.text();
        console.log('Response body:', text.slice(0, 200));
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  }
}

testEndpoints();
