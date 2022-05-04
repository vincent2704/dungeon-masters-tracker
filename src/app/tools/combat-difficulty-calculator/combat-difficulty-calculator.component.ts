import {Component, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";
import {PROTAGONISTS} from "../../models/dummy-backend-data/actorsData";
import {CombatDataService} from "../../services/combat-data/combat-data.service";

@Component({
  selector: 'app-combat-difficulty-calculator',
  templateUrl: './combat-difficulty-calculator.component.html',
  styleUrls: ['./combat-difficulty-calculator.component.css']
})
export class CombatDifficultyCalculatorComponent implements OnInit {

  protagonists: Actor[] = PROTAGONISTS;
  actorsSelected: Map<Actor, boolean> = new Map<Actor, boolean>();

  monsterXp: string = '';
  monsterCount: string = '';
  difficultyDescription: string = '';

  constructor(private combatDataService: CombatDataService) {
    this.protagonists.forEach(actor => {
      this.actorsSelected.set(actor, true);
    })
  }

  ngOnInit(): void {
  }

  onSelectActor(actor: Actor) {
    let selected = this.actorsSelected.get(actor);
    this.actorsSelected.set(actor, !selected);
  }

  isSelected(actor: Actor): boolean {
    return this.actorsSelected.get(actor)!;
  }

  onSubmit() {
    if(!this.monsterXp || !this.monsterCount) {
      this.difficultyDescription = 'Invalid input';
      return;
    }
    let selectedActors: Actor[] = [];
    for(let [actor, isSelected] of this.actorsSelected) {
      if(isSelected) {
        selectedActors.push(actor);
      }
    }

    let monsterXp = parseInt(this.monsterXp);
    let monsterCount = parseInt(this.monsterCount);

    if(monsterXp < 1 || monsterCount < 1) {
      this.difficultyDescription = 'Invalid input';
      return;
    }
    let difficulty = this.combatDataService.getDifficulty(selectedActors, monsterXp, monsterCount);
    this.difficultyDescription = `Predicted difficulty: ${difficulty.getDescription()}`;
  }

}
