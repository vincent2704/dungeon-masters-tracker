import {Component, OnInit } from '@angular/core';
import { ActorService } from "../../services/actor.service";
import { BattleActor } from "../../models/battleActor";

@Component({
  selector: 'app-prepare-battle',
  templateUrl: './prepare-battle.component.html',
  styleUrls: ['./prepare-battle.component.css']
})
export class PrepareBattleComponent implements OnInit {

  battleActors: BattleActor[];
  formModel: BattleActor = new BattleActor('');

  constructor(private actorService: ActorService) {
    this.battleActors = [];

    for(let actor of actorService.getProtagonists()) {
      this.battleActors.push(new BattleActor(actor))
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.battleActors.push(new BattleActor(this.formModel.name, this.formModel.initiative));
  }

}
