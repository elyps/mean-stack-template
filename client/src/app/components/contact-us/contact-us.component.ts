import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  onSubmit(myForm: NgForm, e: Event) {
    emailjs
      .sendForm(
        `${environment.serviceKey}`,
        `${environment.templateKey}`,
        e.target as HTMLFormElement,
        `${environment.apiKey}`
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
          window.location.href = '/success';
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
}
