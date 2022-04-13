import {Injectable} from '@angular/core';
import {Actor} from "../models/actor";
import {Condition} from "../models/Condition";
import {BattleCondition} from "../models/battleCondition";
import {PROTAGONISTS} from "../models/actorsData";

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private actors: Actor[] = [];

  constructor() {
    this.resetActors();
  }

  getActors() {
    return this.actors;
  }

  setActors(Actors: Actor[]) {
    this.actors = Actors;
  }

  resetActors(): Actor[] {
    this.actors = [];

    this.actors = this.getProtagonistsActors();
    return this.actors;
  }

  getProtagonistsActors(): Actor[] {
    this.actors = PROTAGONISTS.slice();
    return this.actors;
  }

  sortActorsByInitiative(): Actor[] {
    this.actors.sort(
      ((actor1, actor2) => actor2.getInitiative() - actor1.getInitiative()));
    return this.actors;
  }

  addActor(actor: Actor): void {
    this.actors.push(actor);
  }

  progressActor(actorToProgress: Actor): void {
    let actor = this.actors.find(actor => actor == actorToProgress);
    if (actor) {
      actor.progressActor();
    }
  }

  allActorsProgressed(): boolean {
    return this.actors.filter(
      actor => actor.isActorTurnProgressed()).length == this.actors.length;
  }

  resetActorsProgress(): void {
    for (let actor of this.actors) {
      actor.setActorProgress(false);
    }
  }

  addBattleCondition(actor: Actor, condition: BattleCondition) {
    actor.battleConditions.push(condition);
  }

  removeCondition(actor: Actor, conditionToRemove: Condition) {
    if (actor.battleConditions.find(battleCondition => battleCondition.getCondition() === conditionToRemove)) {
      actor.removeCondition(conditionToRemove);
    }
  }

}
