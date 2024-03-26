import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Color, Colors } from 'src/app/models/color';
import { Product } from 'src/app/models/product';
import { ColorSchemaService } from 'src/app/services/color-schema.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contactFormFG!: FormGroup;
  isInvalid: boolean = false;

  formCreateContact = JSON.parse(localStorage.getItem('testLS') || '{}');


  demoProduct: Product = {
    id: 'cap',
    name: 'Gorra de Béisbol',
    description: `Gorra de béisbol confeccionada 100% en algodón, muy cómoda y elegante.\nAmplia variedad de colores disponibles.`,
    price: 45,
    colors: [
      // Colors.White,
      // Colors.DarkGrey,
      // Colors.Green,
      Colors.LightBlue,
      // Colors.Orange,
      Colors.Pink,
      // Colors.Yellow,
    ],
  };
  loading: boolean = false;
  existsDataInLocalStorage: boolean = false;
  formChangesSubscription!: Subscription;
  isValueChangesFormInitialized: boolean = false;

  constructor(
    private fb: FormBuilder,
    private colorSchemaService: ColorSchemaService,
    private emailService: EmailService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.parent?.params.subscribe(
      params => {
        this.createForm();
        const formCreateConsultation = this.formCreateContact?.prueba;

        // If there is data stored in Localstorage show message
        if(formCreateConsultation){
          this.existsDataInLocalStorage = true;
        }else{
          this.removeFormValuesFromLocalStorage();
          // Create listener for form changes after 4 seconds to store in Localstorage
          setTimeout(() => {
            this.createFormTest();
          }, 4000);
        }
      });
  }

  /**
   * Remove form values from local storage
   * @returns void
   */
  removeFormValuesFromLocalStorage() {
    localStorage.removeItem('testLS');
  }

  createForm(){
    const defaultColor = this.demoProduct.colors[0];
    this.contactFormFG = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(6)]],
      genre: [defaultColor],
    });
  }

  ngOnInit(): void {
    this.colorSchemaService.isDarkMode$.subscribe((isModeDark) => {
      const contactFormElement = document.querySelector(
        '.contact-form'
      ) as HTMLElement;
      const h1Element = document.querySelector('.contact-title') as HTMLElement;
      const labelsElement = document.querySelectorAll('label');
      var index = 0,
        length = labelsElement.length;
      for (; index < length; index++) {
        isModeDark
          ? (labelsElement[index].style.color = '#2B2726')
          : (labelsElement[index].style.color = '#374A59');
      }
      isModeDark
        ? (h1Element.style.color = '#8E43ED')
        : (h1Element.style.color = '#1F2937');
      isModeDark
        ? (contactFormElement.style.background = '#2B2726')
        : (contactFormElement.style.background = 'white');
    });
  }

  sendMessage() {
    this.loading = true;
    const { email, description, genre } = this.contactFormFG.value;
    if (!this.contactFormFG.valid) {
      this.isInvalid = true;
      return;
    }
    this.isInvalid = false;
    // Call to service
    this.emailService.sendEmail(email,'tricardo003@gmail.com',description,'Prueba correo para futura consulta producto').subscribe({
      next: (response) => {
        if (response) {
          this.loading = false;
          alert('Correo enviado satisfactoriamente')
        }
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    })
  }

  onLoadFormValuesFromLocalStorage() {
    this.loadFormValuesFromLocalStorage();
    this.existsDataInLocalStorage = false;
    if(!this.isValueChangesFormInitialized){
      this.createFormTest();
    }
  }

  loadFormValuesFromLocalStorage() {
    const storedData = localStorage.getItem('testLS');
    if (storedData) {
      const formCreateConsultation = JSON.parse(storedData).prueba;
      console.log(formCreateConsultation);

      const defaultColor = this.demoProduct.colors.find(item => item.code ==formCreateConsultation.genre.code);
      console.log(defaultColor);

      this.contactFormFG.patchValue({
        'email':formCreateConsultation.email,
        'genre':defaultColor,
        'description':formCreateConsultation.description,
      });
    }
  }

  createFormTest(){

    this.isValueChangesFormInitialized = true;

    /*
    |---------------------------------------------------------------------------
    | Save form values in local storage when form changes
    |---------------------------------------------------------------------------
    */
    let formCreateContact = JSON.parse(localStorage.getItem('testLS') || '{}');

    this.formChangesSubscription = this.contactFormFG.valueChanges.subscribe((value: any) => {
      console.log(value);

      const defaultColor = this.demoProduct.colors.find(item => item.code ==value.genre.code);

      formCreateContact.prueba = {
        email: value.email,
        description: value.description,
        genre:defaultColor
      };

      localStorage.setItem('testLS', JSON.stringify(formCreateContact));
    });
  }

}
