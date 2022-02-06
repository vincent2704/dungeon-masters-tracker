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
  }

  progressActor(actorToProgress: BattleActor): void {
    let battleActor = this.battleActors.find(actor => actor == actorToProgress);
    if (battleActor) {
      battleActor.setActorProgress(true)
    }
  }

  allActorsProgressed(): boolean {
    return this.battleActors.filter(
      actor => actor.isActorProgressesInTurn()).length == this.battleActors.length;
  }

  resetBattleActorsProgress(): void {
    for (let battleActor of this.battleActors) {
      battleActor.setActorProgress(false);
    }
  }

  addBattleCondition(actor: BattleActor, condition: BattleCondition) {
    actor.battleConditions.push(condition);
  }

  removeBattleCondition(actor: BattleActor, conditionToRemove: BattleCondition) {
    if(actor.battleConditions.find(battleCondition => battleCondition === conditionToRemove)) {
      actor.removeBattleCondition(conditionToRemove);
    }
  }

  addHP(actor: BattleActor, value: number) {
    actor.addHP(value);
    if(actor.getCurrentHP() > 0 && actor.hasCondition(Condition.UNCONSCIOUS)) {
      actor.removeCondition(Condition.UNCONSCIOUS);
    }
    if (actor.getCurrentHP() <= -actor.getMaxHP()) {
      actor.setDead(true);
      actor.setHP(-actor.getMaxHP());
      return;
    }
    if (actor.getCurrentHP() <= 0 && !actor.dead && !actor.hasCondition(Condition.UNCONSCIOUS)) {
      actor.addCondition(Condition.UNCONSCIOUS);
      return;
    }
  }
}
