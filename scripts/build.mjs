import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceMode = process.argv.includes('--source');
const output = sourceMode ? root : path.join(root, 'dist');
const publicBase = 'https://jbgainesiii-byte.github.io/cwpdetroit/';
const pages = ['index.html', 'thanks.html', 'privacy.html', 'accessibility.html', 'service-policies.html', '404.html'];
const textFiles = [...pages, 'robots.txt', 'sitemap.xml', 'llms.txt'];
const requestedBase = sourceMode ? publicBase : (process.env.SITE_URL || (process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy' ? process.env.DEPLOY_PRIME_URL : process.env.URL) || publicBase);
const parsedBase = new URL(requestedBase);
if (parsedBase.protocol !== 'https:' || parsedBase.username || parsedBase.password || parsedBase.search || parsedBase.hash) throw new Error('SITE_URL must be a plain HTTPS site URL.');
const base = parsedBase.href.replace(/\/$/, '') + '/';

if (!sourceMode) {
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  for (const file of [...textFiles, 'assets', 'css', 'js']) await cp(path.join(root, file), path.join(output, file), { recursive: true });
}
for (const file of textFiles) {
  let text = await readFile(path.join(output, file), 'utf8');
  text = text.replaceAll('https://cleaningwithpurpose.org/', base).replaceAll(publicBase, base);
  if (!sourceMode && ['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT)) {
    if (file.endsWith('.html')) {
      text = text.replace(/<meta name="robots"[^>]*\/>/g, '').replace('</head>', '<meta name="robots" content="noindex, nofollow" />\n</head>');
    }
    if (file === 'robots.txt') text = 'User-agent: *\nDisallow: /\n';
  }
  if (!sourceMode && file === 'index.html' && process.env.CWP_FORMS_ENABLED === 'true') {
    if (process.env.NETLIFY !== 'true') throw new Error('Only enable the inquiry form on a verified Netlify deployment.');
    text = text.replace('<form hidden class="form-card"', '<form class="form-card"')
      .replace('id="request-fields" disabled', 'id="request-fields"')
      .replace('id="contact-options">', 'id="contact-options" hidden>');
  }
  await writeFile(path.join(output, file), text);
}

// Hash the non-executable structured data as well; no inline-script exception.
const index = await readFile(path.join(output, 'index.html'), 'utf8');
const hashes = [...index.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map(match => "'sha256-" + createHash('sha256').update(match[1]).digest('base64') + "'");
const policy = "default-src 'none'; script-src 'self' " + hashes.join(' ') + "; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'none'; object-src 'none'; frame-src 'none'; upgrade-insecure-requests";
for (const page of pages) {
  let html = await readFile(path.join(output, page), 'utf8');
  html = html.replace(/\s*<meta http-equiv="Content-Security-Policy"[^>]*\/>/g, '').replace(/\s*<meta name="referrer"[^>]*\/>/g, '');
  html = html.replace('<meta charset="UTF-8" />', '<meta charset="UTF-8" />\n  <meta http-equiv="Content-Security-Policy" content="' + policy + '" />\n  <meta name="referrer" content="strict-origin-when-cross-origin" />');
  await writeFile(path.join(output, page), html);
}
await writeFile(path.join(output, '_headers'), '/*\n  Content-Security-Policy: ' + policy + "; frame-ancestors 'none'\n  X-Frame-Options: DENY\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()\n  Strict-Transport-Security: max-age=31536000\n");
console.log(sourceMode ? 'Updated public source security policies and URLs.' : 'Built dist. Inquiry form: ' + (process.env.CWP_FORMS_ENABLED === 'true' ? 'enabled for Netlify' : 'direct contact only') + '.');
