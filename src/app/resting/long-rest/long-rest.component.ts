import {Component, Input, OnInit} from '@angular/core';
import {RestingService} from "../../services/resting/resting.service";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {Campaign} from "../../models/campaign/campaign";
import {CampaignService} from "../../services/campaign/campaign.service";

@Component({
  selector: 'app-long-rest',
  templateUrl: './long-rest.component.html',
  styleUrls: ['./long-rest.component.css']
})
export class LongRestComponent implements OnInit {

  @Input()
  playerCharacters!: PlayerCharacter[];
  restTimeInHours: number = 0;

  campaign: Campaign;

  constructor(private restingService: RestingService, private campaignService: CampaignService) {
    this.campaign = campaignService.getLocalStorageCampaign();
  }

  ngOnInit(): void {
    this.campaign = this.campaignService.getLocalStorageCampaign();
    this.restTimeInHours = this.restingService.getMinimumRestingTime(this.campaign);
  }

  rest(): void {
    this.restingService.performLongRest(this.restTimeInHours, this.playerCharacters);
  }

  getTimeSinceLastRest(): number {
    return this.restingService.getTimeSinceLastLongRest(this.campaign);
  }

  getMinimumRestingTime(): number {
    return this.restingService.getMinimumRestingTime(this.campaign);
  }

  isRestingEnabled(): boolean {
    return this.restTimeInHours >= this.restingService.getMinimumRestingTime(this.campaign);
  }
}
