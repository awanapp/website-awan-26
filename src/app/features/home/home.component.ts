import { Component } from '@angular/core';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { AboutUsComponent } from './about-us/about-us.component';
import { OurProductsComponent } from "./our-products/our-products.component";
import { FactsComponent } from "./facts/facts.component";
import { OurServicesComponent } from "./our-services/our-services.component";
import { OurCeosComponent } from "./our-ceos/our-ceos.component";
import { OurClientsComponent } from "./our-clients/our-clients.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSectionComponent, AboutUsComponent, OurProductsComponent, FactsComponent, OurServicesComponent, OurCeosComponent, OurClientsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
