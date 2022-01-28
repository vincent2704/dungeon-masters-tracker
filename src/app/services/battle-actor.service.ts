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

  public addBattleActor(newActorName: string, newActorMaxHP: number, initiative: number): void {
    let battleActor: BattleActor = new BattleActor(newActorName, newActorMaxHP);
    battleActor.setInitiative(initiative);
    this.battleActors.push(battleActor);
  }

  public progressActor(actorToProgress: BattleActor): void {
    let battleActor = this.battleActors.find(actor => actor == actorToProgress);
    if (battleActor) {
      battleActor.setActorProgress(true)
    }
  }

  public allActorsProgressed(): boolean {
    return this.battleActors.filter(
      actor => actor.isActorProgressesInTurn()).length == this.battleActors.length;
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
    actor.removeCondition(condition);
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
