# SEO Best Practices & Maintenance Guide for Awan

## Quick Reference

### Essential Commands
```bash
# Development
npm start                          # Dev server
npm run build                      # Production build
npm run serve:ssr:awan            # Test SSR locally

# Build & Deploy
ng build --configuration production # Production build with SSR
npm run build:css                  # Build Tailwind CSS
```

---

## Component SEO Template

When creating new components, use this template:

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-your-component',
  standalone: true,
  imports: [/* your imports */],
  templateUrl: './your-component.component.html',
  styleUrl: './your-component.component.scss'
})
export class YourComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setSeoConfig({
      title: 'Page Title',
      description: 'Meta description - max 155 characters',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      url: '/your-path',
      image: '/images/og-your-page.png',
      ogType: 'website',
      robots: 'index, follow',
      structuredData: this.getStructuredData()
    });
  }

  private getStructuredData(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Page Title',
      description: 'Page description'
    };
  }
}
```

---

## HTML Best Practices

### Page Structure
```html
<!-- Good: Semantic HTML -->
<main>
  <h1>Main Heading</h1>
  <section>
    <h2>Section Heading</h2>
    <article>Article content</article>
  </section>
</main>

<!-- Avoid: Non-semantic structure -->
<div class="main">
  <div class="h1">Main Heading</div>
  <div class="h2">Section Heading</div>
</div>
```

### Images for SEO
```html
<!-- Good: Descriptive alt text -->
<img 
  src="/images/awan-software-solution.png" 
  alt="Awan software solution interface showing dashboard" 
  width="1200" 
  height="630"
  loading="lazy"
>

<!-- Avoid: Missing or generic alt text -->
<img src="/images/image1.png" alt="image">
```

### Links
```html
<!-- Good: Descriptive anchor text -->
<a href="/products">Explore Our Software Products</a>

<!-- Avoid: Generic anchor text -->
<a href="/products">click here</a>
```

---

## Content Guidelines

### Titles (50-60 characters)
```
✓ Good:   "Innovative Software Solutions | Awan"
✗ Bad:    "Awan"
✗ Bad:    "The Best Software Solutions Company in the World"
```

### Meta Descriptions (155-160 characters)
```
✓ Good:   "Discover Awan's innovative software solutions designed to 
          drive digital transformation. Explore our products and services."

✗ Bad:    "Software company"

✗ Bad:    "We provide software solutions for businesses worldwide. 
          Our company was founded in 2020 and we have offices in 
          multiple countries and serve thousands of clients."
```

### H1 Tags
- Use only one H1 per page
- Include target keywords naturally
- Make it descriptive and user-focused

```html
<!-- Good -->
<h1>Enterprise Software Solutions for Digital Transformation</h1>

<!-- Avoid -->
<h1>Welcome to Awan</h1>

<!-- Avoid -->
<h1>software solutions software products technology company</h1>
```

### Keyword Integration
```
Target: "software solutions for businesses"

✓ Natural: "Awan provides innovative software solutions for businesses 
           of all sizes to drive digital transformation."

✗ Unnatural: "software solutions for businesses, software solutions for 
             businesses, software solutions for businesses..."
```

---

## Structured Data Examples

### Product Schema
```typescript
// In your product component
ngOnInit(): void {
  this.seoService.setSeoConfig({
    title: 'Product Name',
    description: 'Product description',
    structuredData: this.seoService.getProductSchema(
      'Product Name',
      'Detailed product description',
      '/images/product-image.png',
      '99.99',
      'USD'
    )
  });
}
```

### Local Business Schema
```typescript
getLocalBusinessSchema(): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Awan',
    image: 'https://awan.com/images/logo.png',
    description: 'Software solutions company',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Tech Street',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94102',
      addressCountry: 'US'
    },
    telephone: '+1-555-0123',
    url: 'https://awan.com'
  };
}
```

---

## Internal Linking Strategy

### Best Practices
```html
<!-- Link to related pages -->
<nav class="breadcrumb">
  <a href="/">Home</a>
  <span>/</span>
  <a href="/products">Products</a>
  <span>/</span>
  <span>Product Name</span>
</nav>

<!-- Link related products -->
<section class="related-products">
  <h2>Related Solutions</h2>
  <a href="/products/solution-a">Solution A</a>
  <a href="/products/solution-b">Solution B</a>
</section>
```

### Link Text Guidelines
```html
✓ "Learn about our cloud solutions"
✓ "Enterprise software for SMEs"

✗ "Click here"
✗ "Read more"
✗ "Link"
```

---

## Mobile SEO

### Viewport Configuration (Already in index.html)
```html
<meta name="viewport" 
      content="width=device-width, initial-scale=1, maximum-scale=5">
```

### Mobile-Friendly Checklist
- [ ] Responsive design works on all screen sizes
- [ ] Touch-friendly buttons and links (min 48px)
- [ ] Fast loading time on mobile networks
- [ ] No Flash or plugins
- [ ] Readable font sizes without zooming
- [ ] No intrusive interstitials

---

## Performance & Core Web Vitals

### Largest Contentful Paint (LCP)
- Target: < 2.5 seconds
- Solutions:
  - Optimize images
  - Lazy load components
  - Minimize JavaScript

### First Input Delay (FID) / Interaction to Next Paint (INP)
- Target: < 100ms
- Solutions:
  - Code splitting
  - Minimize main thread work
  - Use service workers

### Cumulative Layout Shift (CLS)
- Target: < 0.1
- Solutions:
  - Reserve space for dynamic content
  - Avoid sudden layout changes
  - Use stable animations

### Measurement Tools
```bash
# Run Lighthouse audit
# In Chrome DevTools > Lighthouse

# Or use CLI
npm install -g lighthouse
lighthouse https://awan.com --view
```

---

## Update Procedures

### Adding a New Page
1. Create component with SEO template
2. Add route to `src/app/app.routes.ts`
3. Update `prerender-routes.json` if important
4. Add to `public/sitemap.xml`
5. Implement SEO metadata in component

### Updating Existing Content
1. Update page component
2. Verify SEO metadata accuracy
3. Test page rendering in both browser and SSR
4. Update sitemap if URL structure changed
5. Submit to Search Console if URL changed

### SEO Audit Checklist
- [ ] Title tag (50-60 chars)
- [ ] Meta description (155-160 chars)
- [ ] H1 tag present and unique
- [ ] Alt text on all images
- [ ] Internal links pointing to related content
- [ ] JSON-LD structured data
- [ ] Mobile responsive
- [ ] Page loads in < 3 seconds
- [ ] No broken links
- [ ] Proper robots and canonical tags

---

## Monitoring & Maintenance

### Monthly Tasks
- [ ] Monitor Google Search Console for errors
- [ ] Check Core Web Vitals score
- [ ] Review Google Analytics traffic
- [ ] Check for broken links
- [ ] Verify all meta tags render correctly

### Quarterly Tasks
- [ ] Update sitemap with new pages
- [ ] Audit top landing pages
- [ ] Review and refresh old content
- [ ] Check competitor content
- [ ] Analyze keyword rankings

### Annual Tasks
- [ ] Conduct full SEO audit
- [ ] Update structured data schema
- [ ] Review and refresh all meta descriptions
- [ ] Evaluate new SEO best practices
- [ ] Plan content strategy for next year

### Tools to Use
- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics 4**: https://analytics.google.com
- **SEMrush**: https://www.semrush.com
- **Ahrefs**: https://ahrefs.com
- **Moz**: https://moz.com
- **Lighthouse**: Built-in Chrome DevTools

---

## Local SEO (If Applicable)

### Google My Business
1. Claim your business listing
2. Add accurate business info (address, phone)
3. Add photos and videos
4. Respond to reviews
5. Post regular updates

### Local Schema
```typescript
getLocalSchema(): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Awan',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Address',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: 'ZIP',
      addressCountry: 'US'
    },
    telephone: 'Your Phone',
    url: 'https://awan.com',
    areaServed: ['US', 'Canada']
  };
}
```

---

## Common SEO Mistakes to Avoid

### Content Issues
❌ Thin content (< 300 words)
❌ Duplicate content across pages
❌ Keyword stuffing
❌ Poor grammar and spelling
❌ Outdated information

### Technical Issues
❌ Missing meta descriptions
❌ No mobile optimization
❌ Slow page load times
❌ Broken internal links
❌ Missing XML sitemap

### Link Issues
❌ Too many outbound links
❌ Links to suspicious sites
❌ Over-optimized anchor text
❌ Broken external links

### Metadata Issues
❌ Identical titles/descriptions
❌ Clickbait titles
❌ Missing alt text on images
❌ No structured data

---

## JavaScript SEO Considerations

### Avoid Common Issues
```typescript
// Good: Set SEO data before rendering
export class MyComponent implements OnInit {
  ngOnInit(): void {
    this.seoService.setSeoConfig({
      title: 'My Page',
      description: 'Description'
    });
  }
}

// Avoid: Setting SEO data in setTimeout
export class BadComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.seoService.setSeoConfig(...); // ❌ Too late for SSR!
    }, 1000);
  }
}
```

### SSR Best Practices
```typescript
// Use OnInit, not constructor
// Use platform detection for browser-only code
// Preload critical data
// Avoid DOM manipulation in constructor

if (isPlatformBrowser(this.platformId)) {
  // Browser-only code
}
```

---

## Analytics Setup

### Google Analytics 4
```html
<!-- Add to index.html in head -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Key Metrics to Track
- Organic traffic
- Bounce rate
- Average session duration
- Conversion rate
- Top landing pages
- Top search queries (in Search Console)

---

## Domain & DNS Considerations

### DNS Records
```
A Record:        points to server IP
AAAA Record:     IPv6 address
CNAME Records:   www, mail, etc.
MX Records:      email routing
TXT Records:     SPF, DKIM, DMARC
```

### SSL Certificate
- Use HTTPS (required for SEO)
- Obtain from Let's Encrypt (free)
- Auto-renew every 90 days
- All mixed content must be HTTPS

---

## Robots.txt & Crawl Budget

### When to Update Robots.txt
- Block admin pages
- Block staging/test environments
- Block duplicate content
- Set crawl delay if needed

### Sitemap.xml Strategy
- Include high-priority pages
- Keep URLs under 2048 characters
- Use lastmod sparingly (if always accurate)
- Update when adding important new pages

---

## Troubleshooting Common Issues

### Pages Not Indexing
1. Check if robots.txt blocks the page
2. Verify no noindex meta tag
3. Check Google Search Console for crawl errors
4. Ensure internal links to the page
5. Resubmit sitemap to Search Console

### Ranking Issues
1. Check keyword relevance in title/description
2. Ensure sufficient content (300+ words)
3. Review page load speed
4. Check mobile responsiveness
5. Verify proper heading structure

### Traffic Drops
1. Check for indexing issues
2. Review for manual penalties
3. Verify HTTPS/redirects working
4. Check for duplicate content
5. Review rank tracking data

---

## Resources & Further Reading

- **Official Guides**
  - Google Search Central: https://developers.google.com/search
  - Google SEO Starter Guide: https://developers.google.com/search/docs
  - Bing Webmaster Tools: https://www.bing.com/webmasters

- **Learning Resources**
  - Moz SEO Guide: https://moz.com/beginners-guide-to-seo
  - HubSpot Academy: https://academy.hubspot.com
  - SEO by the Sea: https://www.seobythesea.com

- **Tools**
  - Google Search Console: https://search.google.com/search-console
  - Google PageSpeed Insights: https://pagespeed.web.dev
  - Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
  - Schema Markup Validator: https://schema.org/validator

---

## Next Steps

1. **Test Current Implementation**
   ```bash
   npm run build
   npm run serve:ssr:awan
   # Visit http://localhost:4000 and inspect HTML source
   # Verify meta tags and structured data are present
   ```

2. **Update Configuration**
   - Update domain and company info in `seo.service.ts`
   - Add actual images for OG tags
   - Update social media links

3. **Submit to Search Engines**
   - Google Search Console: https://search.google.com/search-console
   - Bing Webmaster Tools: https://www.bing.com/webmasters
   - Yandex Webmaster: https://webmaster.yandex.com

4. **Monitor Performance**
   - Set up Google Analytics
   - Monitor Core Web Vitals
   - Track keyword rankings

5. **Continuous Improvement**
   - Regular content updates
   - Monthly SEO audits
   - Competitor analysis

---

## Support

For issues or questions:
- Check the SEO_SSR_GUIDE.md
- Review the DEPLOYMENT_GUIDE.md
- Consult Angular SSR documentation
- Contact your development team

---

**Last Updated**: January 20, 2026
**Version**: 1.0
