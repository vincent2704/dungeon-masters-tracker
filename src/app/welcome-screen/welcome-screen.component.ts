import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {

  registering: boolean = false;

  registrationFormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required, Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(8)
    ]),
    emailAddress: new FormControl('', [
      Validators.required, Validators.email
    ])
  });

  constructor() { }

  ngOnInit(): void {
  }

  onRegister() {
    this.registering = true;
  }

  onSubmit() {

  }

}
