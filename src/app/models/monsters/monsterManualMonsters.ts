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
import {SpecialTrait} from "./actions-and-traits/specialTrait";
import {Action} from "./actions-and-traits/action";
import {Reaction} from "./actions-and-traits/reaction";
import {LegendaryAction} from "./actions-and-traits/legendaryAction";
import {MonsterSpeed} from "./monsterSpeed";
import {MonsterHitPoints} from "./monsterHitPoints";
import {MonsterArmor} from "./monsterArmor";
import {MonsterEquipment} from "./monsterEquipment";

export class MonsterManualMonsters {

  static AARAKOCRA = new Monster(MonsterId.AARAKOCRA_ID,
    // 1st monster card section
    'Aarakocra', MonsterSize.MEDIUM, MonsterType.HUMANOID, [MonsterTag.AARAKOCRA], Alignment.NEUTRAL_GOOD,
    // 2
    new MonsterArmor(12), new MonsterHitPoints(13, 3, 8), new MonsterSpeed(20, 50),
    // 3
    new AbilitySet(10, 14, 10, 11, 12, 11),
    // 4
    MonsterChallenge.ONE_FOURTH,
    [new SavingThrow(Ability.WISDOM, 9), new SavingThrow(Ability.CHARISMA, 9)],
    [new MonsterSkill(Skill.PERCEPTION, 5)],
    undefined, undefined,
    new MonsterSenses([], [new MonsterSkill(Skill.PERCEPTION, 15)]),
    new MonsterLanguages([Language.AURAN]),
    [SpecialTrait.DIVE_ATTACK],
    Action.AARAKOCRA_ACTIONS
  )

  static ABOLETH = new Monster(MonsterId.ABOLETH_ID,
    'Aboleth', MonsterSize.LARGE, MonsterType.ABERRATION, [], Alignment.LAWFUL_EVIL,
    new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR]), new MonsterHitPoints(135, 18, 10, 36), new MonsterSpeed(10, 0, 40),
    new AbilitySet(21, 9, 15, 18, 15, 18),
    MonsterChallenge.TEN,
    [new SavingThrow(Ability.CONSTITUTION, 6), new SavingThrow(Ability.INTELLIGENCE, 8),
      new SavingThrow(Ability.WISDOM, 6)],
    [new MonsterSkill(Skill.HISTORY, 12), new MonsterSkill(Skill.PERCEPTION, 10)],
    undefined, undefined,
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], [new MonsterSkill(Skill.PERCEPTION, 20)]),
    new MonsterLanguages([Language.DEEP_SPEECH], 120),
    [SpecialTrait.AMPHIBIOUS, SpecialTrait.MUCOUS_CLOUD, SpecialTrait.PROBING_TELEPATHY],
    Action.ABOLETH_ACTIONS, [], LegendaryAction.ABOLETH_LEGENDARY_ACTIONS
  )

  static DEVA = new Monster(MonsterId.DEVA_ID,
    'Deva', MonsterSize.MEDIUM, MonsterType.CELESTIAL, [], Alignment.LAWFUL_GOOD,
    new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR]), new MonsterHitPoints(136, 16, 8, 64), new MonsterSpeed(30, 90),
    new AbilitySet(18, 18, 18, 17, 20, 20),
    MonsterChallenge.TEN,
    [new SavingThrow(Ability.WISDOM, 9), new SavingThrow(Ability.CHARISMA, 9)],
    [new MonsterSkill(Skill.INSIGHT, 7), new MonsterSkill(Skill.PERCEPTION, 9)],
    new DamageResistances([DamageType.RADIANT], [DamageType.BLUDGEONING, DamageType.PIERCING,
      DamageType.SLASHING]),
    [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED],
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], [new MonsterSkill(Skill.PERCEPTION, 19)]),
    new MonsterLanguages([Language.ALL], 120),
    [SpecialTrait.ANGELIC_WEAPONS, SpecialTrait.INNATE_SPELLCASTING, SpecialTrait.MAGIC_RESISTANCE],
    Action.DEVA_ACTIONS
  )

  static SPECTATOR = new Monster(MonsterId.SPECTATOR_ID,
    'Spectator', MonsterSize.MEDIUM, MonsterType.ABERRATION, [], Alignment.LAWFUL_NEUTRAL,
    new MonsterArmor(14, [MonsterEquipment.NATURAL_ARMOR]), new MonsterHitPoints(39, 6, 8, 12), new MonsterSpeed(0, 30),
    new AbilitySet(8, 14, 14, 13, 14, 11),
    MonsterChallenge.THREE, [], [new MonsterSkill(Skill.PERCEPTION, 6)],
    undefined, [Condition.PRONE],
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], [new MonsterSkill(Skill.PERCEPTION, 16)]),
    new MonsterLanguages([Language.DEEP_SPEECH, Language.UNDERCOMMON], 120), [],
    Action.SPECTATOR_ACTIONS, [Reaction.SPECTATOR_SPELL_REFLECTION]
  )

  static GOBLIN = new Monster(MonsterId.GOBLIN_ID,
    'Goblin', MonsterSize.SMALL, MonsterType.HUMANOID, [MonsterTag.GOBLINOID], Alignment.NEUTRAL_EVIL,
    new MonsterArmor(15, [MonsterEquipment.LEATHER_ARMOR, MonsterEquipment.SHIELD]), new MonsterHitPoints(7, 2, 6),
    new MonsterSpeed(30), new AbilitySet(8, 14, 10, 10, 8, 8),
    MonsterChallenge.ONE_FOURTH, undefined, [new MonsterSkill(Skill.STEALTH, 6)], undefined, undefined,
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60)], [new MonsterSkill(Skill.PERCEPTION, 9)]),
    new MonsterLanguages([Language.COMMON, Language.GOBLIN]), [SpecialTrait.NIMBLE_ESCAPE],
    Action.GOBLIN_ACTIONS
  )

  static MONSTERS: Monster[] = [
    this.AARAKOCRA, this.ABOLETH, this.DEVA, this.SPECTATOR, this.GOBLIN
  ]

}
