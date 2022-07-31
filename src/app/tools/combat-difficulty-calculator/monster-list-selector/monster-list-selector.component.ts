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

  selectedMonstersCount: Map<Monster, number> = new Map<Monster, number>();

  constructor(monsterService: MonsterService) {
    this.monsterService = monsterService;
  }

  ngOnInit(): void {
  }

  getDifficulty(): Difficulty {
    if(this.getTotalMonstersSelected() === 0 ) {
      return Difficulty.EASY;
    }
    return CombatDataService.getDifficulty(
      this.participatingActors, this.getMonsterExperiencePointsSum(), this.getTotalMonstersSelected());
  }

  getTotalMonstersSelected(): number {
    return Array.from(this.selectedMonstersCount.values())
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue
      }, 0);
  }

  getChallenge(monster: Monster): string {
    return monster.getChallenge().getChallengeFormatted();
  }

  addMonster(monster: Monster): void {
    let monsterCount = this.getMonsterCount(monster);
    this.selectedMonstersCount.set(monster, ++monsterCount)
  }

  subtractMonster(monster: Monster): void {
    let monsterCount = this.getMonsterCount(monster);
    if (monsterCount > 0) {
      this.selectedMonstersCount.set(monster, --monsterCount)
    }
    if(monsterCount === 0){
      this.selectedMonstersCount.delete(monster);
    }
  }

  getMonsterCount(monster: Monster): number {
    let monsterCount = this.selectedMonstersCount.get(monster);
    if (!monsterCount) {
      return 0;
    }
    return monsterCount;
  }

  private getMonsterExperiencePointsSum(): number {
    if (this.getTotalMonstersSelected() === 0) {
      return 0;
    }
    let totalXp = 0;
    this.selectedMonstersCount.forEach((count, monster) => {
      let totalXpFromMonster = monster.getChallenge().getExperiencePoints() * count;
      totalXp += totalXpFromMonster;
    });
    return totalXp;
  }

}
