# Cleaning With Purpose

Public website for Danielle's senior-friendly home cleaning service. Current URL:
https://jbgainesiii-byte.github.io/cwpdetroit/

## Current release

- Three client-supplied reviews: Linda R., Ann B., and Lanae S. Existing review
  wording is preserved; Lanae's supplied text and Danielle's replacement bio are
  used as provided. No star rating was invented for the new review.
- Responsive services, pricing, founder story, FAQs, and direct contact options.
- Privacy notice, accessible field labels and navigation, and custom 404 page.
- Current canonical URLs, social images, robots.txt, and sitemap point to the
  working site, not an unconnected domain. Business email remains unchanged.

## Inquiries: current live behavior

GitHub Pages cannot process Netlify Forms. The public site therefore offers call,
text, and email links. The online form is hidden and its fieldset disabled in
source, including when JavaScript is unavailable. No visitor is invited to fill
out a form that cannot be received. Contact links open the visitor's phone or
email application; real-world phone answering and mailbox delivery are not tested.

The form remains in HTML for Netlify form detection. It is enabled only in a
Netlify build with `CWP_FORMS_ENABLED=true`. Its name is `home-reset-request`;
its relative POST action is `thanks.html`. Optional uploads use three separate
fields, each limited to 2 MB by JavaScript. Netlify's server limits and spam
filters remain the server-side controls. JavaScript validation is not a substitute
for those controls. No secrets, API keys, or visitor details belong in this repo.

## Security protections

- Live HTTPS and HTTP-to-HTTPS redirect were verified. GitHub Pages supplies HSTS.
- A Content Security Policy meta tag restricts scripts, styles, fonts, images,
  connections, and form destinations. Inline event handlers, inline styles,
  `unsafe-inline`, and `unsafe-eval` are not used. Structured data has a content hash.
- The site does not add analytics, advertising trackers, or browser storage.
  Google Fonts requests and hosting-provider processing are described in privacy.html.
- Netlify builds additionally emit CSP frame-ancestors, X-Frame-Options, nosniff,
  Permissions-Policy, Referrer-Policy, and HSTS response headers in `dist/_headers`.
  GitHub Pages does not apply that file: do not report those additional headers
  as active on GitHub Pages. In particular, meta CSP cannot enforce frame-ancestors.
- No package dependencies, server application, login, payment entry, or database
  are part of this repository. No blanket security certification is implied.

## Updating and building

GitHub Pages serves the source directly; `.nojekyll` preserves static behavior.
After changing the JSON-LD, run `node scripts/build.mjs --source` to regenerate
source CSP hashes and the header template before committing.

Netlify uses `node scripts/build.mjs` and publishes `dist`. The script copies only
public site directories and pages; it does not publish this README, tooling, or
Git metadata. The output directory is ignored by Git. Never edit dist as source.

The build uses `SITE_URL` when explicitly set; otherwise it uses Netlify's site
URL, or the deploy-preview URL for a preview. URLs must be HTTPS. It adapts
canonical URLs, social images, sitemap, robots, the 404 links, and CSP hashes.
The business email is intentionally independent of the chosen website domain.

## Remaining launch setup

1. Buy/connect the selected domain and configure the primary domain in Netlify.
   Use the chosen HTTPS URL as SITE_URL if needed. Confirm TLS and www redirects.
2. Confirm that the existing business email and phone reach Danielle. No test
   messages have been sent by the website checks.
3. For online inquiries, enable Netlify form detection and configure notifications
   to the client's verified inbox. Enable CWP_FORMS_ENABLED on a preview, deploy,
   and verify a labeled test plus an optional photo in Forms and the inbox.
   Enable it in production only after successful delivery. Leave the direct
   contact version active until then.
4. The privacy notice describes the implemented website. Danielle should confirm
   it matches how she handles inquiries and any later service records. Update it
   if the business adds analytics, payments, or other processors.

No Netlify account or domain settings were available in the connected tools, so
those settings and actual submission delivery are not claimed as verified.

## Checks

Source checks cover HTML anchors/assets/labels, review attribution, the supplied
bio and new review, CSP hashes and blocked inline code, hidden/disabled inactive
forms, FAQ structured data, and production/preview build behavior. Simulated
interaction checks cover navigation and the enabled form's validation, success,
failure, and duplicate-submit paths. Live checks cover HTTPS, redirect behavior,
deployed page contents, linked resources, privacy, and the actual 404 response.

Provider documentation:
- https://docs.netlify.com/manage/forms/setup/
- https://docs.netlify.com/manage/forms/notifications/
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors
