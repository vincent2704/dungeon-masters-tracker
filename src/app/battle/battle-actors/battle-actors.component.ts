import {Component, OnInit } from '@angular/core';
import { ActorService } from "../../services/actor.service";
import { BattleActor } from "../../models/battleActor";

@Component({
  selector: 'app-battle-actors',
  templateUrl: './battle-actors.component.html',
  styleUrls: ['./battle-actors.component.css']
})
export class BattleActorsComponent implements OnInit {

  battleActors: BattleActor[];

  constructor(private actorService: ActorService) {
    this.battleActors = [];

    for(let actor of actorService.getActors()) {
      this.battleActors.push(new BattleActor(actor))
    }
  }

  ngOnInit(): void {
  }

}
