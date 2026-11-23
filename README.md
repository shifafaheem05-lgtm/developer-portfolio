# Shifa Faheem — Portfolio

Personal portfolio for **Shifa Faheem**, Python · AI & ML · AI Automation developer (Karachi, Pakistan).
Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Files

```
index.html            page content, SEO tags, structured data
style.css             design tokens (top of file) + all styles
script.js             menu, scroll reveal, project filters, copy email, contact form
robots.txt            lets search engines index the site
assets/
  favicon.svg         browser tab icon
  og-image.jpg        1200×630 preview image for LinkedIn / social sharing
  orb.svg             original decorative orb (kept from the earlier version)
  Shifa-Faheem-CV.pdf the resume, offered by the "Download CV" buttons
  projects/*.webp     real screenshots of each project (optimised, ~20–60 KB each)
```

## Run locally

Double-click `index.html`, or serve the folder (recommended):

```bash
cd shifa-portfolio
python -m http.server 8000
# open http://localhost:8000
```

## Deploy (free)

**GitHub Pages** — create a repo (e.g. `shifafaheem05-lgtm.github.io`), upload the contents of this folder
to the root, then Settings → Pages → Deploy from a branch → `main` / root.

**Netlify / Vercel** — drag and drop the folder at app.netlify.com/drop, or import the repo in Vercel
(framework: “Other”, no build command, output directory: `.`).

## After you publish (2 minutes)

1. In `index.html`, find `OG_BASE_URL`, replace it with your live address (e.g. `https://shifafaheem05-lgtm.github.io`)
   and remove the `<!-- -->` around the `og:url` and `og:image` lines. This makes the preview image appear on LinkedIn.
2. Optionally add `<link rel="canonical" href="https://your-address/">` in the `<head>`.
3. Test the share preview with LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## Editing content

- **Projects** — each project is one `<article class="project">` in `index.html`. `data-category` controls the
  filter buttons (`ai`, `web`, `data`). Put new screenshots in `assets/projects/` (WebP, ~1200 px wide).
- **AI Chatbot** — the card is a placeholder. Add the GitHub link, tech stack and verified features when ready.
- **Colours / fonts** — change the variables at the top of `style.css`.
- **Contact form** — opens the visitor's email app pre-filled to `shifafaheem20@gmail.com` (no server needed).
  To receive messages without the email app, swap the form `action` for a service like Formspree.
- **Resume / CV** — the "Download CV" buttons in the hero and the contact panel point at
  `assets/Shifa-Faheem-CV.pdf`. Replace that file with a newer PDF (same name) and the buttons keep working.
  If the file is missing, `script.js` hides both buttons automatically, so no visitor ever sees a dead link.
  To rename it, update the `href` on `#cvLink` (hero) and `#cvLinkContact` (contact panel) and the
  `fetch('assets/Shifa-Faheem-CV.pdf')` check in `script.js`.

## Accessibility & performance notes

Skip-to-content link, keyboard-visible focus, labelled form fields, live form status, `prefers-reduced-motion`
support, minimum 12 px text, lazy-loaded WebP images with fixed dimensions (no layout shift).
