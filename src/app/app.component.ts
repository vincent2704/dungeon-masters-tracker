import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
