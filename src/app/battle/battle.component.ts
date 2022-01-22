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

  constructor() { }

  ngOnInit(): void {
  }

  battleActors: BattleActor[] = [];
  isBattleStarted: boolean = false;

  changeBattleStatus(): void {
    if(!this.isBattleStarted) {
      this.battleActors = this.child.battleActors;
      this.battleActors.sort(
        ((actor1, actor2) => actor2.initiative - actor1.initiative));
      this.isBattleStarted = true;
    } else {
      this.battleActors = [];
      this.isBattleStarted = false;
    }
  }

}
