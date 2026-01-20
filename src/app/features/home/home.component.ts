import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { AboutUsComponent } from './about-us/about-us.component';
import { OurProductsComponent } from "./our-products/our-products.component";
import { FactsComponent } from "./facts/facts.component";
import { OurServicesComponent } from "./our-services/our-services.component";
import { OurCeosComponent } from "./our-ceos/our-ceos.component";
import { OurClientsComponent } from "./our-clients/our-clients.component";
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSectionComponent, AboutUsComponent, OurProductsComponent, FactsComponent, OurServicesComponent, OurCeosComponent, OurClientsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setSeoConfig({
      title: 'Enterprise Software Solutions & Digital Transformation',
      description: 'Awan delivers enterprise software solutions, custom software development, digital transformation services, cloud solutions, and IT consulting. Partner with us for innovative technology solutions that drive business growth.',
      keywords: [
        'enterprise software solutions',
        'custom software development',
        'digital transformation',
        'software development company',
        'cloud solutions',
        'IT services',
        'IT consulting',
        'mobile app development',
        'web application development',
        'business process automation',
        'software integration',
        'DevOps services',
        'software testing',
        'UI/UX design',
        'enterprise architecture',
        'strategic IT consulting',
        'full stack development',
        'agile development',
        'software maintenance',
        'Cairo software company'
      ],
      url: '/home',
      ogType: 'website',
      robots: 'index, follow',
      image: '/images/og-home.png',
      structuredData: this.seoService.getOrganizationSchema()
    });
  }
}
