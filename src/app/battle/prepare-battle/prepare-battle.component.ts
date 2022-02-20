import {Component, OnInit } from '@angular/core';
import { Actor } from "../../models/actor";
import {ActorService} from "../../services/actor.service";

@Component({
  selector: 'app-prepare-battle',
  templateUrl: './prepare-battle.component.html',
  styleUrls: ['./prepare-battle.component.css']
})
export class PrepareBattleComponent implements OnInit {

  battleActors: Actor[]; //TODO: observable from BattleActorService?

  constructor(private battleActorService: ActorService) {
    this.battleActors = battleActorService.sortActorsByInitiative();
  }

  ngOnInit(): void {
  }

}
