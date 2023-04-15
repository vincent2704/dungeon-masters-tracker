import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from "../models/user/user";
import { UserService } from "../services/user/user.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {

  @ViewChild('confirmationModal')
  confirmationModal!: any;

  @ViewChild('deleteSuccessModal')
  deleteSuccessModal!: any;

  @ViewChild('deleteErrorModal')
  deleteErrorModal!: any;

  constructor(private userService: UserService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
  }

  getProfile(): User {
    return JSON.parse(localStorage.getItem('current_user')!);
  }

  onDeleteProfile() {
    this.modalService.open(this.confirmationModal);
  }

  confirmDelete() {
    this.userService.deleteUser()
      .subscribe(() => {
        this.router.navigate(['/welcome'])
        this.modalService.open(this.deleteSuccessModal);
        localStorage.clear();
      }, () => {
        this.modalService.open(this.deleteErrorModal);
    })
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
