const { execSync } = require('child_process');
const isCloudflare = process.env.CF_PAGES === '1';

try {
  if (isCloudflare) {
    console.log('Building for Cloudflare Pages (next-on-pages)...');
    execSync('npx @cloudflare/next-on-pages', { stdio: 'inherit' });
  } else {
    console.log('Building locally (next build)...');
    execSync('next build', { stdio: 'inherit' });
  }
} catch (error) {
  console.error('Build execution failed:', error);
  process.exit(1);
}
