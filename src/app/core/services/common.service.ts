import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MetaService } from './meta.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private renderer: Renderer2;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private rendererFactory: RendererFactory2,
    private metaService: MetaService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      this.metaService.updateMetaTags(lang);
      localStorage.setItem('lang', lang);
      // Set the direction based on language
      const direction = lang === 'ar' ? 'rtl' : 'ltr';
      const font = lang === 'ar' ? 'arabic-font' : 'english-font';
      this.renderer.setAttribute(document.body, 'dir', direction);
      this.renderer.setAttribute(document.body, 'class', font);
    }
  }

  getLanguage() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('lang')?.toLocaleLowerCase() || 'ar';
    }
    return 'ar';
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
