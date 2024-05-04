import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { HomeComponent } from './home.component';
import { PhraseComponent } from '../phrase/phrase.component';
import { TechnicalSkillsComponent } from '../technical-skills/technical-skills.component';
import { ExperienceComponent } from '../experience/experience.component';
import { LoaderComponent } from '../loader/loader.component';
import { ReposComponent } from '../repos/repos.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepoComponent } from '../repos/repo/repo.component';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import { ColorsComponent } from 'src/app/components/colors/colors.component';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    PhraseComponent,
    TechnicalSkillsComponent,
    ExperienceComponent,
    LoaderComponent,
    ReposComponent,
    ContactFormComponent,
    RepoComponent,
    CarouselComponent,
    ColorsComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    TranslocoRootModule],
})
export class HomeModule {}
