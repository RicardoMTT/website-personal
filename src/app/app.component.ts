import { Component, HostListener, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subject, delay } from 'rxjs';
import { EfemeridesService } from './services/efemerides.service';
import { ICarouselItem } from './components/carousel/carousel.component';
import { CAROUSEL_DATA_ITEMS } from './constants/carousel.const';
import { GeminiService } from './services/gemini.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userInactive: Subject<any> = new Subject();
  timeoutId: any;
  loading:boolean = false;
  public showButton = false;
  public showModal = false;
  bodyText: string = '';
  welcomeMessage: string = 'test';
  public scrollHeigth = 600;
  public efemeridesToday: string = '';
  public day: number = 0;
  public month: string = '';
  public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;
  imageBlobUrl: string | ArrayBuffer | undefined;

  constructor(
    public title: Title,
    private meta: Meta,
    private efemeridesService: EfemeridesService,
    private geminiService: GeminiService,
    private loadingService: LoadingService
  ) {
    this.geminiService.initialize('AIzaSyDLPyTK8c7Y8UxrutMNlCW6Bof8WIkklpg');
  }

  ngOnInit(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading)=>{
      this.loading = loading;
    })

    this.title.setTitle('Home page');
    this.checkTimeOut();
    this.userInactive.subscribe((message) => {
      // alert(message);
      this.showModal = true;
      this.openModal('custom-modal-1');
    });
    this.bodyText = 'Zzzzzz';
    this.meta.updateTag({ name: 'title', content: 'test' });
    this.meta.updateTag({ name: 'description', content: 'Lorem ipsum dolor' });
    this.meta.updateTag({ name: 'image', content: './assets/photo.jpg' });
    this.meta.updateTag({ name: 'site', content: 'My Website' });

    const today = new Date();
    const month = today.getMonth();
    this.month = this.getMonthById(month + 1);
    const day = today.getDate();
    this.day = day;

    const query = `month=${month}&&day=${day}`;
    this.efemeridesService.getEventToday(query).subscribe((response) => {
      this.efemeridesToday = response[0].event;
    });
  }

  openModal(id: string) {
    // this.modalService.open(id);
  }

  closeModal(id: string) {
    this.showModal = false;
    // this.modalService.close(id);
    clearTimeout(this.timeoutId); //resetea el setTimeout y vuelve a contar, requiere el id devuelto por el setTimeout
    this.checkTimeOut();
  }

  //Cada vez que se mueva el mouse o se de click en alguna parte este evento limpiara el setTimeout y no se podra aun enviar el next() al observable para el alert
  @HostListener('window:keydown')
  @HostListener('window:mousedown')
  @HostListener('window:mousemove')
  checkUserActivity() {
    clearTimeout(this.timeoutId); //resetea el setTimeout y vuelve a contar, requiere el id devuelto por el setTimeout
    this.checkTimeOut();
  }

  checkTimeOut() {
    this.timeoutId = setTimeout(() => {
      this.userInactive.next('User has been inactive for 30 seconds');
    }, 30000);
  }

  getMonthById(month: any) {
    switch (month) {
      case 1:
        return 'Enero';

      case 2:
        return 'Febrero';

      case 3:
        return 'Marzo';

      case 4:
        return 'Abril';
      case 5:
        return 'Mayo';

      case 6:
        return 'Junio';

      case 7:
        return 'Julio';

      case 8:
        return 'Agosto';
      case 9:
        return 'Septiembre';

      case 10:
        return 'Octubre';

      case 11:
        return 'Noviembre';

      case 12:
        return 'Diciembre';
      default:
        return 'NN';
    }
  }
}
