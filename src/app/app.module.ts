import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeModule } from './pages/home/home.module';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollprogressDirective } from './directives/scrollprogress.directive';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/dialog/dialog.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CardComponent } from './components/card/card.component';
import { CardsComponent } from './components/cards/cards.component';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    // ScrollprogressDirective,
    DialogComponent,
    WelcomeComponent,
    CardComponent,
    CardsComponent,
  ],
  imports: [HomeModule, BrowserModule, AppRoutingModule, HttpClientModule,
    BrowserAnimationsModule,NoopAnimationsModule, TranslocoRootModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
