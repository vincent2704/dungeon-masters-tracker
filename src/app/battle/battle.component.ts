import {Component, OnInit} from '@angular/core';
import {BattleActor} from "../models/battleActor";
import {BattleActorService} from "../services/battle-actor.service";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  isBattleStarted: boolean = false;
  battleActors: BattleActor[] = []; //TODO: observable from BattleActorService?
  turn: number = 1;

  constructor(private battleActorService: BattleActorService) {
  }

  ngOnInit(): void {
  }

  changeBattleStatus(): void {
    if(!this.isBattleStarted) {
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
    if(this.battleActorService.allActorsProgressed()) {
      this.turn++;
      this.battleActorService.resetBattleActorsProgress();
    }
  }

  isActorProgressed(actorToCheck: BattleActor): boolean {
    return actorToCheck.isActorProgressed();
  }

}
