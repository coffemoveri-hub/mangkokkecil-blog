import fs from 'fs';
import path from 'path';

const adapterPath = path.resolve('node_modules/@astrojs/vercel/dist/serverless/adapter.js');

if (fs.existsSync(adapterPath)) {
  let content = fs.readFileSync(adapterPath, 'utf8');
  let changed = false;

  if (!content.includes("22: { status: 'default' }")) {
    content = content.replace(
      /20:\s*\{\s*status:\s*'default'\s*\},?/,
      "20: { status: 'default' },\n    22: { status: 'default' },"
    );
    changed = true;
  }

  if (content.includes("return 'nodejs18.x';")) {
    content = content.replace("return 'nodejs18.x';", "return 'nodejs20.x';");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(adapterPath, content, 'utf8');
    console.log('[patch-vercel] Patched @astrojs/vercel for Node 22 and removed nodejs18.x fallback.');
  } else {
    console.log('[patch-vercel] @astrojs/vercel already patched.');
  }
}
