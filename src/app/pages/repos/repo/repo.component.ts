import { Component, OnInit, Input } from '@angular/core';
import { ColorSchemaService } from 'src/app/services/color-schema.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss'],
})
export class RepoComponent implements OnInit {
  @Input('item') item: any;
  constructor(private colorSchemaService:ColorSchemaService) {}

  ngOnInit(): void {
    this.colorSchemaService.isDarkMode$.subscribe(isModeDark => {
      const totalReposElement  = document.querySelectorAll("span");
      var index = 0, length = totalReposElement.length;
      for ( ; index < length; index++) {
        isModeDark ? totalReposElement[index].style.color = "rgb(255, 255, 255)" : totalReposElement[index].style.color = "#374A59"
      }
    })
  }
}
