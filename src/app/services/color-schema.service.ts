import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorSchemaService {
  stringToBoolean = (string:any) => string === 'false' ? false : !!string

  isDarkMode = new BehaviorSubject(this.stringToBoolean(localStorage.getItem('isDark')));
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor() {
  }

  updateMode(value:any){
    localStorage.setItem('isDark',value)
    this.isDarkMode.next(value);
  }

}
