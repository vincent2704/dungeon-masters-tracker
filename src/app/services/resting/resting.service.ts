import {Injectable} from '@angular/core';
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {ActorService} from "../actor/actor.service";
import {TemporalService} from "../temporal/temporal.service";
import {DateUtils} from "../../utilities/date/dateUtils";
import {PlayerCharacter} from "../../models/actors/playerCharacter";

@Injectable({
  providedIn: 'root'
})
export class RestingService {

  constructor(private actorService: ActorService, private temporalService: TemporalService) {
  }

  performShortRest(restDurationInHours: number, actorsToShortRestInput: Map<PlayerCharacter, ShortRestInput>) {
    actorsToShortRestInput.forEach((shortRestInput, actor) => {
      this.applyShortRestInput(actor, shortRestInput);
    })
    this.temporalService.addSeconds(restDurationInHours * 3600);
    let playerCharacters: PlayerCharacter[] = Array.from(actorsToShortRestInput.keys())
    this.actorService.updatePlayerCharacters(playerCharacters)
      .subscribe();
  }

  performLongRest(restTimeInHours: number, playerCharacters: PlayerCharacter[]): void {
    console.log('resting service - performLongRest()')
    if(restTimeInHours < this.getMinimumRestingTime()) {
      console.error(`Requested Long Rest time is too short to perform Long Rest: ${restTimeInHours} hours`);
      return;
    }

    playerCharacters.forEach(playerCharacter => {
      console.log(`${playerCharacter.name} available hit dice before: ${playerCharacter.availableHitDice}`)
      if(playerCharacter.currentHp == 0) {
        return;
      }
      this.regainHitDice(playerCharacter);
      console.log(`${playerCharacter.name} available hit dice after: ${playerCharacter.availableHitDice}`)
      this.addPlayerCharacterHp(playerCharacter, playerCharacter.maxHp)
    })

    console.log(`restingService - updated PlayerCharacters`)

    this.temporalService.addSeconds(restTimeInHours * 3600);
    this.temporalService.setLastLongRestDate(new Date(this.temporalService.getCurrentDate()));
    this.actorService.updatePlayerCharacters(playerCharacters)
      .subscribe(response => {
        console.log(`actorService - updatePlayerCharactersFinished()`)
        playerCharacters = response;
      });
  }

  getTimeSinceLastLongRest() {
    let timeSinceLastLongRest =
      this.temporalService.getCurrentDate().getTime() - this.temporalService.getLastLongRestDate().getTime();
    return timeSinceLastLongRest / DateUtils.MILLISECONDS_IN_HOUR;
  }

  getMinimumRestingTime() {
    const timeSinceLastLongRestInHours = this.getTimeSinceLastLongRest()
    return timeSinceLastLongRestInHours >= 24 ? 8 : (24 - timeSinceLastLongRestInHours + 8);
  }

  private regainHitDice(playerCharacter: PlayerCharacter): void {
    let availableHitDice = playerCharacter.availableHitDice!;
    if(availableHitDice < playerCharacter.level) {
      let maxDiceNumberToRegain = playerCharacter.level == 1
        ? 1
        : Math.trunc(playerCharacter.level / 2);
      availableHitDice += maxDiceNumberToRegain;
      if (availableHitDice > playerCharacter.level) {
        availableHitDice = playerCharacter.level;
      }
      playerCharacter.availableHitDice = availableHitDice;
    }
  }

  private applyShortRestInput(playerCharacter: PlayerCharacter, shortRestInput: ShortRestInput): void {
    let currentlyAvailableHitDice = playerCharacter.availableHitDice!;
    playerCharacter.availableHitDice = currentlyAvailableHitDice - shortRestInput.hitDiceToSpend

    this.addPlayerCharacterHp(playerCharacter, shortRestInput.hpToAdd)
  }

  private addPlayerCharacterHp(playerCharacter: PlayerCharacter, hpAmount: number): void {
    playerCharacter.currentHp! += hpAmount
    if(playerCharacter.currentHp! > playerCharacter.maxHp) {
      playerCharacter.currentHp = playerCharacter.maxHp;
    }
  }
}
