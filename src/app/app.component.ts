import { Component, Inject, PLATFORM_ID, Renderer2, RendererFactory2, OnInit, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { CommonService } from './core/services/common.service';
import { SeoService } from './core/services/seo.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private renderer: Renderer2;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private commonService: CommonService,
    private rendererFactory: RendererFactory2,
    private seoService: SeoService,
    private router: Router
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    if (isPlatformBrowser(this.platformId)) {
      // Set the direction based on language
      const lang = this.commonService.getLanguage();
      this.commonService.setLanguage(lang);

      // Hide the loader
      setTimeout(() => {
        const loader = this.renderer.selectRootElement('#loader');
        const body = this.document.getElementsByTagName("body");
        this.renderer.setStyle(loader, 'display', 'none');
        body[0].style.overflowY = 'scroll';
      }, 1500);
    }
  }

  ngOnInit(): void {
    // Set default SEO tags
    this.seoService.setSeoConfig({
      title: 'Awan - Software Solutions',
      description: 'Discover innovative software solutions for your business needs. Partner with Awan for cutting-edge technology.',
      keywords: ['software', 'solutions', 'technology', 'company'],
      ogType: 'website',
      robots: 'index, follow',
      structuredData: this.seoService.getOrganizationSchema()
    });

    // Update SEO tags on route changes
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          // Scroll to top
          window.scrollTo(0, 0);
        });
    }
  }
}
