import {Component, OnInit} from '@angular/core';
import {Actor} from "../models/actor";
import {ActorService} from "../services/actor.service";
import {Condition} from "../models/Condition";
import {BattleCondition} from "../models/battleCondition";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  isBattleStarted: boolean = false;
  battleActors: Actor[] = []; //TODO: observable from BattleActorService?
  round: number = 1;
  CONDITIONS: Condition[] = Condition.CONDITIONS;

  // condition form
  conditionToAdd!: Condition;
  conditionToAddDuration: number = 0;

  constructor(private battleActorService: ActorService) {
  }

  ngOnInit(): void {
  }

  changeBattleStatus(): void {
    if (!this.isBattleStarted) {
      this.battleActors = this.battleActorService.sortActorsByInitiative();
      this.isBattleStarted = true;
    } else {
      this.battleActors = this.battleActorService.resetActors();
      this.isBattleStarted = false;
      this.round = 1;
    }
  }

  progressActor(actor: Actor): void {
    this.battleActorService.progressActor(actor);
    if (this.battleActorService.allActorsProgressed()) {
      this.progressRound();
    }
  }

  progressRound() {
    this.round++;
    this.battleActorService.resetActorsProgress();
  }

  isActorProgressed(actorToCheck: Actor): boolean {
    return actorToCheck.isActorProgressedInTurn();
  }

  onSubmitHP(actor: Actor, event: any) {
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

  onSubmitCondition(actor: Actor) {
      let battleCondition = new BattleCondition(this.conditionToAdd, this.conditionToAddDuration);
      this.battleActorService.addBattleCondition(actor, battleCondition);
  }
}
