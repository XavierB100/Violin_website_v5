# SEO and mobile review — 13 October 2026

## In this PR

- Preserve the original public headline, biography, services, prices and testimonials.
- Shorten the homepage title to `London Wedding & Event Violinist | Dorothé Blake`; retain its existing description.
- Align canonical, Open Graph, breadcrumb, internal-link and sitemap URLs with the clean URLs already used by the live host. Explicit Netlify redirects consolidate `.html` variants.
- Describe the existing starting prices with `PriceSpecification.minPrice`, rather than implying a fixed final quote. Link the same person identity across artist and booking markup.
- Add missing booking social-image descriptions and UK locale metadata.
- Provide responsive WebP copies of the existing photographs. The large hero copy is 138,612 bytes versus 1,688,159 bytes for the original. Original files remain available.
- Defer audio/video downloads until playback, and lazy-load the calendar.
- Serve the existing Cormorant Garamond and Inter fonts locally, with early preload and swap rendering; retain their OFL licences. This removes the Google Fonts stylesheet request and two external font connections.
- Use accurate, descriptive gallery alt text without changing the visible biography or service copy.
- Restore the original gold styling; compact testimonials and remove the extra form/availability prose requested during review.
- Improve mobile navigation, portrait layout, uncropped gallery photographs, keyboard access, enquiry shortcuts and form feedback.
- Count `generate_lead` only after EmailJS acknowledges a successful enquiry. Remove the second booking page-view event. This event means provider acceptance, not inbox delivery or a confirmed booking.

## Verified before deployment

- Live HTTP and www variants redirect to HTTPS/non-www; unknown paths return 404.
- Live social-share image returns 200 with image/jpeg. Security and cache headers are present.
- Local homepage, booking, privacy, terms and 404 pages checked at 320, 390, 768, 820, 1060 and 1440 CSS pixels.
- Local link/fragment/image checks, JSON-LD parsing, canonical/sitemap consistency and JavaScript syntax checks.
- Menu open/close, Escape focus return and mobile-to-desktop resize unlock.
- Local form tests with an in-memory EmailJS stub: one request while pending, success reset/lead event, failure preservation/no extra lead, and unavailable-provider fallback. No real enquiries sent.

Run `python3 scripts/check-site.py`, `node --check js/script.js` and `node --check js/analytics.js` for the repository checks.

## Needs account access or post-release verification

- Search Console: submit `https://violinplayer.pro/sitemap.xml`, inspect the homepage and booking URL, and check indexing, search queries and actual mobile Core Web Vitals. Tags alone do not establish indexing or rankings.
- GA4: confirm consented traffic in Realtime and mark `generate_lead` as a key event if desired. Verify consent accept/reject behaviour on the production domain and a real enquiry in the inbox.
- Review the existing Google Business Profile, if there is one, for accurate service area and contact details. Do not publish a private home address or invent reviews, awards or venue affiliations.
- Use only genuine client reviews and performance material, with permission, for future updates.
- Test on a physical iPhone and Android device. Desktop CSS viewport checks do not reproduce every Safari date-input or browser-toolbar behaviour.
- CookieYes, Google Calendar, YouTube and EmailJS are external dependencies. Calendar/contact fallback links remain available when embeds are blocked.

## Sources

- [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Schema.org PriceSpecification](https://schema.org/PriceSpecification)
- [GA4 recommended events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead)

Metadata and usability improvements do not guarantee rankings or bookings. Measure actual enquiry quality and search traffic after release.
