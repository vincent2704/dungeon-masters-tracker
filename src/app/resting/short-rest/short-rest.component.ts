import { Component, Input, OnInit } from '@angular/core';
import { RestingService } from "../../services/resting/resting.service";
import { PlayerShortRestInput } from "../../models/campaign/resting/playerShortRestInput";
import { PlayerCharacter } from "../../models/actors/playerCharacter";
import { CampaignService } from "../../services/campaign/campaign.service";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";

@Component({
  selector: 'app-short-rest',
  templateUrl: './short-rest.component.html',
  styleUrls: ['./short-rest.component.css']
})
export class ShortRestComponent implements OnInit {

  @Input()
  playerCharacters!: PlayerCharacter[];
  // TODO: maybe in future move it to forms somehow
  //  this is map to avoid duplicate pushes for every player character on changes
  actorsToShortRestInput: Map<PlayerCharacter, PlayerShortRestInput> = new Map<PlayerCharacter, PlayerShortRestInput>();
  shortRestDurationInHours: number = 1;

  // TODO: refactor - resting service should be removed at all and moved to campaign service
  constructor(private restingService: RestingService, private campaignService: CampaignService) {
  }

  ngOnChanges(): void {
    this.playerCharacters.forEach(playerCharacter => {
      this.actorsToShortRestInput.set(playerCharacter, {
        playerId: playerCharacter.id!,
        hitDiceSpent: 0,
        hpToAdd: 0
      })
    })
  }

  ngOnInit(): void {
    this.playerCharacters.forEach(playerCharacter => {
      this.actorsToShortRestInput.set(playerCharacter, {
        playerId: playerCharacter.id!,
        hitDiceSpent: 0,
        hpToAdd: 0
      })
    })
  }

  confirmShortRest(): void {
    if (this.isValid()) {
      this.campaignService.performShortRest(
        this.shortRestDurationInHours, Array.from(this.actorsToShortRestInput.values()))
        .subscribe(response => {
          LocalStorageUtils.setCurrentCampaign(response.campaign);
          LocalStorageUtils.setPlayerCharacters(response.playerCharacters);
        })
    }
  }

  isValid(): boolean {
    for (let [pc, input] of this.actorsToShortRestInput) {
      if (input.hitDiceSpent > pc.availableHitDice) {
        return false;
      }
    }
    return true;
  }
}
