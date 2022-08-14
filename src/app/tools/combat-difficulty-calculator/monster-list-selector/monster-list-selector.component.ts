import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../../models/actor";
import {MonsterService} from "../../../services/monster/monster.service";
import {Monster} from "../../../models/monsters/monster";
import {CombatDataService} from "../../../services/combat-data/combat-data.service";
import {Difficulty} from "../../../models/combat-data/Difficulty";
import {EncounterService} from "../../../services/encounter/encounter.service";
import {Encounter} from "../../../models/encounter";

@Component({
  selector: 'app-monster-list-selector',
  templateUrl: './monster-list-selector.component.html',
  styleUrls: ['./monster-list-selector.component.css']
})
export class MonsterListSelectorComponent implements OnInit {

  @Input()
  participatingActors!: Actor[];
  monsterService: MonsterService;

  selectedMonsters: Map<Monster, number> = new Map<Monster, number>();

  encounterName: string = '';
  encounterDescription: string = '';

  constructor(monsterService: MonsterService, private encounterService: EncounterService) {
    this.monsterService = monsterService;
  }

  ngOnInit(): void {
  }

  getDifficulty(): Difficulty {
    return CombatDataService.getDifficulty(
      this.participatingActors, this.getMonsterExperiencePointsSum(), this.getTotalMonstersSelected());
  }

  getTotalMonstersSelected(): number {
    return Array.from(this.selectedMonsters.values())
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue
      }, 0);
  }

  getChallenge(monster: Monster): string {
    return monster.getBasicInfo().getChallengeRating().getChallengeFormatted();
  }

  addMonster(monster: Monster): void {
    let monsterCount = this.getMonsterCount(monster);
    this.selectedMonsters.set(monster, ++monsterCount)
  }

  subtractMonster(monster: Monster): void {
    let monsterCount = this.getMonsterCount(monster);
    if (monsterCount > 0) {
      this.selectedMonsters.set(monster, --monsterCount)
    }
    if(monsterCount === 0){
      this.selectedMonsters.delete(monster);
    }
  }

  getMonsterCount(monster: Monster): number {
    let monsterCount = this.selectedMonsters.get(monster);
    if (!monsterCount) {
      return 0;
    }
    return monsterCount;
  }

  onSaveEncounter() {
    if(this.encounterName.length > 0 && this.selectedMonsters.size > 0 ) {
      this.encounterService.addEncounter(
        new Encounter(this.encounterName, this.selectedMonsters, this.encounterDescription));
      this.encounterName = '';
      this.encounterDescription = '';
      this.selectedMonsters.clear();
    }
  }

  private getMonsterExperiencePointsSum(): number {
    if (this.getTotalMonstersSelected() === 0) {
      return 0;
    }
    let totalXp = 0;
    this.selectedMonsters.forEach((count, monster) => {
      let totalXpFromMonster = monster.getBasicInfo().getChallengeRating().getExperiencePoints() * count;
      totalXp += totalXpFromMonster;
    });
    return totalXp;
  }

}
