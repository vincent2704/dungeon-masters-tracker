import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
    if(this.isLoggedIn()) {
      router.navigate(['campaign-selection'])
    } else {
      router.navigate(['welcome'])
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('current_user');
  }

  campaignSelected(): boolean {
    return !!localStorage.getItem('current_campaign');
  }
}
