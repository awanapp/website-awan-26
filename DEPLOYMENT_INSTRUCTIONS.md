# Deployment Instructions for internserver.net

## Build Summary
✅ Production build completed successfully
- Output location: `C:\Users\Islam\source\repos\awan\dist\awan`
- Build includes SSR (Server-Side Rendering) support
- All assets optimized and minified

## What to Deploy

The `dist/awan` folder contains:

### 1. **Browser Files** (`dist/awan/browser/`)
- Static HTML, CSS, JavaScript files
- Images, fonts, and other assets
- Manifest and robots.txt for SEO

### 2. **Server Files** (`dist/awan/server/`)
- Node.js/Express server code for SSR
- Requires Node.js runtime on the server

## Deployment Options

### Option A: Full SSR Deployment (Recommended)
**Best for**: SEO and dynamic content rendering

**Requirements on internserver.net:**
- Node.js installed (v18+ recommended)
- npm or yarn
- Port access (typically 4200 or 3000)

**Steps:**
1. Upload the entire `dist/awan` folder to your server
2. Upload `package.json` and `package-lock.json`
3. Run: `npm install`
4. Start the SSR server: `npm run serve:ssr:awan`

---

### Option B: Static Deployment (Simpler)
**Best for**: Shared hosting without Node.js support

**Files needed:**
- Only the `dist/awan/browser/` folder

**Steps:**
1. Upload `browser/` folder contents to your public_html or www directory
2. Configure the web server to serve `index.csr.html` as the default page
3. Set up URL rewriting for Angular routing

**Web Server Configuration:**

**For Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**For Nginx:**
```nginx
server {
  location / {
    try_files $uri $uri/ /index.csr.html;
  }
}
```

---

## File Structure to Upload

### For SSR (Full):
```
dist/awan/
├── browser/          → Static files
├── server/           → Node.js server code
├── 3rdpartylicenses.txt
package.json
package-lock.json
server.ts (if using SSR)
```

### For Static (Browser only):
```
public_html/
├── index.csr.html
├── main-*.js
├── styles-*.css
├── chunk-*.js
├── fonts/
├── i18n/
├── images/
├── manifest.json
├── robots.txt
├── sitemap.xml
```

---

## Important Files

- **index.csr.html**: Client-side rendering fallback
- **robots.txt**: Already configured for SEO
- **sitemap.xml**: For search engine indexing
- **i18n/**: Internationalization (English & Arabic)
- **manifest.json**: Progressive Web App manifest

---

## Environment Setup (If using SSR)

Make sure the server environment has:
- Node.js v18+
- npm or yarn
- Port 4200 or 3000 available (or configure port in server.ts)

---

## Post-Deployment

1. **Test the site**: Visit your domain
2. **Check SEO**: 
   - Verify robots.txt is accessible
   - Check sitemap.xml availability
   - Test meta tags in browser devtools
3. **Monitor SSL/HTTPS**: Ensure HTTPS is properly configured
4. **Check redirects**: All routes should work correctly

---

## Support

For deployment issues, check:
- Server logs for errors
- Console for JavaScript errors (F12)
- Network tab for failed requests

---

**Generated**: January 24, 2026
**Project**: Awan - Innovative Software Solutions
