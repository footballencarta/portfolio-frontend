import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ContactComponent } from './contact.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ContactService } from './contact.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactService: { sendContact: jasmine.Spy };

  beforeEach(async () => {
    contactService = jasmine.createSpyObj('ContactService', ['sendContact']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RecaptchaModule,
        RecaptchaFormsModule
      ],
      declarations: [ ContactComponent ],
      providers: [
        { provide: ContactService, useValue: contactService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should stop submission on invalid data', () => {
      component.onSubmit();

      expect(component.formSubmitted).toBeTruthy();
      expect(component.contactForm.invalid).toBeTruthy();
      expect(component.sending).toBeFalsy();
  });

  it('should submit with valid data', () => {
    contactService.sendContact.and.returnValue(of('{"success": true}'));

    component.contactForm.controls.name.setValue('test');
    component.contactForm.controls.from.setValue('test@example.com');
    component.contactForm.controls.subject.setValue('test');
    component.contactForm.controls.message.setValue('test');
    component.contactForm.controls.recaptcha.setValue('test');

    component.onSubmit();

    expect(component.formSubmitted).toBeFalsy();
    expect(component.success).toBeTruthy();
    expect(component.contactForm.value).toEqual({
      name: null,
      from: null,
      subject: null,
      message: null,
      recaptcha: null
    });
  });

  it('should show server errors', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    contactService.sendContact.and.returnValue(throwError(errorResponse));

    component.contactForm.controls.name.setValue('test');
    component.contactForm.controls.from.setValue('test@example.com');
    component.contactForm.controls.subject.setValue('test');
    component.contactForm.controls.message.setValue('test');
    component.contactForm.controls.recaptcha.setValue('test');

    component.onSubmit();

    expect(component.formSubmitted).toBeFalsy();
    expect(component.success).toBeFalsy();
    expect(component.contactForm.value).toEqual({
      name: 'test',
      from: 'test@example.com',
      subject: 'test',
      message: 'test',
      recaptcha: 'test'
    });
    expect(component.serverError).toBeTruthy();
  });
});
