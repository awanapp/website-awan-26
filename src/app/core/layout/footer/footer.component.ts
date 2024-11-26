import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  year: number = new Date().getFullYear();

  constructor(private commonService: CommonService) { }
  scrollToElement(elementId: string): void {
    this.commonService.scrollToElement(elementId);
  }
  
}
