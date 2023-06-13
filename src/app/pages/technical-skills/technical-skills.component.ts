import { Component, OnInit } from '@angular/core';
import { ColorSchemaService } from 'src/app/services/color-schema.service';

@Component({
  selector: 'app-technical-skills',
  templateUrl: './technical-skills.component.html',
  styleUrls: ['./technical-skills.component.scss']
})
export class TechnicalSkillsComponent implements OnInit {

  constructor(
    private colorSchemaService:ColorSchemaService
  ) { }

  ngOnInit(): void {
    this.colorSchemaService.isDarkMode$.subscribe(isModeDark => {
      const phraseMainElement  = document.querySelector(".technical-skills-main") as HTMLElement;
      isModeDark ? phraseMainElement.style.background = "#2B2726" : phraseMainElement.style.background = "#FFFFFF"

      const pElement  = document.querySelectorAll("p");
      const title1Element  = document.querySelector(".title1") as HTMLElement;
      const title2Element  = document.querySelector(".title2")as HTMLElement;
      const title3Element  = document.querySelector(".title3")as HTMLElement;
      const title4Element  = document.querySelector(".title4")as HTMLElement;
      const title5Element  = document.querySelector(".title5")as HTMLElement;
      const title6Element  = document.querySelector(".title6")as HTMLElement;
      isModeDark ? title1Element.style.color = "rgb(255, 255, 255)" : title1Element.style.color = "rgb(107, 114, 128)"
      isModeDark ? title2Element.style.color = "rgb(255, 255, 255)" : title2Element.style.color = "rgb(107, 114, 128)"
      isModeDark ? title3Element.style.color = "rgb(255, 255, 255)" : title3Element.style.color = "rgb(107, 114, 128)"
      isModeDark ? title4Element.style.color = "rgb(255, 255, 255)" : title4Element.style.color = "rgb(107, 114, 128)"
      isModeDark ? title5Element.style.color = "rgb(255, 255, 255)" : title5Element.style.color = "rgb(107, 114, 128)"
      isModeDark ? title6Element.style.color = "rgb(255, 255, 255)" : title6Element.style.color = "rgb(107, 114, 128)"

      var index = 0, length = pElement.length;
      for ( ; index < length; index++) {
        isModeDark ? pElement[index].style.color = "rgb(255, 255, 255)" : pElement[index].style.color = "rgb(107, 114, 128)"
      }


    })
  }

}
