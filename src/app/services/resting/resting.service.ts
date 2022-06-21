import { Injectable } from '@angular/core';
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {Actor} from "../../models/actor";
import {ActorService} from "../actor/actor.service";
import {TemporalService} from "../temporal/temporal.service";

@Injectable({
  providedIn: 'root'
})
export class RestingService {

  private actorsToAvailableHitDice: Map<Actor, number> = new Map<Actor, number>();

  constructor(private actorService: ActorService, private temporalService: TemporalService) {
    //TODO: replace loop with backend call when backend is implemented
    for(let actor of actorService.getActors()) {
      this.actorsToAvailableHitDice.set(actor, actor.level); // initial amount of hit dice should be equal to actor's level
    }
  }

  performShortRest(restDurationInHours: number, actorsToShortRestInput: Map<Actor, ShortRestInput>): void {
    actorsToShortRestInput.forEach( (shortRestInput, actor) => {
      this.applyShortRestInput(actor, shortRestInput);
    })
    this.temporalService.addSeconds(restDurationInHours * 3600);
    //TODO: backend call
  }

  getActorsToAvailableHitDiceMap(): Map<Actor, number> {
    return this.actorsToAvailableHitDice;
  }

  setActorsToAvailableHitDiceMap(map: Map<Actor, number>): void {
    this.actorsToAvailableHitDice = map;
  }

  getActorsAvailableHitDice(actor: Actor): number {
    return this.actorsToAvailableHitDice.get(actor)!;
  }

  private applyShortRestInput(actor: Actor, shortRestInput: ShortRestInput): void {
    let currentlyAvailableHitDice = this.actorsToAvailableHitDice.get(actor)!;
    this.actorsToAvailableHitDice.set(actor, currentlyAvailableHitDice-shortRestInput.hitDiceToSpend);
    actor.modifyHp(shortRestInput.hpToAdd);
  }
}
