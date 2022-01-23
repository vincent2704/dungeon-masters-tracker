import {Injectable} from '@angular/core';
import {ActorService} from "./actor.service";
import {BattleActor} from "../models/battleActor";

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

  getBattleActors(): BattleActor[] {
    return this.battleActors;
  }

  public addBattleActor(newActorName: string, newActorInitiative: number): void {
    this.battleActors.push(new BattleActor(newActorName, newActorInitiative));
  }

  public resetBattleActors(): BattleActor[] {
    this.battleActors = [];

    for (let actor of this.actorService.getProtagonists()) {
      this.battleActors.push(new BattleActor(actor))
    }

    return this.battleActors;
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
    for(let battleActor of this.battleActors) {
      battleActor.setActorProgress(false);
    }
  }

}
