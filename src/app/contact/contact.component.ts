import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact } from './contact';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contactForm = this.fb.group({
    name: ['', [
      Validators.required
    ]],
    from:  ['', [
      Validators.required,
      Validators.email
    ]],
    subject: ['', [
      Validators.required
    ]],
    message: ['', [
      Validators.required
    ]],
    recaptcha: ['', [
      Validators.required
    ]],
  });

  formSubmitted = false;
  sending = false;
  serverError = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private service: ContactService
  ) {
  }

  onSubmit(): void {
    this.serverError = false;
    this.success = false;

    if (this.contactForm.invalid) {
      this.formSubmitted = true;
      return;
    }

    this.sending = true;

    this.service
      .sendContact(Contact.populate(this.contactForm.value))
      .subscribe(response => {
        this.success = true;
        this.sending = false;
        this.formSubmitted = false;
        this.contactForm.reset();
      }, error => {
        this.serverError = true;
        this.sending = false;
      });
  }
}
