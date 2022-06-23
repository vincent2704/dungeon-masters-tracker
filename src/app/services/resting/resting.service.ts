import {Injectable} from '@angular/core';
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {Actor} from "../../models/actor";
import {ActorService} from "../actor/actor.service";
import {TemporalService} from "../temporal/temporal.service";

@Injectable({
  providedIn: 'root'
})
export class RestingService {

  private readonly actors: Actor[] = []
  private actorsToAvailableHitDice: Map<string, number> = new Map<string, number>();

  constructor(private actorService: ActorService, private temporalService: TemporalService) {
    //TODO: replace loop with backend call when backend is implemented
    this.actors = actorService.getActors();
    for (let actor of this.actors) {
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

  getActorsToAvailableHitDiceMap(): Map<string, number> {
    return this.actorsToAvailableHitDice;
  }

  setActorsToAvailableHitDiceMap(map: Map<string, number>): void {
    this.actorsToAvailableHitDice = map;
  }

  getActorsAvailableHitDice(actor: Actor): number {
    return this.actorsToAvailableHitDice.get(actor.name)!;
  }

  private applyShortRestInput(actor: Actor, shortRestInput: ShortRestInput): void {
    let currentlyAvailableHitDice = this.actorsToAvailableHitDice.get(actor.name)!;
    this.actorsToAvailableHitDice.set(actor.name, currentlyAvailableHitDice - shortRestInput.hitDiceToSpend);
    actor.modifyHp(shortRestInput.hpToAdd);
  }
}
