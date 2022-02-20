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
  round: number = 1;
  CONDITIONS: Condition[] = Condition.CONDITIONS;

  // condition form
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
      this.round = 1;
    }
  }

  progressActor(actor: BattleActor): void {
    this.battleActorService.progressActor(actor);
    if (this.battleActorService.allActorsProgressed()) {
      this.progressRound();
    }
  }

  progressRound() {
    this.round++;
    this.battleActorService.resetBattleActorsProgress();
  }

  isActorProgressed(actorToCheck: BattleActor): boolean {
    return actorToCheck.isActorProgressedInTurn();
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
   actor.addHP(event.target.value);
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
      let battleCondition = new BattleCondition(this.conditionToAdd, this.conditionToAddDuration);
      this.battleActorService.addBattleCondition(actor, battleCondition);
  }
}
