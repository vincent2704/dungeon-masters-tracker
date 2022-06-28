import {Injectable} from '@angular/core';
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {Actor} from "../../models/actor";
import {ActorService} from "../actor/actor.service";
import {TemporalService} from "../temporal/temporal.service";

@Injectable({
  providedIn: 'root'
})
export class RestingService {

  private readonly MILLISECONDS_IN_HOUR: number = 3_600_000;

  //TODO: backend - this will probably have to be fixed once Actors are persisted to Map<Actor_ID, Hit_Dice>
  private actorsToAvailableHitDice: Map<string, number> = new Map<string, number>();

  constructor(private actorService: ActorService, private temporalService: TemporalService) {
    //TODO: replace necessary stuff with backend call when backend is implemented
    for (let actor of actorService.getActors()) {
      this.actorsToAvailableHitDice.set(actor.name, actor.level); // initial amount of hit dice should be equal to actor's level
    }
  }

  performShortRest(restDurationInHours: number, actorsToShortRestInput: Map<Actor, ShortRestInput>): void {
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

    this.actorsToAvailableHitDice.forEach((availableHitDice, actorName) => {
      let actor = this.actorService.findActorByName(actorName);
      if(actor.isKnockedDown()) {
        return;
      }
      this.regainHitDice(actor);
      actor.modifyHp(actor.maxHP);
    })

    this.temporalService.addSeconds(restTimeInHours * 3600);
    this.temporalService.setLastLongRestDate(new Date(this.temporalService.getCurrentDate()));
  }

  getActorsToAvailableHitDiceMap(): Map<string, number> {
    return this.actorsToAvailableHitDice;
  }

  setActorsToAvailableHitDiceMap(map: Map<string, number>): void {
    this.actorsToAvailableHitDice = map;
  }

  getActorsAvailableHitDice(actor: Actor): number {
    return this.actorsToAvailableHitDice.get(actor.name)!;
  }

  getTimeSinceLastLongRest() {
    let timeSinceLastLongRest =
      this.temporalService.getCurrentDate().getTime() - this.temporalService.getLastLongRestDate().getTime();
    return timeSinceLastLongRest / this.MILLISECONDS_IN_HOUR;
  }

  getMinimumRestingTime() {
    const timeSinceLastLongRestInHours = this.getTimeSinceLastLongRest()
    return timeSinceLastLongRestInHours >= 24 ? 8 : (24 - timeSinceLastLongRestInHours + 8);
  }

  private regainHitDice(actor: Actor): void {
    let availableHitDice = this.getActorsAvailableHitDice(actor);
    if(availableHitDice < actor.level) {
      let maxDiceNumberToRegain = actor.level / 2;
      availableHitDice += maxDiceNumberToRegain;
      if (availableHitDice > actor.level) {
        availableHitDice = actor.level;
      }
      this.actorsToAvailableHitDice.set(actor.name, availableHitDice);
    }
  }

  private applyShortRestInput(actor: Actor, shortRestInput: ShortRestInput): void {
    let currentlyAvailableHitDice = this.actorsToAvailableHitDice.get(actor.name)!;
    this.actorsToAvailableHitDice.set(actor.name, currentlyAvailableHitDice - shortRestInput.hitDiceToSpend);
    actor.modifyHp(shortRestInput.hpToAdd);
  }
}
