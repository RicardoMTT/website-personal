import { DOCUMENT } from '@angular/common';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { ICarouselItem } from 'src/app/components/carousel/carousel.component';
import { CAROUSEL_DATA_ITEMS } from 'src/app/constants/carousel.const';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document,
  private modalService: ModalService) {}
  public showButton = false;
  public showModal = false;
  bodyText: string = "";
  public scrollHeigth = 600;
  public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;

  ngOnInit(): void {
    this.bodyText ="zzzzzz"
  }


  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

  @HostListener('window:scroll')
  onWindowScroll() {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeigth; //Cuando nos desplazamos unos 600px aparecera el boton
  }

  redirectTop() {
    this.document.documentElement.scrollTop = 0;
  }
}
