import {Component, OnInit, ViewChild} from '@angular/core';
import {BattleActor} from "../models/battleActor";
import {BattleActorsComponent} from "./battle-actors/battle-actors.component";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  @ViewChild('child') child!: BattleActorsComponent;

  isBattleStarted: boolean = false;
  battleActors: BattleActor[] = [];
  progressedBattleActors: BattleActor[] = [];
  turn: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  changeBattleStatus(): void {
    if(!this.isBattleStarted) {
      this.battleActors = this.child.battleActors;
      this.battleActors.sort(
        ((actor1, actor2) => actor2.initiative - actor1.initiative));
      this.isBattleStarted = true;
    } else {
      this.battleActors = [];
      this.isBattleStarted = false;
      this.turn = 1;
    }
  }

  progressActor(actor: BattleActor): void {
    this.progressedBattleActors.push(actor);
    if(this.progressedBattleActors.length == this.battleActors.length) {
      this.turn++;
      this.progressedBattleActors = [];
    }
  }

  isActorProgressed(actorToCheck: BattleActor): boolean {
    for(let progressedActor of this.progressedBattleActors) {
      if(actorToCheck == progressedActor) {
        return true;
      }
    }
    return false;
  }

}
