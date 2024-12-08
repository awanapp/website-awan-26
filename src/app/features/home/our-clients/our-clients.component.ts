import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-our-clients',
  standalone: true,
  imports: [CommonModule,CarouselModule,TranslateModule],
  templateUrl: './our-clients.component.html',
  styleUrl: './our-clients.component.scss'
})
export class OurClientsComponent {
  customOptions: OwlOptions = {
    rtl: true, 
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    },
    nav: false
  }
  clients = [
    { id: '1', src: 'images/clients/logo1.png', alt: 'logo1' },
    { id: '2', src: 'images/clients/logo2.png', alt: 'logo6' },
    { id: '3', src: 'images/clients/logo3.png', alt: 'logo6' },
    { id: '4', src: 'images/clients/logo4.jpg', alt: 'logo6' },
    { id: '5', src: 'images/clients/logo5.png', alt: 'logo8' },
    { id: '6', src: 'images/clients/logo6.png', alt: 'logo6' },
    { id: '7', src: 'images/clients/logo7.png', alt: 'logo5' },
    { id: '8', src: 'images/clients/logo8.png', alt: 'logo5' },
    { id: '9', src: 'images/clients/logo9.png', alt: 'logo5' },
    { id: '10', src: 'images/clients/logo10.png', alt: 'logo5' },
    { id: '11', src: 'images/clients/logo11.png', alt: 'logo5' },
  ]
}
 