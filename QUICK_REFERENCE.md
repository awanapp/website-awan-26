# Quick Reference - Awan Website SSR & SEO

## 🚀 Quick Start

### Build & Run
```bash
# Install dependencies
npm install

# Development (client-side only)
npm start                     # http://localhost:4200

# Production build (SSR + prerendering)
ng build --configuration production

# Test SSR locally
npm run serve:ssr:awan       # http://localhost:4000
```

---

## 📋 File Locations

| Purpose | File Path |
|---------|-----------|
| SEO Service | `src/app/core/services/seo.service.ts` |
| App Config | `src/app/app.config.ts` |
| Server Config | `src/app/app.config.server.ts` |
| HTML Meta Tags | `src/index.html` |
| Routes | `src/app/app.routes.ts` |
| Robots.txt | `public/robots.txt` |
| Sitemap.xml | `public/sitemap.xml` |
| Manifest.json | `public/manifest.json` |
| Prerender Routes | `prerender-routes.json` |
| Home Component | `src/app/features/home/home.component.ts` |
| Products Component | `src/app/features/products/products.component.ts` |

---

## 🎯 New Component Template

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-your-page',
  standalone: true,
  imports: [],
  templateUrl: './your-page.component.html',
  styleUrl: './your-page.component.scss'
})
export class YourPageComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setSeoConfig({
      title: 'Your Page Title',
      description: 'Page description (max 155 chars)',
      keywords: ['keyword1', 'keyword2'],
      url: '/your-page',
      image: '/images/og-your-page.png',
      structuredData: this.seoService.getOrganizationSchema()
    });
  }
}
```

---

## 🔧 SeoService Methods

```typescript
// Set comprehensive SEO configuration
setSeoConfig(config: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  keywords?: string[];
  canonical?: string;
  ogType?: string;
  ogLocale?: string;
  author?: string;
  robots?: string;
  structuredData?: any;
})

// Set title only
setSeoTitle(title: string)

// Get organization schema
getOrganizationSchema()

// Get product schema
getProductSchema(name, description, image, price, currency)

// Get breadcrumb schema
getBreadcrumbSchema(breadcrumbs: Array<{name, url}>)

// Get FAQ schema
getFAQSchema(faqs: Array<{question, answer}>)

// Reset to default tags
resetSeoTags()
```

---

## 📝 Configuration Values

### Update in `seo.service.ts`

```typescript
private baseUrl = 'https://awan.com';        // ← Your domain
private companyName = 'Awan';                // ← Your company
private companyDescription = 'Leading...';  // ← Your description

// In getOrganizationSchema():
logo: `${this.baseUrl}/images/logo.png`      // ← Logo path
sameAs: [                                    // ← Social links
  'https://www.facebook.com/your-page',
  'https://twitter.com/your-handle',
  'https://www.linkedin.com/company/...'
]
address: { /* Your address */ }              // ← Your location
telephone: '+1-xxx-xxx-xxxx'                // ← Your phone
email: 'info@awan.com'                      // ← Your email
```

---

## 📊 SEO Checklist

### Before Building
- [ ] Update company info in `seo.service.ts`
- [ ] Create OG images (1200x630px)
- [ ] Update social media links

### Before Deploying
- [ ] Run production build: `ng build --configuration production`
- [ ] Test SSR: `npm run serve:ssr:awan`
- [ ] Verify all pages render
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit

### After Deployment
- [ ] Add to Google Search Console
- [ ] Submit sitemap
- [ ] Set up Google Analytics
- [ ] Monitor indexing status

---

## 🔍 Testing Commands

```bash
# Build for production
ng build --configuration production

# Test SSR server
npm run serve:ssr:awan

# View page source in production
curl -I http://localhost:4000/

# Test mobile
curl -A "Googlebot" http://localhost:4000/

# Check bundle size
ng build --configuration production --stats-json
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/awan/browser/stats.json
```

---

## 🌐 Search Console Integration

1. Go to https://search.google.com/search-console
2. Add property: your domain
3. Upload sitemap: `/public/sitemap.xml`
4. Monitor:
   - Coverage (indexed pages)
   - Enhancements (structured data)
   - Performance (rankings)

---

## ⚡ Performance Tips

```typescript
// ✓ Do this
import { Component, OnInit } from '@angular/core';

export class MyComponent implements OnInit {
  ngOnInit(): void {
    this.seoService.setSeoConfig({...});
  }
}

// ✗ Avoid this
export class BadComponent {
  constructor(private seoService: SeoService) {
    this.seoService.setSeoConfig({...}); // Too early!
  }
}

// ✗ Avoid this
ngOnInit(): void {
  setTimeout(() => {
    this.seoService.setSeoConfig({...}); // Too late for SSR!
  }, 1000);
}
```

---

## 🗺️ Update Routes

### 1. Add to `src/app/app.routes.ts`
```typescript
{
  path: 'my-page',
  loadComponent: () => import('./features/my-page/my-page.component')
    .then(m => m.MyPageComponent)
}
```

### 2. Add to `prerender-routes.json`
```json
{
  "routes": [
    "/",
    "/home",
    "/products",
    "/my-page"
  ]
}
```

### 3. Update `public/sitemap.xml`
```xml
<url>
  <loc>https://awan.com/my-page</loc>
  <lastmod>2026-01-20</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## 📱 Meta Tag Sizes

| Tag | Ideal Size | Max Size |
|-----|-----------|----------|
| Title | 50-60 chars | 70 chars |
| Meta Description | 155-160 chars | 160 chars |
| H1 | 20-70 chars | - |
| Keywords | 3-5 keywords | - |
| OG Image | 1200x630px | 5MB |

---

## 🎨 Image Optimization

```html
<!-- Good -->
<img 
  src="/images/product.webp"
  alt="Product name description" 
  width="1200" 
  height="630"
  loading="lazy"
  srcset="
    /images/product-sm.webp 600w,
    /images/product-md.webp 900w,
    /images/product-lg.webp 1200w"
>

<!-- Avoid -->
<img src="image.jpg" alt="image">
```

---

## 🔗 Internal Linking

```html
<!-- Good links point to relevant pages -->
<a href="/products">Explore Our Software Solutions</a>
<a href="/about">Learn About Awan</a>
<a href="/products/solution-x">Solution X Details</a>

<!-- Avoid generic text -->
<a href="/products">click here</a>
<a href="/products">link</a>
```

---

## 📈 Monitoring

### Tools
- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com
- **Google PageSpeed Insights**: https://pagespeed.web.dev
- **Lighthouse**: Chrome DevTools
- **Mobile Test**: https://search.google.com/test/mobile-friendly

### Metrics to Track
- Organic traffic
- Click-through rate (CTR)
- Average position in search results
- Core Web Vitals score
- Bounce rate
- Time on page

---

## 🚨 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Meta tags not updating | Ensure `setSeoConfig()` in `ngOnInit()` |
| Pages not indexing | Check robots.txt, verify sitemap, check Search Console |
| Slow page load | Run Lighthouse, optimize images, code split |
| Mobile issues | Check viewport meta tag, test responsive design |
| Ranking issues | Improve content, add internal links, enhance structure |
| Duplicate content | Use canonical tags, set preferred domain |

---

## 💾 Backup & Version Control

```bash
# Commit all changes
git add .
git commit -m "Implement highest level SSR and SEO"

# Tag release
git tag -a v1.0-seo -m "SEO and SSR implementation complete"

# Backup build
tar -czf awan-backup-$(date +%Y%m%d).tar.gz dist/
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `SEO_SSR_GUIDE.md` | Detailed implementation guide |
| `DEPLOYMENT_GUIDE.md` | Production deployment steps |
| `SEO_MAINTENANCE_GUIDE.md` | Best practices & maintenance |
| `IMPLEMENTATION_SUMMARY.md` | Overview of changes |
| `QUICK_REFERENCE.md` | This document |

---

## 🎯 30-Day Plan

### Week 1: Prepare
- [ ] Review all documentation
- [ ] Update company information
- [ ] Create OG images
- [ ] Set up monitoring accounts

### Week 2: Test
- [ ] Build application
- [ ] Test all components
- [ ] Run SEO audit
- [ ] Mobile testing
- [ ] Performance testing

### Week 3: Deploy
- [ ] Set up production server
- [ ] Deploy application
- [ ] Monitor for errors
- [ ] Verify all pages render

### Week 4: Monitor
- [ ] Add to Search Console
- [ ] Submit sitemap
- [ ] Set up Analytics
- [ ] Monitor rankings
- [ ] Check indexing

---

## ✨ You've Completed

✓ Full Server-Side Rendering (SSR)
✓ Static Prerendering
✓ Comprehensive Meta Tags
✓ Structured Data (JSON-LD)
✓ Sitemap & Robots.txt
✓ PWA Support
✓ Mobile Optimization
✓ Performance Tuning
✓ Production Ready

---

## 🚀 Next Action

1. **Update company info** in `src/app/core/services/seo.service.ts`
2. **Create OG images** (1200x630px)
3. **Run production build**: `ng build --configuration production`
4. **Deploy to production**
5. **Monitor results** in Google Search Console

---

**Ready to launch? You've got all the tools you need! 🎉**

For detailed guidance, see:
- `DEPLOYMENT_GUIDE.md` - How to deploy
- `SEO_MAINTENANCE_GUIDE.md` - Best practices
- `SEO_SSR_GUIDE.md` - Technical details

---

**Last Updated**: January 20, 2026
