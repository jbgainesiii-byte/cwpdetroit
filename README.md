# Cleaning With Purpose

Customer-facing website for Danielle's senior-friendly home cleaning service.
This is the public-site repository, separate from `cwp-strategy-microsite` and
`cleaning-with-purpose-strategy`.

## Site

- Static HTML, CSS, and JavaScript. No build step or framework dependencies.
- `index.html`: services, pricing, the Purpose Note, Danielle's story, client reviews,
  frequently asked questions, and the free walkthrough request.
- `thanks.html`: confirmation after a successful form submission.
- `css/styles.css`: responsive Harbor navy, cream, and brass design.
- `js/main.js`: accessible mobile navigation, room/FAQ accordions, package selection,
  photo validation, and request submission with honest failure states.
- `assets/`: existing logo, founder portrait, and two lifestyle images.

## September 2026 refresh

- A brighter photo-led opening, clearer service description, and visible starting price.
- The first Home Reset is separate from the three ongoing plans.
- Each package links into the same request and selects its service in the form.
- The full Purpose Note is distinguished from Comfort Clean's visit completion note.
- The example note is explicitly illustrative. The two actual client reviews from
  commit `84cbd5a` are retained unchanged.
- Updates and photos require agreement with the resident or appropriate representative.
- Larger text, less crowded navigation, visible focus states, reduced-motion support,
  and mobile controls that account for the phone's safe area.
- The form needs only name, relationship, phone, and home city/ZIP. Other fields are optional.
- Three separately named photo fields replace an unsupported multiple-file field.
  Each is limited to 2,000,000 bytes in JavaScript, keeping total uploads below
  Netlify's 8 MB request limit. No browser storage holds visitor details.
- Request failures retain the entered details and provide a phone alternative.
  A success message is shown only after a successful HTTP response.
- Visible FAQ answers and JSON-LD match. Unverified pinpoint coordinates and the
  unverified fixed service radius were removed. Existing social images are retained.

## Contact and service facts retained from the existing site

- Cleaning With Purpose; Danielle, founder; established 2024.
- Phone: 313-451-2221.
- Email: info@cleaningwithpurpose.org.
- Hours: Monday–Friday, 8am–4pm.
- Metro Detroit: Detroit, Dearborn, Royal Oak, Ferndale, Southfield, Troy, Warren,
  Grosse Pointe, Livonia, and surrounding communities; availability confirmed by request.
- Purpose Home Reset: $225–$375; Comfort Clean: from $149/visit;
  Peace-of-Mind Visit: from $199/visit; Purpose Plus: from $289/visit.
- No insured/bonded claims have been added. Coverage must be confirmed before advertising it.
- Danielle's portrait and the two real reviews come from the existing repository.
  Lifestyle images are illustrative assets carried over from the original design.

## Hosting and requests

Deploy the repository root to Netlify using the existing `netlify.toml`.
The form name is **home-reset-request**, with POST action `/thanks.html` and
`multipart/form-data` encoding. Enable Netlify form detection before deploying.
Set form notifications to the client's approved recipient, currently documented as
`info@cleaningwithpurpose.org`.

The form uses Netlify Forms, not a separate database. GitHub Pages can display the
website but cannot process these requests. A domain purchase does not activate form
processing or email notifications.

Native form submission works without JavaScript on Netlify. JavaScript adds file-size
checks, phone validation, duplicate-click prevention, error feedback, and a 25-second
confirmation timeout. The timeout message asks visitors to check by phone before
retrying because the server may already have received their request.

Netlify documentation: https://docs.netlify.com/manage/forms/setup/

## Before public launch

1. Connect the selected domain. The inherited canonical domain remains
   `https://cleaningwithpurpose.org/` pending the final domain choice.
   If it changes, update canonical/OG URLs, JSON-LD identifiers and asset URLs,
   `sitemap.xml`, `robots.txt`, `llms.txt`, and the `www` redirect in `netlify.toml`.
   Preserve the email address unless the client explicitly changes it.
2. Confirm the retained pricing, service area, background-check statement, and
   written service/access/photo policies with Danielle.
3. In Netlify, confirm form detection and the notification recipient. Submit a
   clearly labeled test, confirm it appears in Forms, and confirm the notification
   arrives. Include a photo test before accepting customer uploads.
4. Check the final domain and mobile experience after deployment. This refresh was
   checked at source level; live inbox delivery and browser QA require the deployed site.

## Validation

Source checks cover local assets and anchors, unique IDs, field labels and ARIA
references, matching FAQ structured data, package selection values, and unchanged
client review text. JavaScript checks exercise menu focus, phone/photo validation,
success and failure responses, and duplicate-submit prevention with a simulated
browser API. These checks do not send live requests or verify inbox delivery.
