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

// Step 1: Build
run('npx astro build', '[1/4] Build project...');

// Step 2: Git add
run('git add -A', '[2/4] Tambahkan semua perubahan...');

// Step 3: Git commit
const now = new Date();
const timestamp = now.toISOString().slice(0, 16).replace('T', ' ');
try {
  execSync('git diff --cached --quiet', { cwd: process.cwd() });
  console.log('\n>> [3/4] Tidak ada perubahan baru, skip commit...');
} catch {
  run(`git commit -m "deploy: update ${timestamp}"`, '[3/4] Commit perubahan...');
}

// Step 4: Push
run('git push origin main', '[4/4] Push ke GitHub...');

console.log('\n========================================');
console.log('  DEPLOY SUKSES!');
console.log('  Vercel auto-deploy sedang berjalan...');
console.log('  https://mangkokkecil.vercel.app');
console.log('  Tunggu 1-2 menit lalu cek website.');
console.log('========================================\n');
