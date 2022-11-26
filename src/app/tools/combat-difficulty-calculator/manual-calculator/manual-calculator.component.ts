import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../../models/actor";
import {CombatDataService} from "../../../services/combat-data/combat-data.service";
import {Difficulty} from "../../../models/combat-data/Difficulty";
import {CombatUtils} from "../../../services/combat/combatUtils";

@Component({
  selector: 'app-manual-calculator',
  templateUrl: './manual-calculator.component.html',
  styleUrls: ['./manual-calculator.component.css']
})
export class ManualCalculatorComponent implements OnInit {

  @Input()
  participatingCharacters!: Actor[];

  monsterXp: string = '';
  monsterCount: string = '';
  totalDailyXpBudget = 0;
  difficulty: Difficulty = Difficulty.NOT_APPLICABLE;

  constructor() {
  }

  ngOnInit(): void {
    this.totalDailyXpBudget = CombatUtils.getDailyXpBudget(this.participatingCharacters);
  }

  getDifficulty(): void {
    this.difficulty = CombatDataService.getDifficulty(
      this.participatingCharacters, parseInt(this.monsterXp), parseInt(this.monsterCount));
  }
}
