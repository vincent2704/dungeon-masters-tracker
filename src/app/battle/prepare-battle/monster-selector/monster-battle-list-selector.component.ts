import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../../models/actor";
import {MonsterService} from "../../../services/monster/monster.service";
import {Monster} from "../../../models/monsters/monster";
import {Difficulty} from "../../../models/combat-data/Difficulty";
import {CombatDataService} from "../../../services/combat-data/combat-data.service";
import {CombatService, MonsterHitPointsRule} from "../../../services/combat/combat.service";

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
  monsterActorsEmitter = new EventEmitter<Actor[]>();

  selectedMonstersCount: Map<Monster, number> = new Map<Monster, number>();
  randomizeMonstersHPCheckboxChecked: boolean = false;

  constructor(monsterService: MonsterService) {
    this.monsterService = monsterService;
  }

  ngOnInit(): void {
  }

  startBattle(): void {
    this.battleStartEmitter.emit();
  }

  addMonstersToBattle() {
    let monsterHitPointsRule = this.randomizeMonstersHPCheckboxChecked
      ? MonsterHitPointsRule.THROW_DICE
      : MonsterHitPointsRule.FIXED;

    this.monsterActorsEmitter.emit(CombatService.getEncounterMonsters(
      this.selectedMonstersCount, monsterHitPointsRule));
    this.selectedMonstersCount.clear();
  }

  getDifficulty(): Difficulty {
    return CombatDataService.getDifficulty(
      this.participatingActors, this.getMonsterExperiencePointsSum(), this.getTotalMonstersSelected());
  }

  getChallenge(monster: Monster): string {
    return monster.getBasicInfo().getChallengeRating().getChallengeFormatted();
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
    if (monsterCount === 0) {
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
      let totalXpFromMonster = monster.getBasicInfo().getChallengeRating().getExperiencePoints() * count;
      totalXp += totalXpFromMonster;
    });
    return totalXp;
  }

}
