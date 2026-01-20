# Build and Deployment Guide for Awan Website

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

## Installation

```bash
# Install dependencies
npm install

# Verify installation
npm --version
node --version
```

---

## Development

### Local Development Server
```bash
# Start development server without SSR
npm start
# Access at http://localhost:4200

# Or with SSR (if needed)
npm run serve:ssr:awan
# Access at http://localhost:4000
```

### Build Variants

#### Development Build
```bash
# Quick build for development
ng build
# Output: dist/awan/
```

#### Production Build (with SSR and Prerendering)
```bash
# Build for production with full SSR and prerendering
ng build --configuration production

# This generates:
# - dist/awan/browser/     (Client-side bundle)
# - dist/awan/server/      (Server-side bundle)
# - Prerendered static pages for all routes in prerender-routes.json
```

#### Production Build (SSR Only, without Prerendering)
```bash
# If you prefer dynamic rendering only
ng build --configuration production --no-prerender
```

---

## Build Output Structure

```
dist/awan/
├── browser/                    # Client-side Angular app
│   ├── main.*.js
│   ├── polyfills.*.js
│   ├── styles.*.css
│   ├── 3rdparty.*.js
│   └── index.html
├── server/                     # Server-side rendering bundle
│   └── server.mjs
└── prerendered/               # Prerendered static pages (if enabled)
    ├── index.html
    ├── home/
    │   └── index.html
    └── products/
        └── index.html
```

---

## Deployment Options

### Option 1: Node.js Server Deployment (Recommended for Dynamic SSR)

#### Environment Setup
```bash
# Install production dependencies only
npm install --production

# Create .env file (if needed)
cat > .env << EOF
PORT=4000
NODE_ENV=production
BASE_URL=https://awan.com
EOF
```

#### Deployment Steps
```bash
# 1. Build the application
npm run build

# 2. Copy necessary files to server
scp -r dist/awan user@server:/var/www/awan/
scp server.ts user@server:/var/www/awan/
scp package.json user@server:/var/www/awan/
scp package-lock.json user@server:/var/www/awan/

# 3. SSH into server and install dependencies
ssh user@server
cd /var/www/awan
npm install --production

# 4. Start the server
npm run serve:ssr:awan

# Or use a process manager (PM2)
npm install -g pm2
pm2 start "npm run serve:ssr:awan" --name awan
```

#### With PM2 Process Manager
```bash
# Create PM2 configuration file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'awan',
    script: './node_modules/.bin/npm',
    args: 'run serve:ssr:awan',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      PORT: 4000,
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Option 2: Static Hosting (With Prerendering)

If using prerendering, you can deploy to static hosts:

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir dist/awan/browser
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy with SSR
vercel --prod
```

#### AWS S3 + CloudFront (Static Only)
```bash
# Build application
ng build --configuration production

# Upload to S3
aws s3 sync dist/awan/browser s3://awan-bucket

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Option 3: Docker Deployment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY server.ts .

EXPOSE 4000
ENV NODE_ENV=production
ENV PORT=4000

CMD ["npm", "run", "serve:ssr:awan"]
```

#### Build and Run Docker Image
```bash
# Build image
docker build -t awan:latest .

# Run container
docker run -d \
  -p 4000:4000 \
  -e NODE_ENV=production \
  --name awan-container \
  awan:latest

# Push to Docker Hub
docker tag awan:latest your-registry/awan:latest
docker push your-registry/awan:latest
```

---

## Nginx Configuration

```nginx
upstream awan_app {
  server localhost:4000;
  keepalive 64;
}

server {
  listen 80;
  server_name awan.com www.awan.com;
  
  # Redirect HTTP to HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name awan.com www.awan.com;

  # SSL Certificates (Let's Encrypt)
  ssl_certificate /etc/letsencrypt/live/awan.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/awan.com/privkey.pem;

  # Security headers
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-XSS-Protection "1; mode=block" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;

  # Gzip compression
  gzip on;
  gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
  gzip_min_length 1000;

  # Cache static assets
  location ~* ^/.*\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    proxy_pass http://awan_app;
    proxy_cache_valid 200 1y;
    proxy_cache_bypass $http_pragma $http_authorization;
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Proxy to Node.js app
  location / {
    proxy_pass http://awan_app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }

  # SEO optimizations
  location = /robots.txt {
    proxy_pass http://awan_app;
    proxy_cache_valid 200 7d;
  }

  location = /sitemap.xml {
    proxy_pass http://awan_app;
    proxy_cache_valid 200 7d;
  }
}
```

---

## Apache Configuration

```apache
<VirtualHost *:443>
  ServerName awan.com
  ServerAlias www.awan.com

  SSLEngine on
  SSLCertificateFile /etc/letsencrypt/live/awan.com/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/awan.com/privkey.pem

  # Enable HTTP/2
  Protocols h2 http/1.1

  # Security Headers
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"

  # Enable Gzip
  <IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript
  </IfModule>

  # Proxy to Node.js
  ProxyRequests Off
  ProxyPreserveHost On
  ProxyPass / http://localhost:4000/
  ProxyPassReverse / http://localhost:4000/

  # Cache static assets
  <FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>

  # Log files
  ErrorLog ${APACHE_LOG_DIR}/awan_error.log
  CustomLog ${APACHE_LOG_DIR}/awan_access.log combined
</VirtualHost>

<VirtualHost *:80>
  ServerName awan.com
  ServerAlias www.awan.com
  Redirect permanent / https://awan.com/
</VirtualHost>
```

---

## SSL Certificate Setup (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d awan.com -d www.awan.com

# Auto-renew (automatic with most systems)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Manual renew
sudo certbot renew
```

---

## Performance Optimization

### CDN Integration (Cloudflare)
1. Sign up at https://www.cloudflare.com
2. Add your domain
3. Update nameservers
4. Enable caching and optimization

### Monitoring & Analytics
```bash
# Add Google Analytics
# Update src/index.html with GA script

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Health Checks
```bash
# Monitor application health
curl -I https://awan.com/
curl -I https://awan.com/products

# Check server response time
curl -w "@curl-format.txt" -o /dev/null -s https://awan.com/
```

---

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 4000
lsof -i :4000

# Kill process
kill -9 <PID>
```

#### Memory Issues
```bash
# Increase Node.js heap memory
NODE_OPTIONS=--max-old-space-size=4096 npm run serve:ssr:awan
```

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## Monitoring & Logging

### PM2 Monitoring
```bash
# Monitor in real-time
pm2 monit

# View logs
pm2 logs awan

# Save logs
pm2 save

# Resurrect on reboot
pm2 startup
```

### System Monitoring
```bash
# CPU and Memory usage
top

# Disk usage
df -h

# Network connections
netstat -an | grep 4000
```

---

## Backup & Recovery

```bash
# Backup current build
tar -czf awan-backup-$(date +%Y%m%d).tar.gz dist/

# Backup database (if applicable)
mysqldump -u root -p awan_db > awan_db_backup_$(date +%Y%m%d).sql
```

---

## Checklist for Production Deployment

- [ ] Update domain in `src/app/core/services/seo.service.ts`
- [ ] Update company information (name, logo, contact details)
- [ ] Generate SSL certificate
- [ ] Configure web server (Nginx/Apache)
- [ ] Set environment variables
- [ ] Run production build
- [ ] Test all routes and functionality
- [ ] Submit sitemap to Google Search Console
- [ ] Configure monitoring and logging
- [ ] Set up automated backups
- [ ] Configure CDN if using
- [ ] Test mobile responsiveness
- [ ] Verify all meta tags and SEO implementation
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure automated deployments (CI/CD)

---

## CI/CD Setup (GitHub Actions Example)

### .github/workflows/deploy.yml
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
          DEPLOY_HOST: ${{ secrets.DEPLOY_HOST }}
          DEPLOY_USER: ${{ secrets.DEPLOY_USER }}
          DEPLOY_PATH: /var/www/awan
        run: |
          mkdir -p ~/.ssh
          echo "$DEPLOY_KEY" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -H $DEPLOY_HOST >> ~/.ssh/known_hosts
          scp -i ~/.ssh/deploy_key -r dist/awan $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
          ssh -i ~/.ssh/deploy_key $DEPLOY_USER@$DEPLOY_HOST "cd $DEPLOY_PATH && npm install --production && pm2 reload awan"
```

---

## Support & Resources

- Angular Documentation: https://angular.io/docs
- Node.js Documentation: https://nodejs.org/docs
- Nginx Configuration: https://nginx.org/en/docs
- SSL Certificates: https://letsencrypt.org
- Monitoring: https://pm2.io

---

## Summary

Your Awan website is now ready for production deployment with:
✅ Full SSR and prerendering
✅ Optimized performance
✅ Security headers configured
✅ SEO fully optimized
✅ Multiple deployment options
✅ Monitoring and logging setup

Choose the deployment option that best fits your infrastructure and requirements.
