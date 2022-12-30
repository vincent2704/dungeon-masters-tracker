import {Actor} from "../../models/actors/actor";
import {Monster} from "../../models/monsters/monster";
import {CombatData} from "../../models/combat-data/CombatData";
import {PlayerCharacter} from "../../models/actors/playerCharacter";

export class CombatUtils {

  constructor() { }

  static getDailyXpBudget(characters: PlayerCharacter[]): number {
    let dailyXpTable = CombatData.ADVENTURING_DAY_XP;

    return characters.reduce((currentXp, character) => {
      return currentXp + dailyXpTable.get(character.level)!;
    }, 0);
  }

  static getEncounterMonsters(monsterList: Map<Monster, number>, hitPointsRule: MonsterHitPointsRule): Actor[] {
    let actorsToAdd: Actor[] = [];
    monsterList.forEach((count, monster) => {
      for (let i = 1; i <= count; i++) {
        let monsterHitPoints = monster.getDetails().getHitPoints();
        let monsterHP = hitPointsRule == MonsterHitPointsRule.FIXED
          ? monsterHitPoints.getHitPoints()
          : this.throwDiceForHitPoints(monster);
        let battleParticipant = new Actor(`${monster.getBasicInfo().getName()}${i}`, monsterHP);
        battleParticipant.setDeathSavingThrowsEligibility(false);
        actorsToAdd.push(battleParticipant)
      }
    })
    return actorsToAdd;
  }

  private static throwDiceForHitPoints(monster: Monster): number {
    let hp = 0;
    let monsterHitPoints = monster.getDetails().getHitPoints();
    for (let diceThrow = 1; diceThrow <= monsterHitPoints.getDiceThrows(); diceThrow++) {
      let maxDieValueThrown = monsterHitPoints.getDieType().getSides();
      hp += this.getRandomNumber(1, maxDieValueThrown)
    }
    hp += monsterHitPoints.getStaticAdditionalHP();
    return hp;
  }

  private static getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export enum MonsterHitPointsRule {
  FIXED, THROW_DICE
}
