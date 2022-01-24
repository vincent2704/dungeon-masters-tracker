import {Injectable} from '@angular/core';
import {ActorService} from "./actor.service";
import {BattleActor} from "../models/battleActor";
import {Condition} from "../models/Condition";

@Injectable({
  providedIn: 'root'
})
export class BattleActorService {
  private battleActors: BattleActor[] = [];
  private actorService: ActorService;

  constructor(actorService: ActorService) {
    this.actorService = actorService;
    this.resetBattleActors();
  }

  public resetBattleActors(): BattleActor[] {
    this.battleActors = [];

    for (let actor of this.actorService.getProtagonists()) {
      let battleActor = new BattleActor(actor);
      this.battleActors.push(battleActor)
    }

    return this.battleActors;
  }

  sortBattleActorsByInitiative(): BattleActor[] {
    this.battleActors.sort(
      ((actor1, actor2) => actor2.initiative - actor1.initiative));
    return this.battleActors;
  }

  public addBattleActor(newActorName: string, newActorInitiative: number): void {
    this.battleActors.push(new BattleActor(newActorName, newActorInitiative));
  }

  public progressActor(actorToProgress: BattleActor): void {
    let battleActor = this.battleActors.find(actor => actor == actorToProgress);
    if (battleActor) {
      battleActor.setActorProgress(true)
    }
  }

  public allActorsProgressed(): boolean {
    return this.battleActors.filter(actor => actor.isActorProgressed()).length == this.battleActors.length;
  }

  public resetBattleActorsProgress(): void {
    for (let battleActor of this.battleActors) {
      battleActor.setActorProgress(false);
    }
  }

  addCondition(actor: BattleActor, condition: Condition) {
    actor.conditions.push(condition);
  }

  removeCondition(actor: BattleActor, condition: Condition) {
    let conditionToRemove = actor.conditions.find(conditionToRemove => conditionToRemove == condition);
    if (conditionToRemove) {
      let index = actor.conditions.indexOf(conditionToRemove);
      actor.conditions.splice(index, 1);
    }
  }
}
