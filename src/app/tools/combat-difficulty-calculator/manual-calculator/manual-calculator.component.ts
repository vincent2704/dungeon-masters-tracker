import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../../models/actor";
import {CombatDataService} from "../../../services/combat-data/combat-data.service";
import {Difficulty} from "../../../models/combat-data/Difficulty";

@Component({
  selector: 'app-manual-calculator',
  templateUrl: './manual-calculator.component.html',
  styleUrls: ['./manual-calculator.component.css']
})
export class ManualCalculatorComponent implements OnInit {

  @Input()
  participatingActors!: Actor[];

  monsterXp: string = '';
  monsterCount: string = '';
  difficultyDescription: string = '';
  difficulty: Difficulty = Difficulty.NOT_APPLICABLE;

  constructor() {
  }

  ngOnInit(): void {
  }

  getDifficulty(): void {
    this.difficulty = CombatDataService.getDifficulty(
      this.participatingActors, parseInt(this.monsterXp), parseInt(this.monsterCount));
  }
}
