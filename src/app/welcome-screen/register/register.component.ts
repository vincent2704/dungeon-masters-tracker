import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user/user.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('userExistsModal')
  userExistsModal!: any;

  @ViewChild('registrationSuccessModal')
  registrationSuccessModal!: any;

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

  constructor(private userService: UserService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.createUser(this.registrationFormGroup.value)
      .subscribe(() => {
        this.modalService.open(this.registrationSuccessModal);
        this.registrationFormGroup.reset();
      }, () => {
        this.modalService.open(this.userExistsModal);
        console.error('Failed to create character')
      })
  }

  closeRegistrationSuccessModal() {
    this.modalService.dismissAll();
  }

  closeUserExistsModal() {
    this.modalService.dismissAll();
  }

}
