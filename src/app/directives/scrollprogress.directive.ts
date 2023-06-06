import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollprogress]',
})
export class ScrollprogressDirective {
  constructor() {}
  @HostListener('window:scroll', ['$event'])
  doSomething(event :any) {
    //Cuanto se ha desplazado desde el top
    var winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    //La altura del dispositivo
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    var scrolled = (winScroll / height) * 100;
    document.getElementById('scrollBar')!.style.width = scrolled + '%';

    // let header = document.getElementById('myHeader');
    // let sticky = header.offsetTop;
    // header.classList.add('sticky');
    // var winScroll =
    //   event.target.documentElement.scrollTop ||
    //   event.currentTarget.scrollTop ||
    //   document.body.scrollTop;
    // var height =
    //   event.target.documentElement.scrollHeight ||
    //   event.currentTarget.scrollHeight -
    //     event.target.documentElement.clientHeight ||
    //   event.currentTarget.clientHeight;

    // var winScroll2 =
    //   event.target.scrollingElement.scrollTop ||
    //   event.currentTarget.scrollTop ||
    //   document.body.scrollTop;
    // var height2 =
    //   event.target.scrollingElement.scrollHeight ||
    //   event.currentTarget.scrollHeight -
    //     event.target.documentElement.clientHeight ||
    //   event.currentTarget.clientHeight;

    // var scrolled = (winScroll / height) * 100;
    // var scrolled2 = (winScroll2 / height2) * 100;

    // console.debug('Porcentaje que se desplazo %', scrolled);
    // console.debug('Porcentaje que se desplazo2 %', scrolled2);
    // document.getElementById('scrollBar').style.width = scrolled + '%';
  }
}
