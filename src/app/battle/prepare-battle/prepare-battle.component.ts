import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Actor} from "../../models/actor";
import {ActorService} from "../../services/actor/actor.service";
import {Settings} from "../../services/settings/settings";
import {Monster} from "../../models/monsters/monster";
import {Encounter} from "../../models/encounter";
import {EncounterService} from "../../services/encounter/encounter.service";
import {BattleService} from "../../services/battle/battle.service";

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

  actors: Actor[] = [];
  encounters: Encounter[] = [];
  actorsToInitiativeMap: Map<Actor, number> = new Map<Actor, number>();

  constructor(private actorService: ActorService, private encounterService: EncounterService,
              private battleService: BattleService) {
  }

  ngOnInit(): void {
    this.encounters = this.encounterService.getEncounters();
    if (Settings.isAutoLoadProtagonists()) {
      this.actorService.getPlayerCharacters()
        .subscribe((playerCharacters) => {
          this.actors = playerCharacters;
          for(let pc of playerCharacters) {
            this.actorsToInitiativeMap.set(pc, 1);
          }
        })
    }
  }

  removeActor(actor: Actor) {
    this.actorsEmitter.emit(this.actors)
    this.actors.splice(this.actors.indexOf(actor), 1);
  }

  setActorInitiative(actor: Actor, event: any) {
    const inputValue = event.target.value
    this.actorsToInitiativeMap.set(actor, inputValue);
  }

  addActor(actor: Actor) {
    this.actors.push(actor);
  }

  startBattle() {
    this.battleService.setActorsMap(this.actorsToInitiativeMap);
    this.battleStartedEmitter.emit();
  }

  addMonstersToBattle(monstersToAdd: Actor[]) {
    for (let monster of monstersToAdd) {
      this.actors.push(monster);
    }
  }
}
