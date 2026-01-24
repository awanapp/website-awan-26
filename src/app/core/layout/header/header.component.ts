import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { LangComponent } from '../lang/lang.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,LangComponent,TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  currentSection:string = '';
  constructor(
    private commonService: CommonService
  ) { }
  scrollToElement(elementId: string): void {
    this.commonService.scrollToElement(elementId);
  }

  openCalendly(): void {
    // Check if we're in the browser environment
    console.log("calendly try");
    
    if (typeof window !== 'undefined') {
      const checkCalendly = () => {
        console.log("calendly try open");
        const calendly = (window as any).Calendly;
        console.log("Calendly object:", calendly);
        
        if (calendly && calendly.showPopupWidget) {
          console.log("Using showPopupWidget");
          calendly.showPopupWidget('https://calendly.com/awan-app-eg/15min');
        } else if (calendly && typeof calendly.initPopupWidget === 'function') {
          // Alternative method for newer Calendly versions
          console.log("Using initPopupWidget");
          calendly.initPopupWidget({ url: 'https://calendly.com/awan-app-eg/15min' });
          calendly.showPopupWidget();
        } else {
          console.log("Calendly not loaded yet, retrying...");
          // Retry after a short delay if Calendly is not yet loaded
          setTimeout(checkCalendly, 200);
        }
      };
      checkCalendly();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const home = document.getElementById('home');
    const about = document.getElementById('about');
    const Products = document.getElementById("Products");
    const Services = document.getElementById("Services");
    const Clients = document.getElementById("Clients");
    const Contact = document.getElementById("Contact");

    let foundSection = false;

    if (home && home.getBoundingClientRect().top < window.innerHeight / 2) {
      this.currentSection = 'home';
      foundSection = true;
    }


    if (about && about.getBoundingClientRect().top < window.innerHeight / 2) {
      this.currentSection = 'about';
      foundSection = true;
    }

    if (Products && Products.getBoundingClientRect().top < window.innerHeight / 2) {
      this.currentSection = 'Products';
      foundSection = true;
    }
    if (Services && Services.getBoundingClientRect().top < window.innerHeight / 2) {
      this.currentSection = 'Services';
      foundSection = true;
    }
    if (Clients && Clients.getBoundingClientRect().top < window.innerHeight / 2) {
      this.currentSection = 'Clients';
      foundSection = true;
    }
    if (Contact && Contact.getBoundingClientRect().top < window.innerHeight / 2) {
      this.currentSection = 'Contact';
      foundSection = true;
    }

    if (!foundSection) {
      this.currentSection = '';
    }
  }
}
