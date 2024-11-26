import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export class OurServicesComponent {
  services: { title: string, description: string, image: string, bgGrediant: string }[] = []
  constructor(private translate:TranslateService){
    this.loadServices();

    this.translate.onLangChange.subscribe(() => {
      this.loadServices();
    });
  }

  loadServices(){
    this.services = [
      {
        title: this.translate.instant('services.DigitalTransformation.TITLE'),
        description: this.translate.instant('services.DigitalTransformation.DESCRIPTION'),
        image: "images/Rocket.png",
        bgGrediant:"background: linear-gradient(225deg, #374058 0%, #27272E 100%);"
      },
      {
        title: this.translate.instant('services.FullStackProduction.TITLE'),
        description: this.translate.instant('services.FullStackProduction.DESCRIPTION'),
        image: "images/code.png",
        bgGrediant:"background: linear-gradient(225deg, #7285FF 0.01%, #293BB7 100%);"
      },
      {
        title: this.translate.instant('services.MobileApplications.TITLE'),
        description: this.translate.instant('services.MobileApplications.DESCRIPTION'),
        image: "images/mobile-app.png",
        bgGrediant:"background: linear-gradient(224.47deg, #624D8C 8.18%, #493373 95.84%);"
      },
      {
        title: this.translate.instant('services.Websites&WebApplications.TITLE'),
        description: this.translate.instant('services.Websites&WebApplications.DESCRIPTION'),
        image: "images/wep-app.png",
        bgGrediant:"background: linear-gradient(224.47deg, #90E4E8 8.18%, #095DC1 95.84%);"
      },
      {
        title: this.translate.instant('services.Networks&Infrastructure.TITLE'),
        description: this.translate.instant('services.Networks&Infrastructure.DESCRIPTION'),
        image: "images/network.png",
        bgGrediant:"background: linear-gradient(225deg, #67E9F1 0%, #24E795 100%);"
      },
      {
        title: this.translate.instant('services.IntegratedCloudSolutions.TITLE'),
        description: this.translate.instant('services.IntegratedCloudSolutions.DESCRIPTION'),
        image: "images/cloud.png",
        bgGrediant:"background: linear-gradient(225deg, #54A0FF 0%, #052C5E 100%);"
      },
      // {
      //   title: "UX Driven Engineering",
      //   description:"",
      //   image: "images/ux-driven.png",
      //   bgGrediant:"background: linear-gradient(225deg, #126099 0%, #87CED9 100%);"
      // },
      // {
      //   title: "UI design",
      //   description: "", 
      //   image: "images/ui-design.png",
      //   bgGrediant:"background: linear-gradient(225deg, #F76680 0%, #57007B 100%);"
      // },
    ]
  }
}
