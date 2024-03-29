import {Component, OnInit} from '@angular/core';
import {ActorService} from "../../services/actor/actor.service";
import {Encounter} from "../../models/encounter";
import {EncounterService} from "../../services/encounter/encounter.service";
import {PlayerCharacter} from "../../models/actors/playerCharacter";

@Component({
  selector: 'app-combat-difficulty-calculator',
  templateUrl: './combat-difficulty-calculator.component.html',
  styleUrls: ['./combat-difficulty-calculator.component.css']
})
export class CombatDifficultyCalculatorComponent implements OnInit {

  protagonists: PlayerCharacter[];
  actorsSelectionStatusMap: Map<PlayerCharacter, boolean>;
  participatingActors: PlayerCharacter[] = [];
  encounters: Encounter[] = [];

  constructor(private actorService: ActorService, private encounterService: EncounterService) {
    this.actorsSelectionStatusMap = new Map<PlayerCharacter, boolean>();
    this.protagonists = []
  }

  ngOnInit(): void {
    this.actorService.getPlayerCharacters()
      .subscribe((playerCharacters) => {
        this.protagonists = playerCharacters;
      })
    this.protagonists.forEach(actor => {
      this.actorsSelectionStatusMap.set(actor, true);
    })
    // this is needed or the child components participating actors would be empty at start
    this.actorsSelectionStatusMap.forEach((isSelected, actor) => {
      if(isSelected) {
        this.participatingActors.push(actor);
      }
    })
    this.encounters = this.encounterService.getEncounters();
  }

  onSelectActor(actor: PlayerCharacter) {
    let selected = this.actorsSelectionStatusMap.get(actor);
    this.actorsSelectionStatusMap.set(actor, !selected);

    // TODO: this works but is actually stupid, needs refactor later
    this.participatingActors = [];
    this.actorsSelectionStatusMap.forEach((isSelected, actor) => {
      if(isSelected) {
        this.participatingActors.push(actor);
      }
    })
  }

  isSelected(actor: PlayerCharacter): boolean {
    return this.actorsSelectionStatusMap.get(actor)!;
  }

  deleteEncounter(encounter: Encounter): void {
    this.encounterService.deleteEncounter(encounter);
  }
}
