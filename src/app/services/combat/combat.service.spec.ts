import {CombatUtils, MonsterHitPointsRule} from './combatUtils';
import {Monster} from "../../models/monsters/monster";
import {MonsterList} from "../../models/monsters/monsterList";
import {Actor} from "../../models/actor";

describe('CombatService', () => {

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
    one.setDeathSavingThrowsEligibility(false);
    let two = new Actor(`Zombie2`, 22)
    two.setDeathSavingThrowsEligibility(false);
    let three = new Actor(`Werewolf1`, 58)
    three.setDeathSavingThrowsEligibility(false);

    let expectedList = [one, two, three]

    expect(result).toEqual(expectedList)
  });

});
