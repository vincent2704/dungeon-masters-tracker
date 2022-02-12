import {Component, OnInit } from '@angular/core';
import { BattleActor } from "../../models/battleActor";
import {BattleActorService} from "../../services/battle-actor.service";

@Component({
  selector: 'app-prepare-battle',
  templateUrl: './prepare-battle.component.html',
  styleUrls: ['./prepare-battle.component.css']
})
export class PrepareBattleComponent implements OnInit {

  battleActors: BattleActor[]; //TODO: observable from BattleActorService?

  constructor(private battleActorService: BattleActorService) {
    this.battleActors = battleActorService.sortBattleActorsByInitiative();
  }

  ngOnInit(): void {
  }

}
