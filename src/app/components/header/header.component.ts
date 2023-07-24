import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import scroolIntoView from 'scroll-into-view';
import { ColorSchemaService } from 'src/app/services/color-schema.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public active: boolean = false;
  sizeWindow: number = 0;
  isResponsive: boolean = false;
  imageBlobUrl: string | ArrayBuffer | undefined;
  base64Image: any;
  base64Pdf: string = "";
  currentValueDarkMode: boolean = false;
  constructor(
    private http: HttpClient,
    private colorSchemaService: ColorSchemaService
  ) {}

  ngOnInit(): void {
    this.onResize();
    this.colorSchemaService.isDarkMode$.subscribe((isModeDark) => {
      this.currentValueDarkMode = isModeDark;
      const headerElement = document.querySelector(
        '.header-fixed'
      ) as HTMLElement;
      const liElement = document.querySelectorAll('li');
      var index = 0,
        length = liElement.length;
      for (; index < length; index++) {
        isModeDark
          ? (liElement[index].style.color = '#FFFFFF')
          : (liElement[index].style.color = '#2B2726');
      }

      isModeDark
        ? (headerElement.style.background = '#2B2726')
        : (headerElement.style.background = '#FFFFFF');
    });
  }

  redirectTo(section : any) {
    scroolIntoView(document.getElementById(section) as any, {
      time: 200,
    });
    this.test('toggleData');
  }

  setActive() {
    this.active = !this.active;
  }

  toggle() {
    console.log('a');
    
    this.currentValueDarkMode = !this.currentValueDarkMode;
    let toggle = document.querySelector('.container-toggle') as any;
    toggle.classList.toggle('active');
    this.colorSchemaService.updateMode(this.currentValueDarkMode);
  }
  test(idElement: any) {
    const liElement = document.querySelectorAll('li');
    var index = 0,
      length = liElement.length;
    for (; index < length; index++) {
      this.currentValueDarkMode
        ? (liElement[index].style.color = '#FFFFFF')
        : (liElement[index].style.color = '#6B7280');
    }

    this.active = !this.active;
    const element = document.querySelector('#menu') as any;
    element.classList.toggle('active');

    // show Element
    const elementToShow = document.getElementById(idElement) as any;
    elementToShow.classList.toggle('active');
    const panel = elementToShow.getAttribute('data-toggle');
    const panelElement = document.getElementById(panel) as any;
    const classElement = panelElement.parentElement.getElementsByClassName(
      'colapso'
    )[0] as any;
    if (classElement.style.maxHeight) {
      classElement.style.maxHeight = null;
    } else {
      classElement.style.maxHeight = classElement.scrollHeight + 'px';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const liElement = document.querySelectorAll('li');
    var index = 0,
      length = liElement.length;
    for (; index < length; index++) {
      this.currentValueDarkMode
        ? (liElement[index].style.color = '#FFFFFF')
        : (liElement[index].style.color = '#6B7280');
    }
    this.sizeWindow = window.innerWidth;
    if (this.sizeWindow < 667) {
      //mobile
      this.isResponsive = true;
    } else {
      //pc
      this.isResponsive = false;
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.base64Pdf = reader.result as string;
        // window.open(encodeURI(this.base64Pdf));

        // let pdfWindow = window.open('');
        // pdfWindow.document.write(
        //   "<iframe width='100%' height='100%' src='" +
        //     encodeURI(this.base64Pdf) +
        //     "'></iframe>"
        // );
        const downloadLink = document.createElement('a');
        downloadLink.href = this.base64Pdf as string;
        downloadLink.target = '_blank';
        const fileName = 'profile.pdf';
        downloadLink.download = fileName;
        downloadLink.click();
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  downloadPDF() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Ocp-Apim-Subscription-Key': 'xxxxxxx',
    });
    headers = headers.set('Accept', 'application/pdf');
    return this.http
      .get('../../assets/perfil.pdf', {
        headers: headers,
        responseType: 'blob',
      })
      .subscribe((data) => {
        this.createImageFromBlob(data);
      });
  }
}
