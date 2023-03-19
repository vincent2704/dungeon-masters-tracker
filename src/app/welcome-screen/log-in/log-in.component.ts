import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user/user";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.loginForm.value)
      .subscribe(response => {
        const user = {
          username: response.username,
          emailAddress: response.emailAddress,
          campaigns: response.campaigns
        } as User
        localStorage.setItem('current_user', JSON.stringify(user))
      }, () => console.error(`Failed to log in - user ${this.loginForm.get('username')}`))
  }

}
