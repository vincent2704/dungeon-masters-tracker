import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Actor } from "../../models/actor";
import {ActorService} from "../../services/actor/actor.service";
import {Settings} from "../../services/settings/settings";
import {Monster} from "../../models/monsters/monster";

@Component({
  selector: 'app-prepare-battle',
  templateUrl: './prepare-battle.component.html',
  styleUrls: ['./prepare-battle.component.css']
})
export class PrepareBattleComponent implements OnInit {

  @Output()
  actorsToEmit = new EventEmitter<Actor[]>();
  @Output()
  battleStartedEmitter = new EventEmitter<Map<Monster, number>>();

  actors: Actor[];

  constructor(private actorService: ActorService) {
    if(Settings.isAutoLoadProtagonists()) {
      this.actors = actorService.getActors().slice();
    } else {
      this.actors = [];
    }
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

  startBattle() {
    this.battleStartedEmitter.emit();
  }
}
