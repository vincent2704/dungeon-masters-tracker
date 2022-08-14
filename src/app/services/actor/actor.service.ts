import {Injectable} from '@angular/core';
import {Actor} from "../../models/actor";
import {Condition} from "../../models/Condition";
import {BattleCondition} from "../../models/battleCondition";
import {PROTAGONISTS} from "../../models/dummy-backend-data/actorsData";

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private actors: Actor[] = PROTAGONISTS;

  constructor() {
  }

  getActors(): Actor[] {
    return this.actors.map(actor => {
      return actor.copy();
    });
  }

  findActorByName(actorName: string): Actor {
    return this.actors.find(actor => actor.name == actorName)!;
  }

  addActor(actor: Actor): void {
    this.actors.push(actor);
  }

  deleteActor(actor: Actor): void {
    this.actors.splice(this.actors.indexOf(actor), 1);
  }

  deleteActors(actorsToDelete: Actor[]): void {
    for(let actor of actorsToDelete) {
      if(this.actors.indexOf(actor) > -1) {
        this.actors.splice(this.actors.indexOf(actor), 1);
      }
    }
  }

  setActors(Actors: Actor[]): void {
    this.actors = Actors;
    //TODO: backend call
  }

  addBattleCondition(actor: Actor, condition: BattleCondition): void {
    actor.battleConditions.push(condition);
  }

  removeCondition(actor: Actor, conditionToRemove: Condition): void {
    if (actor.battleConditions.find(battleCondition => battleCondition.getCondition() === conditionToRemove)) {
      actor.removeCondition(conditionToRemove);
    }
  }

}
