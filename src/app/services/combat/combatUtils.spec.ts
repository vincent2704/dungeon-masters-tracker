import {CombatUtils, MonsterHitPointsRule} from './combatUtils';
import {Monster} from "../../models/monsters/monster";
import {MonsterList} from "../../models/monsters/monsterList";
import {Actor} from "../../models/actors/actor";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {Action} from "../../models/monsters/actions-and-traits/action";

describe('CombatUtils', () => {

  it('should proper daily budget for characters', () => {
    // given
    let actor1: PlayerCharacter = {
      name: '1',
      maxHp: 1,
      level: 3
    }
    let actor2: PlayerCharacter = {
      name: '2',
      maxHp: 2,
      level: 2
    }
    let actor3: PlayerCharacter = {
      name: '3',
      maxHp: 3,
      level: 4
    }
    let actor4: PlayerCharacter = {
      name: '4',
      maxHp: 4,
      level: 3
    }

    let playerCharacters = [actor1, actor2, actor3, actor4]

    // then
    expect(CombatUtils.getDailyXpBudget(playerCharacters)).toEqual(4700);
  });

  it('should return monsters based on encounter monsters', () => {
    // given
    let monsterList = new Map<Monster, number>([
      [MonsterList.ZOMBIE, 2],
      [MonsterList.WEREWOLF, 1],
    ]);

    // when
    let result = CombatUtils.getEncounterMonsters(monsterList, MonsterHitPointsRule.FIXED);

    // then
    let one = new Actor(`Zombie1`, 22)
    one.setMonster(MonsterList.ZOMBIE)
    one.setDeathSavingThrowsEligibility(false);
    let two = new Actor(`Zombie2`, 22)
    two.setMonster(MonsterList.ZOMBIE)
    two.setDeathSavingThrowsEligibility(false);
    let three = new Actor(`Werewolf1`, 58)
    three.setMonster(MonsterList.WEREWOLF)
    three.setDeathSavingThrowsEligibility(false);

    let expectedList = [one, two, three]

    expect(result).toEqual(expectedList)
  });

  it('should randomize attack rolls', () => {
    const action1 = Action.ANIMATED_ARMOR_ACTIONS[0] // no modifier
    const action2 = Action.ANIMATED_ARMOR_ACTIONS[1] // +4 to hit

    expect(CombatUtils.throwDiceForAttackRoll(action1)).toEqual('');
    expect(CombatUtils.throwDiceForAttackRoll(action2)).not.toEqual('');
  });

});
