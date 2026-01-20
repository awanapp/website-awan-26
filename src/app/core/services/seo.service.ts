import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

interface SeoConfig {
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
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://awan.com'; // Update with your actual domain
  private companyName = 'Awan';
  private companyDescription = 'Leading software solutions company';

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  setSeoTitle(title: string): void {
    const fullTitle = title ? `${title} | ${this.companyName}` : this.companyName;
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'og:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
  }

  setSeoConfig(config: SeoConfig): void {
    // Set Title
    this.setSeoTitle(config.title);

    // Set Description
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'og:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });

    // Set Image
    if (config.image) {
      const fullImageUrl = config.image.startsWith('http') ? config.image : `${this.baseUrl}${config.image}`;
      this.meta.updateTag({ name: 'og:image', content: fullImageUrl });
      this.meta.updateTag({ name: 'twitter:image', content: fullImageUrl });
      this.meta.updateTag({ name: 'og:image:alt', content: config.title });
    }

    // Set URL
    const fullUrl = config.url ? `${this.baseUrl}${config.url}` : this.baseUrl;
    this.meta.updateTag({ name: 'og:url', content: fullUrl });
    this.meta.updateTag({ name: 'canonical', content: config.canonical || fullUrl });

    // Set Keywords
    if (config.keywords && config.keywords.length > 0) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords.join(', ') });
    }

    // Set OG Type
    if (config.ogType) {
      this.meta.updateTag({ name: 'og:type', content: config.ogType });
    }

    // Set OG Locale
    if (config.ogLocale) {
      this.meta.updateTag({ name: 'og:locale', content: config.ogLocale });
    }

    // Set Author
    if (config.author) {
      this.meta.updateTag({ name: 'author', content: config.author });
    }

    // Set Robots
    if (config.robots) {
      this.meta.updateTag({ name: 'robots', content: config.robots });
    }

    // Set Structured Data
    if (config.structuredData) {
      this.setStructuredData(config.structuredData);
    }

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@awan' }); // Update with your Twitter handle
  }

  private setStructuredData(structuredData: any): void {
    if (isPlatformServer(this.platformId)) {
      // Create and inject JSON-LD script
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }

  getOrganizationSchema(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.companyName,
      description: this.companyDescription,
      url: this.baseUrl,
      logo: `${this.baseUrl}/images/logo.png`,
      sameAs: [
        'https://www.facebook.com/awan',
        'https://www.twitter.com/awan',
        'https://www.linkedin.com/company/awan'
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        addressRegion: 'State',
        addressLocality: 'City',
        postalCode: 'Zip Code',
        streetAddress: 'Street Address'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: '+1-xxx-xxx-xxxx',
        email: 'info@awan.com'
      }
    };
  }

  getProductSchema(name: string, description: string, image: string, price: string, currency: string = 'USD'): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: name,
      description: description,
      image: `${this.baseUrl}${image}`,
      brand: {
        '@type': 'Brand',
        name: this.companyName
      },
      offers: {
        '@type': 'Offer',
        price: price,
        priceCurrency: currency,
        url: this.baseUrl
      }
    };
  }

  getBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): any {
    const items = breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: `${this.baseUrl}${breadcrumb.url}`
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items
    };
  }

  getFAQSchema(faqs: Array<{ question: string; answer: string }>): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  resetSeoTags(): void {
    // Reset to defaults
    this.setSeoConfig({
      title: this.companyName,
      description: this.companyDescription,
      keywords: ['software', 'solutions', 'technology'],
      ogType: 'website',
      robots: 'index, follow'
    });
  }
}
