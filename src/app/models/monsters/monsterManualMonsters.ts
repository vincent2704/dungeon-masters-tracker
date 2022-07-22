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
import {DamageType} from "./damageType";
import {DamageResistances} from "./damageResistances";
import {Condition} from "../Condition";
import {MonsterSenses} from "./monsterSenses";
import {MonsterSense} from "./monsterSense";
import {Sense} from "../common/sense";
import {MonsterLanguages} from "./monsterLanguages";
import {Language} from "../common/language";

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
    undefined, undefined,
    new MonsterSenses([], [new MonsterSkill(Skill.PERCEPTION, 15)]),
    new MonsterLanguages([Language.AURAN])
  )

  static ABOLETH = new Monster(MonsterId.ABOLETH_ID,
    'Aboleth', MonsterSize.LARGE, MonsterType.ABERRATION, [], Alignment.LAWFUL_EVIL,
    17, 135, '10 ft., swim 40ft.',
    new AbilitySet(21, 9, 15, 18, 15, 18),
    MonsterChallenge.TEN,
    [new SavingThrow(Ability.CONSTITUTION, 6), new SavingThrow(Ability.INTELLIGENCE, 8),
      new SavingThrow(Ability.WISDOM, 6)],
    [new MonsterSkill(Skill.HISTORY, 12), new MonsterSkill(Skill.PERCEPTION, 10)],
    undefined, undefined,
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, '120 ft.')], [new MonsterSkill(Skill.PERCEPTION, 20)]),
    new MonsterLanguages([Language.DEEP_SPEECH], '120 ft.')
  )

  static DEVA = new Monster(MonsterId.DEVA_ID,
    'Deva', MonsterSize.MEDIUM, MonsterType.CELESTIAL, [], Alignment.LAWFUL_GOOD,
    17, 136, '30 ft., fly 90 ft.',
    new AbilitySet(18, 18, 18, 17, 20, 20),
    MonsterChallenge.TEN,
    [new SavingThrow(Ability.WISDOM, 9), new SavingThrow(Ability.CHARISMA, 9)],
    [new MonsterSkill(Skill.INSIGHT, 7), new MonsterSkill(Skill.PERCEPTION, 9)],
    new DamageResistances([DamageType.RADIANT], [DamageType.BLUDGEONING, DamageType.PIERCING,
      DamageType.SLASHING]),
    [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED],
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, '120 ft.')], [new MonsterSkill(Skill.PERCEPTION, 19)]),
    new MonsterLanguages([Language.ALL], '120 ft.')
  )

  static MONSTERS: Monster[] = [
    this.AARAKOCRA, this.ABOLETH, this.DEVA
  ]

}
