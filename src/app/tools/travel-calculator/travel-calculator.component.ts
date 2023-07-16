import {Component, OnInit} from '@angular/core';
import {CampaignService} from "../../services/campaign/campaign.service";
import {Settings} from "../../services/settings/settings";
import {CampaignUpdateRequest} from "../../models/campaign/campaignUpdateRequest";
import { DateUtils } from "../../utilities/date/dateUtils";

@Component({
  selector: 'app-travel-calculator',
  templateUrl: './travel-calculator.component.html',
  styleUrls: ['./travel-calculator.component.css']
})
export class TravelCalculatorComponent implements OnInit {
  pace: string = '';
  travelInformation: string = '';
  trackTime: boolean = true;

  constructor( private campaignService: CampaignService) {
  }

  ngOnInit(): void {
  }

  setPace(event: Event) {
    this.pace = (<HTMLInputElement>event.target).value;
  }

  getTypeDistancePlaceholder(): string {
    return Settings.isUsingSISystem() ? 'Distance in kilometers' : 'Distance in miles';
  }

  getTimePlaceholder(): string {
    return 'Travel time in hours';
  }

  onCalculateTime(event: any) {
    if (!this.isPaceSelected()) {
      return;
    }
    let distance = parseFloat((<HTMLInputElement>event.target).value);
    if(!distance) {
      this.travelInformation = "Distance input is empty";
      return;
    }
    this.updateTravelTime(distance);
  }

  onCalculateDistance(event: any) {
    if (!this.isPaceSelected()) {
      return;
    }
    let time = parseFloat((<HTMLInputElement>event.target).value);
    if (!time) {
      this.travelInformation = "Time input is empty";
      return;
    }
    this.updateTravelDistance(time);
  }

  updateTravelTime(distance: number) {
    let travelTimeHours = distance / this.getOneHourTravelToPaceRatio();
    let travelTimeInMinutes = travelTimeHours * 60;
    let minuteRemainder = travelTimeInMinutes % 60

    this.travelInformation = `Travel time: ${Math.floor(travelTimeHours)} hour(s) ` +
      `${Math.round(minuteRemainder)} minute(s)`;

    if (this.trackTime) {
      // this.campaignService.addSeconds(travelTimeHours * 3600);
      const campaign = this.campaignService.getLocalStorageCampaign();
      const campaignUpdateRequest: CampaignUpdateRequest = {
        campaignCurrentDateTime: DateUtils.addCampaignDateTimeHours(travelTimeHours, campaign.campaignDateTimeCurrent)
      }
      this.campaignService.updateCampaign(campaignUpdateRequest)
        .subscribe(response => this.campaignService.updateLocalStorageCampaign(response));
    }
  }

  private updateTravelDistance(time: number) {
    let distanceTraveledForHours = (time * this.getOneHourTravelToPaceRatio()).toFixed(2);
    let measureUnit = Settings.isUsingSISystem() ? 'kilometers' : 'miles';
    this.travelInformation = `Traveled distance: ${distanceTraveledForHours} ${measureUnit}`;
  }

  private isPaceSelected(): boolean {
    if (this.pace.length == 0) {
      this.travelInformation = 'Travel pace is not selected';
      return false;
    }
    return true;
  }

  private getOneHourTravelToPaceRatio(): number {
    switch (this.pace) {
      case 'Fast': {
        return Settings.isUsingSISystem() ? 6 : 4;
      }
      case 'Normal': {
        return Settings.isUsingSISystem() ? 4.5 : 3;
      }
      case 'Slow': {
        return Settings.isUsingSISystem() ? 3 : 2;
      }
      default: {
        return 0;
      }
    }
  }

}
