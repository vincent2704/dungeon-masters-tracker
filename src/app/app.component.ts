import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(router: Router) {
    if(this.isLoggedIn()) {
      router.navigate(['campaign-selection'])
    } else {
      router.navigate(['welcome'])
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('current_user');
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  restoreLocalStorage() {
    const campaign = {
      id: "0f29e0da-c69f-44a5-9679-76019f21c8ec",
      name: "Kampania w Walsanii",
      campaignDateTimeStartEpoch: -14057296560000,
      campaignDateTimeCurrentEpoch: -14056384920000,
      lastLongRestTimeEpoch: -14055780960000
    }
    localStorage.setItem('campaign', JSON.stringify(campaign));
  }

  campaignSelected(): boolean {
    return !!localStorage.getItem('current_campaign');
  }
}
