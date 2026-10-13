# Dorothé Blake – Professional Violinist Website

This is a personal website for Dorothé Blake, a classically trained violinist with over 40 years of experience, available for weddings, funerals, and special events across London and Europe.

## Features
- Elegant, responsive design optimized for mobile and desktop
- About, Journey, Gallery, Testimonials, and Contact sections
- Booking page with pricing and availability calendar
- Media gallery with images, videos, and audio samples
- Contact form with EmailJS integration
- Direct contact options (WhatsApp, phone, email)
- Social media integration
- Responsive layouts and keyboard-accessible navigation
- Structured data markup for search engines
- Comprehensive meta tags and Open Graph support

## SEO Optimizations
- **Meta Tags**: Comprehensive title, description, and keyword optimization
- **Structured Data**: JSON-LD markup for Person, Service, and Offer schemas
- **Open Graph**: Facebook and social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Sitemap**: XML sitemap for search engine indexing
- **Robots.txt**: Proper search engine crawling directives
- **Canonical URLs**: Prevent duplicate content issues
- **Performance**: Responsive WebP images, deferred media loading, caching and security headers
- **Mobile Optimization**: Responsive design with proper viewport settings

## Target Keywords
- Professional violinist
- Wedding violinist
- London violinist
- Event violinist
- Funeral violinist
- Corporate event violinist
- UK violinist
- Wedding music
- Live violin music

## Getting Started
1. Clone or download this repository
2. Serve the directory over HTTP with a static server that resolves clean URLs (for example, Netlify Dev); root-relative assets require HTTP
3. Edit content in the HTML files as needed
4. Deploy to your hosting provider (Netlify recommended)

## Folder Structure
- `index.html` – Homepage with comprehensive SEO
- `booking.html` – Booking and pricing page
- `privacy.html` – Privacy policy page
- `terms.html` – Terms of service page
- `404.html` – Custom 404 error page
- `css/style.css` – Main stylesheet
- `js/script.js` – Main JavaScript file
- `assets/` – Images, videos, and media files
- `robots.txt` – Search engine crawling directives
- `sitemap.xml` – XML sitemap for search engines
- `.htaccess` – Server configuration for SEO and performance

## Deployment
The live site is served by Netlify at violinplayer.pro. Netlify uses `_headers` and `_redirects`; `.htaccess` is legacy Apache configuration and is not applied by Netlify. The site includes:
- Proper redirects for www to non-www
- HTTPS enforcement
- GZIP compression
- Browser caching
- Security headers

## Contact
- **Email**: Dorothe@hotmail.co.uk
- **Phone**: +44 7768 815926
- **WhatsApp**: +44 7768 815926
- **Website**: https://violinplayer.pro

## License
This project is for personal use. Contact Dorothé Blake for commercial inquiries. 

## Review and validation

See [SEO_CHECKLIST.md](SEO_CHECKLIST.md) for verified checks and account-level follow-up. Run `python3 scripts/check-site.py` and `node --check js/script.js`. Image copies can be regenerated with `uv run --with pillow python scripts/optimise-images.py`; originals are retained.
