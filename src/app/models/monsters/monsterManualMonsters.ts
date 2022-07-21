import {Monster} from "./monster";
import {MonsterId} from "./monsterId";
import {MonsterSize} from "./monsterSize";
import {MonsterType} from "./monsterType";
import {Alignment} from "../common/alignment";
import {AbilitySet} from "../common/ability/abilitySet";
import {MonsterTag} from "./monsterTag";
import {MonsterChallenge} from "./monsterChallenge";
import {SavingThrow} from "./savingThrow";
import {Ability} from "../common/ability/ability";
import {MonsterSkill} from "./monsterSkill";
import {Skill} from "../common/skill";

export class MonsterManualMonsters {

  static AARAKOCRA = new Monster(MonsterId.AARAKOCRA_ID,
    // 1st monster card section
    'Aarakocra', MonsterSize.MEDIUM, MonsterType.HUMANOID, [MonsterTag.AARAKOCRA], Alignment.NEUTRAL_GOOD,
    // 2
    12, 13, '20 ft., fly 50 ft.',
    // 3
    new AbilitySet(10, 14, 10, 11, 12, 11),
    // 4
    MonsterChallenge.TEN,
    [new SavingThrow(Ability.WISDOM, 9), new SavingThrow(Ability.CHARISMA, 9)],
    [new MonsterSkill(Skill.PERCEPTION, 5)],
  )

  static ABOLETH = new Monster(MonsterId.ABOLETH_ID,
    'Aboleth', MonsterSize.LARGE, MonsterType.ABERRATION, [], Alignment.LAWFUL_EVIL,
    17, 135, '10 ft., swim 40ft.',
    new AbilitySet(21, 9, 15, 18, 15, 18),
    MonsterChallenge.TEN,
    [new SavingThrow(Ability.CONSTITUTION, 6), new SavingThrow(Ability.INTELLIGENCE, 8),
      new SavingThrow(Ability.WISDOM, 6)],
    [new MonsterSkill(Skill.HISTORY, 12), new MonsterSkill(Skill.PERCEPTION, 10)]
  )

  static MONSTERS: Monster[] = [
    this.AARAKOCRA, this.ABOLETH
  ]

}
