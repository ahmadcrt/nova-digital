# NOVA DIGITAL

NOVA DIGITAL is a responsive, single-page website for a digital marketing agency. It presents the agency's services, portfolio, testimonials and contact options in a distinctive cobalt-and-gold visual identity, with a focus on clear hierarchy, accessibility and fast loading. It is built with plain HTML, CSS and JavaScript: no frameworks, no build step.

## Technologies
- **HTML5**: semantic structure, SEO metadata, accessible markup
- **CSS3**: custom properties, Grid and Flexbox, responsive layout, animations
- **JavaScript (vanilla)**: navigation, filters, form validation, scroll effects

## Developer
Designed & Developed by [Ahmad](https://github.com/ahmadcrt)

GitHub: [github.com/ahmadcrt](https://github.com/ahmadcrt)

## Features
- Sticky navigation with a working mobile menu and active-section highlighting
- Hero, About, Services, Portfolio, Why Choose Us, Testimonials, Contact and Footer
- Portfolio category filters and a project detail dialog
- Contact form with client-side validation (opens the visitor's email app on success)
- WhatsApp button with a configurable number
- Scroll reveal animations, back-to-top button, smooth scrolling
- SEO meta tags, semantic HTML, keyboard focus styles, reduced-motion support

## Files
| File | Purpose |
|---|---|
| `index.html` | Page structure and content |
| `style.css` | Design tokens, layout, components, responsive rules |
| `script.js` | Menu, filters, modal, validation, config |

## Customise
1. Open `script.js` and edit `CONFIG` (WhatsApp number in digits only with country code, and your email).
2. Replace the sample portfolio and testimonials in `index.html` with real ones. Testimonials are labelled as demonstration content; remove the notice only when they are genuine.
3. Update the social links in the Contact section and footer.
4. Portfolio art is built with CSS shapes. To use photos, put royalty-free images (for example from Unsplash or Pexels) in an `images/` folder, add `<img loading="lazy" width="600" height="400" alt="...">` inside each `.art` div, and compress them first.

## Run locally
Open `index.html` in a browser. Or serve it:
```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy to GitHub Pages
1. Create a repository and push these files to the `main` branch (`index.html` at the repo root).
2. On GitHub go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute your site is live at `https://<username>.github.io/<repository>/`.

## Notes
Fonts load from Google Fonts with system fallbacks. The form has no server; for stored submissions, connect a service such as Formspree.
