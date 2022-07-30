import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../../models/actor";
import {MonsterService} from "../../../services/monster/monster.service";
import {Monster} from "../../../models/monsters/monster";
import {CombatDataService} from "../../../services/combat-data/combat-data.service";
import {Difficulty} from "../../../models/combat-data/Difficulty";

@Component({
  selector: 'app-monster-list-selector',
  templateUrl: './monster-list-selector.component.html',
  styleUrls: ['./monster-list-selector.component.css']
})
export class MonsterListSelectorComponent implements OnInit {

  @Input()
  participatingActors!: Actor[];
  monsterService: MonsterService;

  selectedMonsters: Monster[] = [];

  constructor(monsterService: MonsterService, private combatDataService: CombatDataService) {
    this.monsterService = monsterService;
  }

  ngOnInit(): void {
  }

  getChallenge(monster: Monster): string {
    return monster.getChallenge().getChallengeFormatted();
  }

  addMonster(monster: Monster): void {
    this.selectedMonsters.push(monster);
  }

  subtractMonster(monster: Monster): void {
    this.selectedMonsters.splice(this.selectedMonsters.indexOf(monster), 1);
  }

  getDifficulty(): Difficulty {
    return this.combatDataService.getDifficulty(
      this.participatingActors, this.getMonsterExperiencePointsSum(), this.selectedMonsters.length);
  }

  getMonsterExperiencePointsSum(): number {
    if(this.selectedMonsters.length == 0) {
      return 0;
    }
    return this.selectedMonsters.map(monster => monster.getChallenge().getExperiencePoints())
      .reduce((previous, currentValue) => previous + currentValue);
  }
}
