import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setSeoConfig({
      title: 'Products',
      description: 'Explore Awan\'s comprehensive range of software solutions and products designed to meet your business needs. Discover innovative technology tailored for success.',
      keywords: ['products', 'software products', 'solutions', 'technology'],
      url: '/products',
      ogType: 'website',
      robots: 'index, follow',
      image: '/images/og-products.png',
      structuredData: this.getSeoSchema()
    });
  }

  private getSeoSchema(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Products',
      description: 'Our software products and solutions',
      url: 'https://awan.com/products'
    };
  }
}
