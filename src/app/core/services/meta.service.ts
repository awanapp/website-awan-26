import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private meta: Meta,
    private title: Title,
    private translate: TranslateService
  ) {}

  updateMetaTags(language: string): void {
    // Translate Meta Tags
    this.translate.get(['META.TITLE', 'META.DESCRIPTION', 'META.KEYWORDS']).subscribe((res) => {
      console.log(this.translate.instant('META.TITLE'));
      
      this.title.setTitle(res['META.TITLE']);
      this.meta.updateTag({ name: 'description', content: res['META.DESCRIPTION'] });
      this.meta.updateTag({ name: 'keywords', content: res['META.KEYWORDS'] });
    });

    // Open Graph Tags
    this.translate.get(['META.OG_TITLE', 'META.OG_DESCRIPTION']).subscribe((res) => {
      this.meta.updateTag({ property: 'og:title', content: res['META.OG_TITLE'] });
      this.meta.updateTag({ property: 'og:description', content: res['META.OG_DESCRIPTION'] });
      this.meta.updateTag({ property: 'og:locale', content: language === 'ar' ? 'ar_AR' : 'en_US' });
    });
  }
}
