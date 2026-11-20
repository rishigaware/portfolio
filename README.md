# Rishi Gaware – Developer Portfolio

React + Vite + Tailwind CSS v4 + Motion + Lenis + Three.js. SEO is set up for the name **Rishi Gaware**.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build
```bash
npm run build          # production build in dist/
npm run build:single   # one self-contained HTML file in dist-preview/
```

## Edit your content
- Everything (name, email, links, projects, jobs, skills, FAQ…) is in `src/data/projects.js`. **All of it is placeholder text.**
- The `site` object at the top controls your name, role, email, GitHub, LinkedIn and resume link.
- Reorder or remove sections in `src/App.jsx`.
- The contact form is not connected to a backend yet (see the TODO in `src/components/Contact.jsx`). Formspree or EmailJS are quick options.

## Private mode (currently ON)
The site is set to stay out of search engines: `index.html` has `<meta name="robots" content="noindex, nofollow, noarchive" />`.
When you are ready to launch, change it back to `content="index, follow, max-image-preview:large"`.
Leave `public/robots.txt` as `Allow: /` — crawlers must be able to read the page to see the noindex tag.

## SEO checklist (do these before launch)
0. **Turn off private mode** (see above), otherwise nothing below will work.
1. **Replace the domain.** Every `YOUR-DOMAIN.com` must become your real domain, for example `https://www.yourname.com`:
   ```bash
   grep -rn "YOUR-DOMAIN.com" index.html public
   # macOS/Linux replace:
   sed -i 's#https://YOUR-DOMAIN.com#https://www.yourname.com#g' index.html public/robots.txt public/sitemap.xml
   ```
2. **Add your social profiles** to the Person schema in `index.html` (`"sameAs": ["https://github.com/…", "https://linkedin.com/in/…"]`).
3. **Edit** the `<title>` and meta description in `index.html` so they describe you accurately.
4. **Register the site** in Google Search Console and Bing Webmaster Tools, then submit `/sitemap.xml`.
5. **Link to the site** from your GitHub, LinkedIn, resume and social profiles. Backlinks matter more than any tag.
6. Replace the sample projects, articles and testimonials with real content, and add alt text to any images you add.
7. Check the share preview (LinkedIn Post Inspector, or opengraph.xyz) after deploying. The share image is `public/og-image.png` (1200×630).
8. Run Lighthouse in Chrome DevTools and aim for 90+ on Performance, Accessibility, Best Practices and SEO.

## What is included for SEO
- Title, meta description, canonical, robots, theme-color
- Open Graph and Twitter card tags with a share image
- JSON-LD structured data (Person + WebSite)
- One `<h1>` containing the name and role, and a logical heading structure
- `robots.txt`, `sitemap.xml`, web manifest, SVG favicon
- `<noscript>` fallback text, semantic landmarks, alt text and ARIA labels
- The 3D scene loads after first paint to keep the page fast

> Note: this is a client-rendered React app. Google handles that well, but other search engines may see less. If search traffic is a priority, consider moving to Astro or Next.js later.

## Deploy
Connect the repo to Vercel or Netlify with build command `npm run build` and output folder `dist`.
