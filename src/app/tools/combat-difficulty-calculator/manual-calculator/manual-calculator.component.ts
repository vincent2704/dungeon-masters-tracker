import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../../models/actor";
import {CombatDataService} from "../../../services/combat-data/combat-data.service";

@Component({
  selector: 'app-manual-calculator',
  templateUrl: './manual-calculator.component.html',
  styleUrls: ['./manual-calculator.component.css']
})
export class ManualCalculatorComponent implements OnInit {

  @Input()
  selectedActors!: Map<Actor, boolean>;

  monsterXp: string = '';
  monsterCount: string = '';
  difficultyDescription: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.monsterXp || !this.monsterCount) {
      this.difficultyDescription = 'Invalid input';
      return;
    }
    let selectedActors: Actor[] = [];
    for(let [actor, isSelected] of this.selectedActors) {
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
    let difficulty = CombatDataService.getDifficulty(selectedActors, monsterXp, monsterCount);
    this.difficultyDescription = `Predicted difficulty: ${difficulty.getDescription()}`;
  }

}
