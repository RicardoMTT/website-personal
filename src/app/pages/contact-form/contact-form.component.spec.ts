import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormComponent } from './contact-form.component';
import {
  FormGroup,
  FormControl,
  Validators,
  UntypedFormBuilder,
} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
xdescribe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [UntypedFormBuilder],
      imports: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('Deberia ser fomulario con campos validos', () => {
    const mockContactForm = {
      email: 'tricardo003@gmail.com',
      description: 'test123',
    };
    const emailForm = component.contactFormFG.get('email');
    const descriptionForm = component.contactFormFG.get('description');
    // emailForm.setValue(mockContactForm.email);
    // descriptionForm.setValue(mockContactForm.description);
    component.sendMessage();
    expect(component.contactFormFG.valid).toEqual(true);
    expect(component.isInvalid).toEqual(false);
  });

  it('Deberia ser fomulario con campos invalidos', () => {
    const mockContactForm = {
      email: '',
      description: 'test123',
    };
    const emailForm = component.contactFormFG.get('email');
    const descriptionForm = component.contactFormFG.get('description');
    // emailForm.setValue(mockContactForm.email);
    // descriptionForm.setValue(mockContactForm.description);
    component.sendMessage();
    expect(component.contactFormFG.valid).toEqual(false);
    expect(component.isInvalid).toEqual(true);
  });
});
