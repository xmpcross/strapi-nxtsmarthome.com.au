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
const taskIds = ['08041716-2228-0179-0000-53d668822bc8', '08041715-2228-0179-0000-937e80cdfa59'];

async function getResult() {
  for (const taskId of taskIds) {
    console.log(`\nFetching task result for Task ID ${taskId}...`);
    const url = `https://api.dataforseo.com/v3/merchant/google/products/task_get/advanced/${taskId}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    const task = json.tasks?.[0];
    console.log('Status Code:', task?.status_code, 'Message:', task?.status_message);

    if (task?.status_code === 20000) {
      const items = task.result?.[0]?.items || [];
      console.log(`\n🎉 SUCCESS! Received ${items.length} items from DataForSEO.`);
      if (items.length > 0) {
        console.log('\n--- TOP ITEM ---');
        console.log(JSON.stringify(items[0], null, 2));

        const outputDir = path.join(process.cwd(), 'scratch');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
        const outputPath = path.join(outputDir, 'single_product_fetch.json');
        fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf8');
        console.log(`\n💾 Saved all ${items.length} product items to ${outputPath}`);
        return;
      }
    }
  }
}

getResult();
