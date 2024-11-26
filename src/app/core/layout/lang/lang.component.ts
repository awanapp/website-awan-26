import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-lang',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './lang.component.html',
  styleUrl: './lang.component.scss'
})
export class LangComponent {
  currentLanguage: string = 'ar';
  toLanguage: string = 'en';
  constructor(
    private commonService: CommonService
  ) {
    this.currentLanguage = this.commonService.getLanguage();
  }


  switchLanguage(language: string) {
    if(language === 'ar') {
      this.currentLanguage = 'en';
      this.toLanguage = 'ar';
    }else {
      this.currentLanguage = 'ar';
      this.toLanguage = 'en';
    }
    this.commonService.setLanguage(this.currentLanguage);
  }
}
