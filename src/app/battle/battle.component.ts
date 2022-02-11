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

  conditionToAdd!: Condition;
  conditionToAddDuration: number = 0;

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

  getAvailableConditions(actor: BattleActor): Condition[] {
    let availableConditions: Condition[] = [];
    for (let condition of this.CONDITIONS) {
      if (!actor.battleConditions.find(actorCondition => actorCondition.getName() == condition.getName())) {
        availableConditions.push(condition);
      }
    }
    return availableConditions;
  }

  onSubmitHP(actor: BattleActor, event: any) {
    this.battleActorService.addHP(actor, event.target.value);
    (<HTMLInputElement>event.target).value = '';
  }


  setConditionToAdd(event: Event) {
    let conditionName = (<HTMLInputElement>event.target).value;
    for(let condition of this.CONDITIONS) {
      if(condition.getName() === conditionName) {
        this.conditionToAdd = condition;
      }
    }
  }

  setConditionToAddDuration(event: Event) {
    this.conditionToAddDuration = parseInt((<HTMLInputElement>event.target).value);
    (<HTMLInputElement>event.target).value = '';
  }

  onSubmitCondition(actor: BattleActor) {
      console.log('condition to add: ' + this.conditionToAdd.getDescription());
      console.log('duration: ' + this.conditionToAddDuration);
      let battleCondition = new BattleCondition(this.conditionToAdd, this.conditionToAddDuration);
      this.battleActorService.addBattleCondition(actor, battleCondition);
  }
}
