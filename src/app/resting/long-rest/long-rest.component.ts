import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {RestingService} from "../../services/resting/resting.service";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {Campaign} from "../../models/campaign/campaign";
import {CampaignService} from "../../services/campaign/campaign.service";
import { LongRestRequest } from "../../models/campaign/longRestRequest";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";

@Component({
  selector: 'app-long-rest',
  templateUrl: './long-rest.component.html',
  styleUrls: ['./long-rest.component.css']
})
export class LongRestComponent implements OnInit {

  playerCharacters: PlayerCharacter[] = [];
  restTimeInHours: number = 0;

  campaign: Campaign;

  @Output()
  playerCharacterEmitter = new EventEmitter<PlayerCharacter[]>();

  constructor(private restingService: RestingService, private campaignService: CampaignService) {
    this.campaign = campaignService.getLocalStorageCampaign();
  }

  ngOnInit(): void {
    this.campaign = this.campaignService.getLocalStorageCampaign();
    this.restTimeInHours = this.restingService.getMinimumRestingTime(this.campaign);
    this.playerCharacters = LocalStorageUtils.getPlayerCharacters();
  }

  performLongRest(): void {
    const longRestRequest = {
      hours: this.restTimeInHours
    } as LongRestRequest
    this.campaignService.performLongRest(longRestRequest)
      .subscribe(response => {
        console.log(response)
        LocalStorageUtils.getCampaign().lastLongRestTimeEpoch = response.longRestTimeFinishedEpoch
        LocalStorageUtils.getCampaign().campaignDateTimeCurrentEpoch = response.longRestTimeFinishedEpoch
        this.playerCharacterEmitter.emit(response.playerCharacters);
      })
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
