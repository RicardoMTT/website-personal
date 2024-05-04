import { Component, OnInit } from '@angular/core';
import scroolIntoView from 'scroll-into-view';
import { ColorSchemaService } from 'src/app/services/color-schema.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  constructor(private colorSchemaService:ColorSchemaService
  ) {}

  ngOnInit(): void {
    this.colorSchemaService.isDarkMode$.subscribe(isModeDark => {
      const headerElement  = document.querySelector(".banner") as HTMLElement;
      isModeDark ? headerElement.style.background = "#2B2726" : headerElement.style.background = "#FFFFFF"
      const parragraphElement  = document.querySelector(".parragraph") as HTMLElement;
      isModeDark ? parragraphElement.style.color = "#2B2726" : parragraphElement.style.color = "#6B7280"
      const additionalhElement  = document.querySelector(".additional-info") as HTMLElement;
      isModeDark ? additionalhElement.style.color = "#2B2726" : additionalhElement.style.color = "#6B7280"
      const bannerTitleElement  = document.querySelector(".banner-title") as HTMLElement;
      isModeDark ? bannerTitleElement.style.color = "#2B2726" : bannerTitleElement.style.color = "#1F2937"
    })
  }

  redirectTo(section:any) {
    const element:any = document.getElementById(section);
    scroolIntoView(element, {
      time: 200,
    });
  }
}
