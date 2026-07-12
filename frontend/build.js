const { execSync } = require('child_process');
const isCloudflare = process.env.CF_PAGES === '1';
// vercel build (invoked internally by next-on-pages) re-runs this exact
// `npm run build` script to do the actual Next.js compile. Without this
// check, that inner call would see CF_PAGES=1 again and re-invoke
// next-on-pages, which Vercel detects as illegal recursion and aborts.
const isVercelInternalBuild = process.env.VERCEL === '1' || process.env.__VERCEL_BUILD_RUNNING === '1';

try {
  if (isCloudflare && !isVercelInternalBuild) {
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