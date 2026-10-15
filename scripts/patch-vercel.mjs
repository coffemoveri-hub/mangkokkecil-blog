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

  const regex = /function getRuntime\([^)]*\)\s*\{[\s\S]*?\n\}/;
  const replacement = "function getRuntime() {\n    return 'nodejs22.x';\n}";
  if (regex.test(content) && !content.includes(replacement)) {
    content = content.replace(regex, replacement);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(adapterPath, content, 'utf8');
    console.log('[patch-vercel] Patched @astrojs/vercel to use nodejs22.x runtime.');
  } else {
    console.log('[patch-vercel] @astrojs/vercel already configured for nodejs22.x.');
  }
}
