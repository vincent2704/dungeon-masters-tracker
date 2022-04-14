import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Actor } from "../../models/actor";
import {ActorService} from "../../services/actor.service";

@Component({
  selector: 'app-prepare-battle',
  templateUrl: './prepare-battle.component.html',
  styleUrls: ['./prepare-battle.component.css']
})
export class PrepareBattleComponent implements OnInit {

  @Output()
  actorsToEmit = new EventEmitter<Actor[]>();

  actors: Actor[];

  constructor(private actorService: ActorService) {
    this.actors = actorService.getActors().slice();
  }

  ngOnInit(): void {
  }

  removeActor(actor: Actor) {
    this.actorsToEmit.emit(this.actors)
    this.actors.splice(this.actors.indexOf(actor), 1);
  }

  addActor(actor: Actor) {
    this.actors.push(actor);
  }
}
