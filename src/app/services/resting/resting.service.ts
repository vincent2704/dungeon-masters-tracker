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

  //TODO: backend - this will probably have to be fixed once Actors are persisted to Map<Actor_ID, Hit_Dice>
  private actorsToAvailableHitDice: Map<PlayerCharacter, number> = new Map<PlayerCharacter, number>();

  constructor(private actorService: ActorService, private temporalService: TemporalService) {
    //TODO: replace necessary stuff with backend call when backend is implemented
    this.actorService.getPlayerCharacters2()
      .subscribe(response => {
        response.map(playerCharacter =>
          this.actorsToAvailableHitDice.set(playerCharacter, playerCharacter.level));
      })
  }

  performShortRest(restDurationInHours: number, actorsToShortRestInput: Map<PlayerCharacter, ShortRestInput>): void {
    actorsToShortRestInput.forEach((shortRestInput, actor) => {
      this.applyShortRestInput(actor, shortRestInput);
    })
    this.temporalService.addSeconds(restDurationInHours * 3600);
    //TODO: backend call
  }

  performLongRest(restTimeInHours: number): void {
    if(restTimeInHours < this.getMinimumRestingTime()) {
      console.error(`Requested Long Rest time is too short to perform Long Rest: ${restTimeInHours} hours`);
      return;
    }

    this.actorsToAvailableHitDice.forEach((availableHitDice, playerCharacter) => {
      // let actor = this.actorService.findActorByName(actorName);
      if(playerCharacter.currentHp == 0) {
        return;
      }
      this.regainHitDice(playerCharacter);
      this.addPlayerCharacterHp(playerCharacter, playerCharacter.maxHp);
    })

    this.temporalService.addSeconds(restTimeInHours * 3600);
    this.temporalService.setLastLongRestDate(new Date(this.temporalService.getCurrentDate()));
  }

  getActorsToAvailableHitDiceMap(): Map<PlayerCharacter, number> {
    return this.actorsToAvailableHitDice;
  }

  setActorsToAvailableHitDiceMap(map: Map<PlayerCharacter, number>): void {
    this.actorsToAvailableHitDice = map;
  }

  getActorsAvailableHitDice(actor: PlayerCharacter): number {
    return this.actorsToAvailableHitDice.get(actor)!;
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
    let availableHitDice = this.getActorsAvailableHitDice(playerCharacter);
    if(availableHitDice < playerCharacter.level) {
      let maxDiceNumberToRegain = playerCharacter.level / 2;
      availableHitDice += maxDiceNumberToRegain;
      if (availableHitDice > playerCharacter.level) {
        availableHitDice = playerCharacter.level;
      }
      this.actorsToAvailableHitDice.set(playerCharacter, availableHitDice);
    }
  }

  private applyShortRestInput(playerCharacter: PlayerCharacter, shortRestInput: ShortRestInput): void {
    let currentlyAvailableHitDice = this.actorsToAvailableHitDice.get(playerCharacter)!;
    this.actorsToAvailableHitDice.set(playerCharacter, currentlyAvailableHitDice - shortRestInput.hitDiceToSpend);
    this.addPlayerCharacterHp(playerCharacter, shortRestInput.hpToAdd)
  }

  private addPlayerCharacterHp(playerCharacter: PlayerCharacter, hpAmount: number): void {
    playerCharacter.currentHp! += hpAmount
    if(playerCharacter.currentHp! > playerCharacter.maxHp) {
      playerCharacter.currentHp = playerCharacter.maxHp;
    }
  }
}
