import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  videoOpen: boolean = false;
  constructor(private commonService: CommonService) { }
  scrollToElement(elementId: string): void {
    this.commonService.scrollToElement(elementId);
  }
}
