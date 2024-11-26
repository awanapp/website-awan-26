import { Component, Inject, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CommonService } from './core/services/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'awan';
  private renderer: Renderer2;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private commonService: CommonService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    
    if (isPlatformBrowser(this.platformId)) {
      // Set the direction based on language
      const lang = this.commonService.getLanguage();
      this.commonService.setLanguage(lang);

      // Hide the loader
      setTimeout(() => {
        let loader = this.renderer.selectRootElement('#loader')
        const body = this.document.getElementsByTagName("body");
        this.renderer.setStyle(loader, 'display', 'none')
        body[0].style.overflowY = 'scroll'
      }, 1500)
    }
  }


}
