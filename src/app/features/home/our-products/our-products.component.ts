import { Component } from '@angular/core';
import { OurProductCardComponent } from "../our-product-card/our-product-card.component";
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-our-products',
  standalone: true,
  imports: [CommonModule, OurProductCardComponent,TranslateModule],
  templateUrl: './our-products.component.html',
  styleUrl: './our-products.component.scss'
})
export class OurProductsComponent {
  products: { TITLE: string, DESCRIPTION: string, IMAGE: string }[] = []
  constructor(private translate:TranslateService){
    this.loadProducts();

    this.translate.onLangChange.subscribe(() => {
      this.loadProducts();
    });
  }
  loadProducts(){
    this.translate.get('products.PRODUCT_LIST').subscribe((products: any[]) => {
      if (Array.isArray(products)) {
        this.products = products;
      }
    });
  }
}
