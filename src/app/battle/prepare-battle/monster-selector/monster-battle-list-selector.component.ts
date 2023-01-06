import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../../models/actors/actor";
import {MonsterService} from "../../../services/monster/monster.service";
import {Monster} from "../../../models/monsters/monster";
import {Difficulty} from "../../../models/combat-data/Difficulty";
import {CombatDataService} from "../../../services/combat-data/combat-data.service";
import {CombatUtils, MonsterHitPointsRule} from "../../../services/combat/combatUtils";
import {PlayerCharacter} from "../../../models/actors/playerCharacter";
import {BattleParticipantType} from "../../../models/actors/battleParticipantType";

@Component({
  selector: 'app-monster-battle-list-selector',
  templateUrl: './monster-battle-list-selector.component.html',
  styleUrls: ['./monster-battle-list-selector.component.css']
})
export class MonsterBattleListSelectorComponent implements OnInit {

  monsterService: MonsterService;

  @Input()
  actors!: Actor[];
  @Output()
  battleStartEmitter = new EventEmitter<void>();
  @Output()
  monstersEmitter = new EventEmitter<Actor[]>();

  selectedMonsters: Map<Monster, number> = new Map<Monster, number>();
  randomizeMonstersHPCheckboxChecked: boolean = false;
  encounterDifficulty: Difficulty = Difficulty.NOT_APPLICABLE;

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

    this.monstersEmitter.emit(CombatUtils.getEncounterMonsters(
      this.selectedMonsters, monsterHitPointsRule));
    this.selectedMonsters.clear();
  }

  getDifficulty(): Difficulty {
    return this.encounterDifficulty;
  }

  getChallenge(monster: Monster): string {
    return monster.getBasicInfo().getChallengeRating().getChallengeFormatted();
  }

  addMonster(monster: Monster): void {
    let monsterCount = this.getMonsterCount(monster);
    this.selectedMonsters.set(monster, ++monsterCount);
    this.updateDifficulty();
  }

  subtractMonster(monster: Monster): void {
    let monsterCount = this.getMonsterCount(monster);
    if (monsterCount > 0) {
      this.selectedMonsters.set(monster, --monsterCount)
    }
    if (monsterCount === 0) {
      this.selectedMonsters.delete(monster);
    }
    this.updateDifficulty();
  }

  getMonsterCount(monster: Monster): number {
    let monsterCount = this.selectedMonsters.get(monster);
    if (!monsterCount) {
      return 0;
    }
    return monsterCount;
  }

  getTotalMonstersSelected(): number {
    return Array.from(this.selectedMonsters.values())
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue
      }, 0);
  }

  updateDifficulty(): void {
    this.encounterDifficulty = CombatDataService.getDifficulty(
      this.mapActorsToPlayerCharacters(), this.getMonsterExperiencePointsSum(), this.getTotalMonstersSelected());
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

  private mapActorsToPlayerCharacters(): PlayerCharacter[] {
    return this.actors.filter(actor => actor.getType() == BattleParticipantType.PLAYER_CHARACTER)
      .map(playerActor => {
        return {
          level: playerActor.getLevel()
        } as PlayerCharacter
      })
  }

}
