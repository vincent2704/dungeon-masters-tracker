import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../models/actor";
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

  @Input()
  actors!: Actor[];

  @Output()
  actorsEmitter = new EventEmitter<Actor[]>();
  @Output()
  battleStartedEmitter = new EventEmitter<Map<Monster, number>>();

  encounters: Encounter[] = [];
  actorsToInitiativeMap: Map<Actor, number> = new Map<Actor, number>();

  constructor(private encounterService: EncounterService,
              private battleService: BattleService) {
  }

  ngOnInit(): void {
    this.encounters = this.encounterService.getEncounters();
    for(let actor of this.actors) {
      this.actorsToInitiativeMap.set(actor, 1);
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

  addActor(actorInitiativePair: [playerCharacter: Actor, initiative: number]) {
    this.actors.push(actorInitiativePair[0]);
    this.actorsToInitiativeMap.set(actorInitiativePair[0], actorInitiativePair[1]);
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

  getInitiativeForActor(actor: Actor): number {
    let initiative = this.actorsToInitiativeMap.get(actor)
    if(initiative) {
      return initiative
    }
    return 0;
  }
}
