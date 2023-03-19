import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user/user.service";

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.registering = true;
  }

  onSubmit() {
    this.userService.createUser(this.registrationFormGroup.value)
      .subscribe(() => {
        this.registrationFormGroup.reset();
      }, () => console.error('Failed to create character'))
  }

}
