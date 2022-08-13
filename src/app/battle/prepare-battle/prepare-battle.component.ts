import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Actor} from "../../models/actor";
import {ActorService} from "../../services/actor/actor.service";
import {Settings} from "../../services/settings/settings";
import {Monster} from "../../models/monsters/monster";
import {Encounter} from "../../models/encounter";
import {EncounterService} from "../../services/encounter/encounter.service";

@Component({
  selector: 'app-prepare-battle',
  templateUrl: './prepare-battle.component.html',
  styleUrls: ['./prepare-battle.component.css']
})
export class PrepareBattleComponent implements OnInit {

  @Output()
  actorsEmitter = new EventEmitter<Actor[]>();
  @Output()
  battleStartedEmitter = new EventEmitter<Map<Monster, number>>();

  actors: Actor[];
  encounters: Encounter[] = [];

  constructor(private actorService: ActorService, private encounterService: EncounterService) {
    if (Settings.isAutoLoadProtagonists()) {
      this.actors = actorService.getActors().slice();
    } else {
      this.actors = [];
    }
  }

  ngOnInit(): void {
    this.encounters = this.encounterService.getEncounters();
  }

  removeActor(actor: Actor) {
    this.actorsEmitter.emit(this.actors)
    this.actors.splice(this.actors.indexOf(actor), 1);
  }

  addActor(actor: Actor) {
    this.actors.push(actor);
  }

  startBattle() {
    this.battleStartedEmitter.emit();
  }

  addMonstersToBattle(monstersToAdd: Actor[]) {
    for (let monster of monstersToAdd) {
      this.actors.push(monster);
    }
  }
}
