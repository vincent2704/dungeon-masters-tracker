import { Injectable } from '@angular/core';
import { ShortRestInput } from "../../models/resting/shortRestInput";
import { ActorService } from "../actor/actor.service";
import { CampaignService } from "../campaign/campaign.service";
import { DateUtils } from "../../utilities/date/dateUtils";
import { PlayerCharacter } from "../../models/actors/playerCharacter";
import { CampaignUpdateRequest } from "../../models/campaign/campaignUpdateRequest";
import { Campaign } from "../../models/campaign/campaign";
import { LongRestRequest } from "../../models/campaign/longRestRequest";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";

@Injectable({
  providedIn: 'root'
})
export class RestingService {

  private readonly MILLISECONDS_IN_HOUR = 3_600_000;

  constructor(private actorService: ActorService, private campaignService: CampaignService) {
  }

  performShortRest(restDurationInHours: number, actorsToShortRestInput: Map<PlayerCharacter, ShortRestInput>) {
    actorsToShortRestInput.forEach((shortRestInput, actor) => {
      this.applyShortRestInput(actor, shortRestInput);
    })
    const campaign = this.campaignService.getLocalStorageCampaign()
    const dateTimeAfterShortRest = campaign.campaignDateTimeCurrentEpoch +
      restDurationInHours * this.MILLISECONDS_IN_HOUR
    let playerCharacters: PlayerCharacter[] = Array.from(actorsToShortRestInput.keys())
    this.actorService.updatePlayerCharacters(playerCharacters)
      .subscribe(response => {
        this.campaignService.updateCampaign(campaign.id,
          {
            campaignDateTimeCurrentEpoch: dateTimeAfterShortRest
          } as Campaign
        ).subscribe(response => {
          this.campaignService.updateLocalStorageCampaign(response);
        })
      });
  }

  performLongRest(restTimeInHours: number, playerCharacters: PlayerCharacter[]): void {
    const longRestRequest = {
      hours: restTimeInHours
    } as LongRestRequest
    this.campaignService.performLongRest(longRestRequest)
      .subscribe(response => {
        console.log(response)
        LocalStorageUtils.getCampaign().lastLongRestTimeEpoch = response.longRestTimeFinishedEpoch
        LocalStorageUtils.getCampaign().campaignDateTimeCurrentEpoch = response.longRestTimeFinishedEpoch
        LocalStorageUtils.setPlayerCharacters(response.playerCharacters);
      })
  }

  getMinimumRestingTime(campaign: Campaign) {
    const timeSinceLastLongRestInHours = this.getTimeSinceLastLongRest(campaign)
    return timeSinceLastLongRestInHours >= 24 ? 8 : (24 - timeSinceLastLongRestInHours + 8);
  }

  getTimeSinceLastLongRest(campaign: Campaign) {
    let timeSinceLastLongRest =
      campaign.campaignDateTimeCurrentEpoch - campaign.lastLongRestTimeEpoch
    return timeSinceLastLongRest / DateUtils.MILLISECONDS_IN_HOUR;
  }

  private applyShortRestInput(playerCharacter: PlayerCharacter, shortRestInput: ShortRestInput): void {
    let currentlyAvailableHitDice = playerCharacter.availableHitDice!;
    playerCharacter.availableHitDice = currentlyAvailableHitDice - shortRestInput.hitDiceToSpend

    this.addPlayerCharacterHp(playerCharacter, shortRestInput.hpToAdd)
  }

  private addPlayerCharacterHp(playerCharacter: PlayerCharacter, hpAmount: number): void {
    playerCharacter.currentHp! += hpAmount
    if (playerCharacter.currentHp! > playerCharacter.maxHp) {
      playerCharacter.currentHp = playerCharacter.maxHp;
    }
  }
}
