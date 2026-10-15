import { execSync } from 'child_process';

function run(cmd, label) {
  console.log(`\n>> ${label}`);
  console.log(`   $ ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit', cwd: process.cwd() });
    console.log(`   OK!`);
  } catch (err) {
    console.error(`\n   GAGAL: ${label}`);
    process.exit(1);
  }
}

console.log('\n========================================');
console.log('  MangkokKecil - Auto Deploy to Vercel');
console.log('========================================\n');

// Step 1: Patch adapter
run('node scripts/patch-vercel.mjs', '[1/5] Verifikasi compatibility adapter...');

// Step 2: Build
run('npx astro build', '[2/5] Build project...');

// Step 3: Git add
run('git add -A', '[3/5] Tambahkan semua perubahan...');

// Step 4: Git commit
const now = new Date();
const timestamp = now.toISOString().slice(0, 16).replace('T', ' ');
try {
  execSync('git diff --cached --quiet', { cwd: process.cwd() });
  console.log('\n>> [4/5] Tidak ada perubahan baru, skip commit...');
} catch {
  run(`git commit -m "deploy: update ${timestamp}"`, '[4/5] Commit perubahan...');
}

// Step 5: Push
run('git push origin main', '[5/5] Push ke GitHub...');

console.log('\n========================================');
console.log('  DEPLOY SUKSES!');
console.log('  Vercel auto-deploy sedang berjalan...');
console.log('  https://mangkokkecil-blog.vercel.app');
console.log('  Tunggu 1-2 menit lalu cek website.');
console.log('========================================\n');
