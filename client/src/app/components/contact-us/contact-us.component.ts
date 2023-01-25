import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) { }

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
