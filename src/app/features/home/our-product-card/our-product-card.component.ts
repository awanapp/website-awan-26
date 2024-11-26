import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-our-product-card',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './our-product-card.component.html',
  styleUrl: './our-product-card.component.scss'
})
export class OurProductCardComponent {
@Input() product!: {TITLE: string, DESCRIPTION: string, IMAGE: string};
@Input() index!: number;
}
