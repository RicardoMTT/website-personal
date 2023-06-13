import { Component, OnInit } from '@angular/core';
import { ColorSchemaService } from 'src/app/services/color-schema.service';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss']
})
export class PhraseComponent implements OnInit {

  constructor(private colorSchemaService:ColorSchemaService) { }

  ngOnInit(): void {
    this.colorSchemaService.isDarkMode$.subscribe(isModeDark => {
      const phraseMainElement  = document.querySelector(".phrase-main") as HTMLElement;
      const phraseElement  = document.querySelector(".phrase-content") as HTMLElement;
      isModeDark ? phraseMainElement.style.background = "#2B2726" : phraseMainElement.style.background = "#FFFFFF"
      isModeDark ? phraseElement.style.color = "rgb(255, 255, 255)" : phraseElement.style.color = "#1F2937"
    })

  }

}
