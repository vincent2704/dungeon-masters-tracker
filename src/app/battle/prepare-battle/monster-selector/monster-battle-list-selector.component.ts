import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../../models/actor";
import {MonsterService} from "../../../services/monster/monster.service";
import {Monster} from "../../../models/monsters/monster";
import {Difficulty} from "../../../models/combat-data/Difficulty";
import {CombatDataService} from "../../../services/combat-data/combat-data.service";

@Component({
  selector: 'app-monster-battle-list-selector',
  templateUrl: './monster-battle-list-selector.component.html',
  styleUrls: ['./monster-battle-list-selector.component.css']
})
export class MonsterBattleListSelectorComponent implements OnInit {

  @Input()
  participatingActors!: Actor[];
  monsterService: MonsterService;

  @Output()
  battleStartEmitter = new EventEmitter<void>();
  @Output()
  monstersEmitter = new EventEmitter<Map<Monster, number>>();

  selectedMonstersCount: Map<Monster, number> = new Map<Monster, number>();

  constructor(monsterService: MonsterService) {
    this.monsterService = monsterService;
  }

  ngOnInit(): void {
  }

  startBattle(): void {
    this.battleStartEmitter.emit();
  }

  addMonstersToBattle() {
    this.monstersEmitter.emit(this.selectedMonstersCount);
    this.selectedMonstersCount.clear();
  }

  getDifficulty(): Difficulty {
    return CombatDataService.getDifficulty(
      this.participatingActors, this.getMonsterExperiencePointsSum(), this.getTotalMonstersSelected());
  }

  getChallenge(monster: Monster): string {
    return monster.getChallenge().getChallengeFormatted();
  }

  addMonster(monster: Monster): void {
    let monsterCount = this.getMonsterCount(monster);
    this.selectedMonstersCount.set(monster, ++monsterCount);
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

  getTotalMonstersSelected(): number {
    return Array.from(this.selectedMonstersCount.values())
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue
      }, 0);
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
