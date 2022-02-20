import {Component, OnInit } from '@angular/core';
import { Actor } from "../../models/actor";
import {ActorService} from "../../services/actor.service";

@Component({
  selector: 'app-prepare-battle',
  templateUrl: './prepare-battle.component.html',
  styleUrls: ['./prepare-battle.component.css']
})
export class PrepareBattleComponent implements OnInit {

  actors: Actor[]; //TODO: observable from ActorService?

  constructor(private actorService: ActorService) {
    this.actors = actorService.sortActorsByInitiative();
  }

  ngOnInit(): void {
  }

}
