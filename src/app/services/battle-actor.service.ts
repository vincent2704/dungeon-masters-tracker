import {Injectable} from '@angular/core';
import {ActorService} from "./actor.service";
import {BattleActor} from "../models/battleActor";
import {Condition} from "../models/Condition";
import {BattleCondition} from "../models/battleCondition";

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

  getBattleActors() {
    return this.battleActors;
  }

  setBattleActors(battleActors: BattleActor[]) {
    this.battleActors = battleActors;
  }

  resetBattleActors(): BattleActor[] {
    this.battleActors = [];

    this.battleActors = this.getProtagonistsBattleActors();
    return this.battleActors;
  }

  getProtagonistsBattleActors(): BattleActor[] {
    for (let actor of this.actorService.getProtagonists()) {
      let battleActor = new BattleActor(actor.getName(), actor.getMaxHP());
      this.battleActors.push(battleActor)
    }

    return this.battleActors;
  }

  sortBattleActorsByInitiative(): BattleActor[] {
    this.battleActors.sort(
      ((actor1, actor2) => actor2.getInitiative() - actor1.getInitiative()));
    return this.battleActors;
  }

  addBattleActor(newActorName: string, newActorMaxHP: number, initiative: number): void {
    let battleActor: BattleActor = new BattleActor(newActorName, newActorMaxHP);
    battleActor.setInitiative(initiative);
    this.battleActors.push(battleActor);
    this.sortBattleActorsByInitiative();
  }

  progressActor(actorToProgress: BattleActor): void {
    let battleActor = this.battleActors.find(actor => actor == actorToProgress);
    if (battleActor) {
      battleActor.setActorProgress(true);
      battleActor.decrementConditionsDuration();
    }
  }

  isActorProgressed(actorToCheck: BattleActor): boolean {
    let anyLowerInitiativeAndConsciousActorHasProgressed = this.battleActors.find(battleActor =>
      battleActor.hasActorProgressedInTurn()
      && !battleActor.hasCondition(Condition.UNCONSCIOUS)
      && battleActor.getInitiative() < actorToCheck.getInitiative());

    if (anyLowerInitiativeAndConsciousActorHasProgressed) {
      return true;
    }
    return actorToCheck.hasActorProgressedInTurn();
  }

  allActorsProgressed(): boolean {
    return this.battleActors.filter(
      actor => this.isActorProgressed(actor)).length == this.battleActors.length;
  }

  resetBattleActorsProgress(): void {
    for (let battleActor of this.battleActors) {
      battleActor.setActorProgress(false);
    }
  }

  addBattleCondition(actor: BattleActor, condition: BattleCondition) {
    actor.battleConditions.push(condition);
  }

  removeCondition(actor: BattleActor, conditionToRemove: Condition) {
    if(actor.battleConditions.find(battleCondition => battleCondition.getCondition() === conditionToRemove)) {
      actor.removeCondition(conditionToRemove);
    }
  }

  addHP(actor: BattleActor, value: number) {
    actor.addHP(value);
  }
}
