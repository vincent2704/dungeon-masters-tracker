import { Injectable } from '@angular/core';
import { PlayerShortRestInput } from "../../models/campaign/resting/playerShortRestInput";
import { ActorService } from "../actor/actor.service";
import { CampaignService } from "../campaign/campaign.service";
import { DateUtils } from "../../utilities/date/dateUtils";
import { PlayerCharacter } from "../../models/actors/playerCharacter";
import { CampaignUpdateRequest } from "../../models/campaign/campaignUpdateRequest";
import { Campaign } from "../../models/campaign/campaign";
import { LongRestRequest } from "../../models/campaign/resting/longRestRequest";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";

@Injectable({
  providedIn: 'root'
})
export class RestingService {

  constructor(private actorService: ActorService, private campaignService: CampaignService) {
  }

  performLongRest(restTimeInHours: number, playerCharacters: PlayerCharacter[]): void {
    const longRestRequest = {
      hours: restTimeInHours
    } as LongRestRequest
    this.campaignService.performLongRest(longRestRequest)
      .subscribe(response => {
        console.log(response)
        LocalStorageUtils.getCampaign().lastLongRestDateTime = response.longRestDateTimeFinished
        LocalStorageUtils.getCampaign().campaignDateTimeCurrent = response.longRestDateTimeFinished
        LocalStorageUtils.setPlayerCharacters(response.playerCharacters);
      })
  }
}
