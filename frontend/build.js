const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const isCloudflare = process.env.CF_PAGES === '1';

// Clean Next.js cache directory to avoid typescript dev/prod conflicts
const nextDir = path.join(__dirname, '.next');
if (fs.existsSync(nextDir)) {
  console.log('Cleaning existing .next cache...');
  fs.rmSync(nextDir, { recursive: true, force: true });
}

try {
  if (isCloudflare) {
    console.log('Building for Cloudflare Pages (next-on-pages)...');
    execSync('npx -y @cloudflare/next-on-pages', { stdio: 'inherit' });
  } else {
    console.log('Building locally (next build)...');
    execSync('next build', { stdio: 'inherit' });
  }
} catch (error) {
  console.error('Build execution failed:', error);
  process.exit(1);
}
