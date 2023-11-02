import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Colors } from 'src/app/models/color';
import { Product } from 'src/app/models/product';
import { ColorSchemaService } from 'src/app/services/color-schema.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contactFormFG: UntypedFormGroup;
  isInvalid: boolean = false;
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
  constructor(
    private fb: UntypedFormBuilder,
    private colorSchemaService: ColorSchemaService,
    private emailService: EmailService
  ) {
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
}
