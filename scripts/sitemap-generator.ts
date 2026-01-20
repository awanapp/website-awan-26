import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface RobotsEntry {
  userAgent: string;
  rules: { allow?: string[]; disallow?: string[]; crawlDelay?: number }[];
}

/**
 * Generate sitemap.xml file from routes
 */
export function generateSitemap(urls: SitemapUrl[], outputPath: string = 'public/sitemap.xml'): void {
  mkdirSync(join(process.cwd(), 'public'), { recursive: true });

  const urlElements = urls
    .map(url => {
      let element = `  <url>\n    <loc>${escapeXml(url.loc)}</loc>\n`;
      if (url.lastmod) {
        element += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      if (url.changefreq) {
        element += `    <changefreq>${url.changefreq}</changefreq>\n`;
      }
      if (url.priority !== undefined) {
        element += `    <priority>${url.priority}</priority>\n`;
      }
      element += `  </url>\n`;
      return element;
    })
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${urlElements}</urlset>`;

  writeFileSync(join(process.cwd(), outputPath), sitemap, 'utf-8');
  console.log(`✓ Sitemap generated at ${outputPath}`);
}

/**
 * Generate robots.txt file
 */
export function generateRobots(
  entries: RobotsEntry[] = [],
  sitemapUrl: string = 'https://awan.com/sitemap.xml',
  outputPath: string = 'public/robots.txt'
): void {
  mkdirSync(join(process.cwd(), 'public'), { recursive: true });

  // Default entries if none provided
  if (entries.length === 0) {
    entries = [
      {
        userAgent: '*',
        rules: [
          {
            allow: ['/'],
            disallow: ['/admin/', '/*.json$', '/api/']
          }
        ]
      },
      {
        userAgent: 'Googlebot',
        rules: [{ allow: ['/'] }]
      },
      {
        userAgent: 'Bingbot',
        rules: [{ allow: ['/'] }]
      }
    ];
  }

  let content = '';

  for (const entry of entries) {
    content += `User-agent: ${entry.userAgent}\n`;

    for (const rule of entry.rules) {
      if (rule.allow) {
        for (const allow of rule.allow) {
          content += `Allow: ${allow}\n`;
        }
      }
      if (rule.disallow) {
        for (const disallow of rule.disallow) {
          content += `Disallow: ${disallow}\n`;
        }
      }
      if (rule.crawlDelay) {
        content += `Crawl-delay: ${rule.crawlDelay}\n`;
      }
    }

    content += '\n';
  }

  content += `Sitemap: ${sitemapUrl}\n`;

  writeFileSync(join(process.cwd(), outputPath), content, 'utf-8');
  console.log(`✓ Robots.txt generated at ${outputPath}`);
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  const xmlChars: { [key: string]: string } = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
    '&': '&amp;'
  };
  return str.replace(/[<>"'&]/g, char => xmlChars[char]);
}

/**
 * Example usage
 */
export function generateDefaultSitemaps(): void {
  const sitemapUrls: SitemapUrl[] = [
    {
      loc: 'https://awan.com/',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: 'https://awan.com/home',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: 'https://awan.com/products',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.8
    }
    // Add more URLs as needed
  ];

  generateSitemap(sitemapUrls);
  generateRobots();
}

// Uncomment to run when this file is executed directly
// generateDefaultSitemaps();
