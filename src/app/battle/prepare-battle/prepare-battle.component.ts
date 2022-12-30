import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../models/actors/actor";
import {Monster} from "../../models/monsters/monster";
import {Encounter} from "../../models/encounter";
import {EncounterService} from "../../services/encounter/encounter.service";
import {BattleService} from "../../services/battle/battle.service";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {ActorService} from "../../services/actor/actor.service";

@Component({
  selector: 'app-prepare-battle',
  templateUrl: './prepare-battle.component.html',
  styleUrls: ['./prepare-battle.component.css']
})
export class PrepareBattleComponent implements OnInit {

  actors: Actor[] = [];

  // TODO: filter playerCharacters from Actors
  playerCharacters: PlayerCharacter[] = [];

  @Output()
  battleStartedEmitter = new EventEmitter<Map<Monster, number>>();

  encounters: Encounter[] = [];
  actorsToInitiativeMap: Map<Actor, number> = new Map<Actor, number>();

  constructor(private actorService: ActorService,
              private encounterService: EncounterService,
              private battleService: BattleService) {
  }

  ngOnInit(): void {
    this.actorService.getPlayerCharacters()
      .subscribe(
        response => {
          this.actors = this.mapResponseToActorsArray(response)
        },
        error => {
          console.log(error)
        })
    this.encounters = this.encounterService.getEncounters();
    for(let actor of this.actors) {
      this.actorsToInitiativeMap.set(actor, 1);
    }
  }

  removeActor(actor: Actor) {
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

  private mapResponseToActorsArray(playerCharacters: PlayerCharacter[]): Actor[] {
    return playerCharacters.map(character => {
      return this.actorService.fromJson(character)
    })
  }
}
