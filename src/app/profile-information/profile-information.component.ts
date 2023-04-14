import { Component, OnInit } from '@angular/core';
import { User } from "../models/user/user";

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getProfile(): User {
    return JSON.parse(localStorage.getItem('current_user')!);
  }

  onDeleteProfile() {

  }
}
