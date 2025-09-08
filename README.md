## William James — Portfolio

Personal portfolio built with Next.js and TailwindCSS. It's responsive, accessible, SEO-friendly, and deploys easily to Vercel or GitHub Pages.

**Live site:** [https://willumpirl.github.io/portfolio_website](https://willumpirl.github.io/portfolio_website)

### Tech stack
- **Next.js 15.4.6** (Pages Router)
- **React 19.1.0** with modern hooks
- **TailwindCSS v4** with custom theme tokens
- **Framer Motion** animations
- **ESLint 9** + **Prettier**
- **MDX-ready** (pageExtensions configured)

### Features
- Responsive layout with Navbar, Footer, and main content area
- Sections: Space Hero, About, Skills, Portfolio (filterable), Contact (Formspree-ready)
- Smooth scrolling with navbar offset
- Dark mode toggle (persists preference)
- Interactive 3D elements (Torus Belt, Sun Dynamic)
- Space-themed visual effects and animations
- SEO: global metadata, robots.txt, sitemap.xml, OG image
- Accessibility: semantic HTML, skip link, keyboard-friendly controls

## Getting started
Prerequisites: Node 18+ and npm.

1) Install dependencies
```bash
npm install
```

2) Run the dev server
```bash
npm run dev
```
Visit http://localhost:3000

## Scripts
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
npm run format   # Prettier write
npm run export   # Build and export for GitHub Pages
npm run publish  # Export and push to GitHub Pages
```

## Environment variables
Create an `.env.local` file (or set in Vercel Project Settings):
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```
Used for canonical URLs, OG image, robots/sitemap.

## Project structure
```
components/
  About.jsx
  Contact.jsx
  Footer.jsx
  Layout.jsx
  Navbar.jsx
  Portfolio.jsx
  ProjectCard.jsx
  Skills.jsx
  SpaceHero.jsx
  SunDynamic.jsx
  SunlightOverlay.jsx
  ThemeToggle.jsx
  TorusBelt3D.jsx
  ui/
pages/
  _app.js
  _document.js
  index.js
  sitemap.xml.js
public/
  images/
    og-image.png
    profile.jpg
    project-1.jpg
    project-2.jpg
styles/
  globals.css
```

## Customization
- Branding/colors: `styles/globals.css` (CSS variables + Tailwind theme tokens)
- Sections content: `components/*.jsx` and `pages/index.js`
- Portfolio items: `components/Portfolio.jsx`
- Contact form: update the `action` in `components/Contact.jsx` with your Formspree/Form backend
- OG image: replace `public/images/og-image.png`
- 3D elements: customize `TorusBelt3D.jsx` and `SunDynamic.jsx` for different visual effects

## Deployment
### GitHub Pages
The site is deployed at: [https://willumpirl.github.io/portfolio_website](https://willumpirl.github.io/portfolio_website)

```bash
npm run publish
```
This will build, export, and push the static site to the `docs` branch.

### Vercel
- Import the GitHub repo in Vercel
- Set `NEXT_PUBLIC_SITE_URL` (e.g., `https://your-domain.com`)
- Deploy (preview and production)

Alternatively with CLI:
```bash
npm i -g vercel
vercel login
vercel && vercel --prod
```

## Accessibility & SEO
- Skip-to-content link, semantic landmarks, keyboard focus states
- Metadata and social cards in `pages/_app.js`
- `public/robots.txt` and `pages/sitemap.xml.js`

## Roadmap
- [x] Phase 1: Foundation
- [x] Phase 2: Core Layout
- [x] Phase 3: Content Sections
- [x] Phase 4: Interactivity & Optimization
- [x] Phase 5: Polish & Enhancements
- [x] Phase 6: 3D Elements & Space Theme
- [ ] Optional: Performance optimizations
- [ ] Optional: Additional interactive elements

