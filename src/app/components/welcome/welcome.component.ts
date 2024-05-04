import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  showWelcome = false;
  @Input() message = '';
  @Input() valueTop = '';
  @Input() day: any;
  @Input() month : any;
  constructor() { }

  ngOnInit() {
    this.showWelcomeMessage();
  }
  showWelcomeMessage() {
    setTimeout(() => {
      this.showWelcome = true;
    }, 3000);
  }

}
