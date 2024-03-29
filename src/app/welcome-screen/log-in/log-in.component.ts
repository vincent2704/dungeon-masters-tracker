import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user/user";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  @ViewChild('badCredentialsModal')
  badCredentialsModal!: any;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.loginForm.value)
      .subscribe(response => {
        const user = {
          id: response.id,
          username: response.username,
          emailAddress: response.emailAddress,
          campaigns: response.campaigns
        } as User
        localStorage.setItem('current_user', JSON.stringify(user))
        this.loginForm.reset();
        this.router.navigate(['/campaign-selection'])
      }, () => {
        this.loginForm.reset();
        this.modalService.open(this.badCredentialsModal);
        console.error(`Failed to log in - user ${this.loginForm.get('username')}`)
      })
  }

  closeModal() {
    this.modalService.dismissAll(this.badCredentialsModal);
  }
}
