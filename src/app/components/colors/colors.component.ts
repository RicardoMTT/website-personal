import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorData } from './color-data.interface';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>ColorsComponent),
      multi:true
    }
  ]
})
export class ColorsComponent implements OnInit, ControlValueAccessor {
  @Input() options: any[] = [];

  colorSelected :ColorData | null = null;

  onChangeCb: ((color: ColorData) => void) | undefined;//Este sera solo asignada cuando vinculemos el componente con un formcontrol
  constructor() {}

  /*
    Cada vez que el valor del formControl programaticamente(osea lo que
      incluye su inicializacion o la llamada a metodos patchVAlue,setValue),
      el formControl llaamraa a este metodo pasando como arg ese nuevo valor
      oara q el CVA refleje ese cambio en el DOM
  */
  writeValue(colorData:ColorData): void {

    this.colorSelected = colorData;
  }
  /*
    Para transmitir los cambios desde el dom al formControl,
    aca usamos un cb
  */
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnInit(): void {}

  selectColor(colorData: ColorData) {
    this.colorSelected = colorData;
    this.onChangeCb  && this.onChangeCb(colorData);
  }
}
