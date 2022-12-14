import {CombatUtils, MonsterHitPointsRule} from './combatUtils';
import {Monster} from "../../models/monsters/monster";
import {MonsterList} from "../../models/monsters/monsterList";
import {Actor} from "../../models/actors/actor";

describe('CombatUtils', () => {

  it('should proper daily budget for characters', () => {
    // given
    let actor1 = new Actor('Actor 1', 10);
    let actor2 = new Actor('Actor 2', 10);
    let actor3 = new Actor('Actor 3', 10);
    let actor4 = new Actor('Actor 4', 10);

    actor1.setLevel(3);
    actor2.setLevel(2);
    actor3.setLevel(4);
    actor4.setLevel(3);

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
    one.setDeathSavingThrowsEligibility(false);
    let two = new Actor(`Zombie2`, 22)
    two.setDeathSavingThrowsEligibility(false);
    let three = new Actor(`Werewolf1`, 58)
    three.setDeathSavingThrowsEligibility(false);

    let expectedList = [one, two, three]

    expect(result).toEqual(expectedList)
  });

});
