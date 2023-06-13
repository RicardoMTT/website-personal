import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { ColorSchemaService } from 'src/app/services/color-schema.service';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  totalRepos: any[] = [];
  @Input() titulo: string = "";
  constructor(private repoService: RepoService,
    private colorSchemaService:ColorSchemaService) {}

  ngOnInit(): void {
    this.colorSchemaService.isDarkMode$.subscribe(isModeDark => {
      const totalReposElement  = document.querySelector(".total-repos") as HTMLElement;
      const titleElement  = document.querySelector(".title-repos") as HTMLElement;
      isModeDark ? titleElement.style.color = "#6366F1" : titleElement.style.color = "#1F2937"
      isModeDark ? totalReposElement.style.background = "#2B2726" : totalReposElement.style.background = "#FFFFFF"
    })
    this.repoService.getFirstSixRepo().subscribe((data: any ) => {
      this.totalRepos = data;
    });
  }
}
