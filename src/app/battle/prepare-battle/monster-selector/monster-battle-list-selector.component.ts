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
    let monsterActors: Actor[] = [];

    this.selectedMonstersCount.forEach((monsterCount, monster) => {
      for (let i = 1; i <= monsterCount; i++) {
        let monsterHitPoints = monster.getHitPoints();
        let monsterHP = this.randomizeMonstersHPCheckboxChecked
          ? this.randomizeMonstersHP(monster)
          : monsterHitPoints.getHitPoints();
        let battleParticipant = new Actor(`${monster.getName()}${i}`, monsterHP);
        battleParticipant.setDeathSavingThrowsEligibility(false);
        monsterActors.push(battleParticipant)
      }
    })

    this.monsterActorsEmitter.emit(monsterActors);
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

  private randomizeMonstersHP(monster: Monster): number {
    let hp = 0;
    let monsterHitPoints = monster.getHitPoints();
    // "throws" dice based on monster's Hit Points dice
    for (let diceThrow = 1; diceThrow <= monsterHitPoints.getDiceThrows(); diceThrow++) {
      let maxDieValueThrown = monsterHitPoints.getDieType().getSides();
      hp += this.getRandomNumber(1, maxDieValueThrown)
    }
    hp += monsterHitPoints.getStaticAdditionalHP();
    return hp;
  }

  private getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
