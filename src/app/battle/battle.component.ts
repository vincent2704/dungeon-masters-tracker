import {Component, OnInit} from '@angular/core';
import {BattleActor} from "../models/battleActor";
import {BattleActorService} from "../services/battle-actor.service";
import {Condition} from "../models/Condition";
import {BattleCondition} from "../models/battleCondition";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  isBattleStarted: boolean = false;
  battleActors: BattleActor[] = []; //TODO: observable from BattleActorService?
  turn: number = 1;
  CONDITIONS: Condition[] = Condition.CONDITIONS;

  constructor(private battleActorService: BattleActorService) {
  }

  ngOnInit(): void {
  }

  changeBattleStatus(): void {
    if (!this.isBattleStarted) {
      this.battleActors = this.battleActorService.sortBattleActorsByInitiative();
      this.isBattleStarted = true;
    } else {
      this.battleActors = this.battleActorService.resetBattleActors();
      this.isBattleStarted = false;
      this.turn = 1;
    }
  }

  progressActor(actor: BattleActor): void {
    this.battleActorService.progressActor(actor);
    if (this.battleActorService.allActorsProgressed()) {
      this.turn++;
      this.battleActorService.resetBattleActorsProgress();
    }
  }

  isActorProgressed(actorToCheck: BattleActor): boolean {
    return actorToCheck.isActorProgressesInTurn();
  }

  addCondition(actor: BattleActor, event: any) {
    for(let condition of this.CONDITIONS) {
      if(condition.getName() == event.target.value) {
        this.battleActorService.addBattleCondition(actor, new BattleCondition(condition));
      }
    }
  }

  getAvailableConditions(actor: BattleActor): string[] {
    let availableConditions: string[] = [];
    for (let condition of this.CONDITIONS) {
      if (!actor.battleConditions.find(actorCondition => actorCondition.getName() == condition.getName())) {
        availableConditions.push(condition.getName());
      }
    }
    return availableConditions;
  }

  onSubmitHP(actor: BattleActor, event: any) {
    this.battleActorService.addHP(actor, event.target.value);
    (<HTMLInputElement>event.target).value = '';
  }
}
