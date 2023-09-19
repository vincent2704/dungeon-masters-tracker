import { Component, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "./services/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // TODO: profile settings duplicate, try to move profile settings so it's always visible regardless
  //  of campaign selection
  @ViewChild('confirmationModal')
  confirmationModal!: any;

  @ViewChild('deleteSuccessModal')
  deleteSuccessModal!: any;

  @ViewChild('deleteErrorModal')
  deleteErrorModal!: any;

  constructor(private router: Router, private userService: UserService, private modalService: NgbModal) {
    if(this.isLoggedIn()) {
      router.navigate(['campaign-selection'])
    } else {1
      router.navigate(['welcome'])
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('current_user');
  }

  campaignSelected(): boolean {
    return !!localStorage.getItem('current_campaign');
  }

  logOut() {
    localStorage.clear();
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
