import {Actor} from "../../models/actors/actor";
import {Monster} from "../../models/monsters/monster";
import {CombatData} from "../../models/combat-data/CombatData";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {Action} from "../../models/monsters/actions-and-traits/action";
import {DiceRoll} from "../../models/common/diceRoll";

export class CombatUtils {

  constructor() { }

  static getDailyXpBudget(characters: PlayerCharacter[]): number {
    let dailyXpTable = CombatData.ADVENTURING_DAY_XP;

    return characters.reduce((currentXp, character) => {
      return currentXp + dailyXpTable.get(character.level)!;
    }, 0);
  }

  public static throwDiceForAttackRoll(action: Action): string {
    if(!action.getDescription().getAttackModifier()) {
      return '';
    }
    const thrownValue = this.getRandomNumber(1, 20);
    if(thrownValue == 1) {
      return 'Critical fail!';
    }
    if(thrownValue == 20) {
      return 'Critical hit!';
    }
    return `${thrownValue + action.getDescription().getAttackModifier()}`;
  }

  static getEncounterMonsters(monsterList: Map<Monster, number>, hitPointsRule: MonsterHitPointsRule): Actor[] {
    let actorsToAdd: Actor[] = [];
    monsterList.forEach((count, monster) => {
      for (let i = 1; i <= count; i++) {
        let monsterHitPoints = monster.getDetails().getHitPoints();
        let monsterHP = hitPointsRule == MonsterHitPointsRule.FIXED
          ? monsterHitPoints.getHitPoints()
          : this.throwDice(monster.getDetails().getHitPoints());
        let battleParticipant = new Actor(`${monster.getBasicInfo().getName()}${i}`, monsterHP);
        battleParticipant.setDeathSavingThrowsEligibility(false);
        battleParticipant.setMonster(monster);
        actorsToAdd.push(battleParticipant)
      }
    })
    return actorsToAdd;
  }

  private static throwDice(diceRoll: DiceRoll): number {
    let hp = 0;
    for (let diceThrow = 1; diceThrow <= diceRoll.getDiceThrows(); diceThrow++) {
      let maxDieValueThrown = diceRoll.getDieType().getSides();
      hp += this.getRandomNumber(1, maxDieValueThrown)
    }
    hp += diceRoll.getStaticAdditionalHP();
    return hp;
  }

  private static getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export enum MonsterHitPointsRule {
  FIXED, THROW_DICE
}
