import {Monster} from "./monster";
import {MonsterId} from "./monsterId";
import {MonsterSize} from "./monsterSize";
import {MonsterType} from "./enums/monsterType";
import {Alignment} from "../common/alignment";
import {AbilitySet} from "../common/ability/abilitySet";
import {MonsterTag} from "./enums/monsterTag";
import {MonsterChallenge} from "./monsterChallenge";
import {SavingThrow} from "./savingThrow";
import {Ability} from "../common/ability/ability";
import {MonsterSkill} from "./monsterSkill";
import {Skill} from "../common/skill";
import {DamageType} from "./enums/damageType";
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
import {MonsterEquipment} from "./enums/monsterEquipment";
import {DamageImmunities} from "./damageImmunities";
import {MonsterSenseNote} from "./enums/monsterSenseNote";

export class MonsterManualMonsters {

  static AARAKOCRA = new Monster(MonsterId.AARAKOCRA_ID,
    'Aarakocra', MonsterSize.MEDIUM, MonsterType.HUMANOID, [MonsterTag.AARAKOCRA], Alignment.NEUTRAL_GOOD,
    new MonsterArmor(12), new MonsterHitPoints(13, 3, 8), new MonsterSpeed(20, 50),
    new AbilitySet(10, 14, 10, 11, 12, 11),
    MonsterChallenge.ONE_FOURTH,
    [new SavingThrow(Ability.WISDOM, 9), new SavingThrow(Ability.CHARISMA, 9)],
    [new MonsterSkill(Skill.PERCEPTION, 5)],
    undefined, undefined, undefined,
    new MonsterSenses([], [new MonsterSkill(Skill.PERCEPTION, 15)]),
    new MonsterLanguages([Language.AURAN]),
    SpecialTrait.AARAKOCRA_SPECIAL_TRAITS, Action.AARAKOCRA_ACTIONS
  )

  static ABOLETH = new Monster(MonsterId.ABOLETH_ID,
    'Aboleth', MonsterSize.LARGE, MonsterType.ABERRATION, [], Alignment.LAWFUL_EVIL,
    new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR]), new MonsterHitPoints(135, 18, 10, 36), new MonsterSpeed(10, 0, 40),
    new AbilitySet(21, 9, 15, 18, 15, 18),
    MonsterChallenge.TEN,
    [new SavingThrow(Ability.CONSTITUTION, 6), new SavingThrow(Ability.INTELLIGENCE, 8),
      new SavingThrow(Ability.WISDOM, 6)],
    [new MonsterSkill(Skill.HISTORY, 12), new MonsterSkill(Skill.PERCEPTION, 10)],
    undefined, undefined, undefined,
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], [new MonsterSkill(Skill.PERCEPTION, 20)]),
    new MonsterLanguages([Language.DEEP_SPEECH], 120),
    SpecialTrait.ABOLETH_SPECIAL_TRAITS,
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
      DamageType.SLASHING]), undefined,
    [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED],
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], [new MonsterSkill(Skill.PERCEPTION, 19)]),
    new MonsterLanguages([Language.ALL], 120),
    SpecialTrait.DEVA_SPECIAL_TRAITS, Action.DEVA_ACTIONS
  )

  static PLANETAR = new Monster(MonsterId.PLANETAR_ID,
    'Planetar', MonsterSize.LARGE, MonsterType.CELESTIAL, [], Alignment.LAWFUL_GOOD,
    new MonsterArmor(19, [MonsterEquipment.NATURAL_ARMOR]), new MonsterHitPoints(200, 16, 10, 112),
    new MonsterSpeed(40, 120), new AbilitySet(24, 20, 24, 19, 22, 25),
    MonsterChallenge.SIXTEEN,
    [new SavingThrow(Ability.CONSTITUTION, 12), new SavingThrow(Ability.WISDOM, 11), new SavingThrow(Ability.CHARISMA, 12)],
    [new MonsterSkill(Skill.PERCEPTION, 11)], new DamageResistances([DamageType.RADIANT], [DamageType.BLUDGEONING, DamageType.PIERCING, DamageType.SLASHING]),
    undefined, [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED],
    new MonsterSenses([new MonsterSense(Sense.TRUESIGHT, 120)], [new MonsterSkill(Skill.PERCEPTION, 21)]),
    new MonsterLanguages([Language.ALL], 120), SpecialTrait.PLANETAR_SPECIAL_TRAITS,
    Action.PLANETAR_ACTIONS
  );

  static SOLAR = new Monster(MonsterId.SOLAR_ID, 'Solar', MonsterSize.LARGE, MonsterType.CELESTIAL, [], Alignment.LAWFUL_GOOD,
    new MonsterArmor(21, [MonsterEquipment.NATURAL_ARMOR]), new MonsterHitPoints(243, 18, 10, 144),
    new MonsterSpeed(50, 150), new AbilitySet(26, 22, 26, 25, 25, 30),
    MonsterChallenge.TWENTY_ONE, [new SavingThrow(Ability.INTELLIGENCE, 14), new SavingThrow(Ability.WISDOM, 14), new SavingThrow(Ability.CHARISMA, 17)],
    [new MonsterSkill(Skill.PERCEPTION, 14)], new DamageResistances([DamageType.RADIANT], [DamageType.BLUDGEONING, DamageType.PIERCING, DamageType.SLASHING]),
    new DamageImmunities([DamageType.NECROTIC, DamageType.POISON]), [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED, Condition.POISONED],
    new MonsterSenses([new MonsterSense(Sense.TRUESIGHT, 120)], [new MonsterSkill(Skill.PERCEPTION, 24)]), new MonsterLanguages([Language.ALL], 120),
    SpecialTrait.SOLAR_SPECIAL_TRAITS, Action.SOLAR_ACTIONS, [], LegendaryAction.SOLAR_LEGENDARY_ACTIONS
  )

  static ANIMATED_ARMOR = new Monster(MonsterId.ANIMATED_ARMOR_ID,
    'Animated Armor', MonsterSize.MEDIUM, MonsterType.CONSTRUCT, [], Alignment.UNALIGNED,
    new MonsterArmor(18, [MonsterEquipment.NATURAL_ARMOR]), new MonsterHitPoints(33, 6, 8, 6),
    new MonsterSpeed(25), new AbilitySet(14, 11, 13, 1, 3, 1),
    MonsterChallenge.ONE,
    [], [], undefined, new DamageImmunities([DamageType.POISON, DamageType.PSYCHIC]),
    [Condition.BLINDED, Condition.CHARMED, Condition.DEAFENED, Condition.EXHAUSTION, Condition.FRIGHTENED,
      Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED],
    new MonsterSenses([new MonsterSense(Sense.BLINDSIGHT, 60, MonsterSenseNote.BLIND_BEYOND_RADIUS)],
      [new MonsterSkill(Skill.PERCEPTION, 6)]), undefined,
    SpecialTrait.ANIMATED_ARMOR_SPECIAL_TRAITS, Action.ANIMATED_ARMOR_ACTIONS
  )

  static FLYING_SWORD = new Monster(MonsterId.FLYING_SWORD_ID,
    'Flying Sword', MonsterSize.SMALL, MonsterType.CONSTRUCT, [], Alignment.UNALIGNED,
    new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR]), new MonsterHitPoints(17, 5, 6),
    new MonsterSpeed(0, 50), new AbilitySet(12, 15, 11, 1, 5, 1),
    MonsterChallenge.ONE_FOURTH, [new SavingThrow(Ability.DEXTERITY, 4)], [], undefined, new DamageImmunities([DamageType.POISON, DamageType.PSYCHIC]),
    [Condition.BLINDED, Condition.CHARMED, Condition.DEAFENED, Condition.FRIGHTENED, Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED],
    new MonsterSenses([new MonsterSense(Sense.BLINDSIGHT, 60, MonsterSenseNote.BLIND_BEYOND_RADIUS)], [new MonsterSkill(Skill.PERCEPTION, 7)]), undefined,
    SpecialTrait.FLYING_SWORD_SPECIAL_TRAITS, Action.FLYING_SWORD_ACTIONS
  )

  static SPECTATOR = new Monster(MonsterId.SPECTATOR_ID,
    'Spectator', MonsterSize.MEDIUM, MonsterType.ABERRATION, [], Alignment.LAWFUL_NEUTRAL,
    new MonsterArmor(14, [MonsterEquipment.NATURAL_ARMOR]), new MonsterHitPoints(39, 6, 8, 12), new MonsterSpeed(0, 30),
    new AbilitySet(8, 14, 14, 13, 14, 11),
    MonsterChallenge.THREE, [], [new MonsterSkill(Skill.PERCEPTION, 6)],
    undefined, undefined, [Condition.PRONE],
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], [new MonsterSkill(Skill.PERCEPTION, 16)]),
    new MonsterLanguages([Language.DEEP_SPEECH, Language.UNDERCOMMON], 120), [],
    Action.SPECTATOR_ACTIONS, [Reaction.SPECTATOR_SPELL_REFLECTION]
  )

  static GOBLIN = new Monster(MonsterId.GOBLIN_ID,
    'Goblin', MonsterSize.SMALL, MonsterType.HUMANOID, [MonsterTag.GOBLINOID], Alignment.NEUTRAL_EVIL,
    new MonsterArmor(15, [MonsterEquipment.LEATHER_ARMOR, MonsterEquipment.SHIELD]), new MonsterHitPoints(7, 2, 6),
    new MonsterSpeed(30), new AbilitySet(8, 14, 10, 10, 8, 8),
    MonsterChallenge.ONE_FOURTH, undefined, [new MonsterSkill(Skill.STEALTH, 6)], undefined, undefined, undefined,
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60)], [new MonsterSkill(Skill.PERCEPTION, 9)]),
    new MonsterLanguages([Language.COMMON, Language.GOBLIN]), [SpecialTrait.NIMBLE_ESCAPE],
    Action.GOBLIN_ACTIONS
  )

  static MONSTERS: Monster[] = [
    this.AARAKOCRA, this.ABOLETH, this.DEVA, this.PLANETAR, this.SOLAR, this.ANIMATED_ARMOR, this.FLYING_SWORD, this.SPECTATOR, this.GOBLIN
  ]

}
