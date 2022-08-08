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
import {DamageType} from "./monster-damage-data/damageType";
import {DamageResistances} from "./monster-damage-data/damageResistances";
import {Condition} from "../Condition";
import {MonsterSenses} from "./monsterSenses";
import {MonsterSense} from "./monsterSense";
import {Sense} from "../common/sense";
import {MonsterLanguages} from "./monster-languages/monsterLanguages";
import {Language} from "../common/language";
import {SpecialTrait} from "./actions-and-traits/specialTrait";
import {Action} from "./actions-and-traits/action";
import {Reaction} from "./actions-and-traits/reaction";
import {LegendaryAction} from "./actions-and-traits/legendaryAction";
import {MonsterSpeeds} from "./monster-speed/monsterSpeeds";
import {MonsterHitPoints} from "./monsterHitPoints";
import {MonsterArmor} from "./monsterArmor";
import {MonsterEquipment} from "./enums/monsterEquipment";
import {DamageImmunities} from "./monster-damage-data/damageImmunities";
import {MonsterSenseNote} from "./enums/monsterSenseNote";
import {DieType} from "../common/dieType";
import {MonsterArmorDescription} from "./enums/monsterArmorDescription";
import {MonsterSpeed} from "./monster-speed/monsterSpeed";
import {MonsterSpeedDetails} from "./monster-speed/monsterSpeedDetails";
import {AdditionalImmunities} from "./monster-damage-data/additionalImmunities";
import {AdditionalDamageNote} from "./monster-damage-data/additionalDamageNote";
import {SingleMonsterLanguage} from "./monster-languages/singleMonsterLanguage";
import {MonsterLanguageNote} from "./monster-languages/monsterLanguageNote";
import {MonsterSpeedNote} from "./monster-speed/monsterSpeedNote";

/*
  This is hardcoded Monster list from the D&D official source. The frontend app size is increased significantly, but
  its aim is to reduce load on backend server as well as reduce app's response time retrieving most popular monsters.
 */
export class MonsterManualMonsters {

  static AARAKOCRA = new Monster(MonsterId.AARAKOCRA_ID,
    'Aarakocra', MonsterSize.MEDIUM, MonsterType.HUMANOID, [MonsterTag.AARAKOCRA], Alignment.NEUTRAL_GOOD,
    [new MonsterArmor(12)], new MonsterHitPoints(13, 3, DieType.D8), new MonsterSpeeds(new MonsterSpeed(20), new MonsterSpeed(50)),
    new AbilitySet(10, 14, 10, 11, 12, 11),
    MonsterChallenge.ONE_FOURTH,
    [new SavingThrow(Ability.WISDOM, 9), new SavingThrow(Ability.CHARISMA, 9)],
    [new MonsterSkill(Skill.PERCEPTION, 5)],
    undefined, undefined, undefined,
    new MonsterSenses([], 15),
    new MonsterLanguages([new SingleMonsterLanguage(Language.AURAN)]),
    SpecialTrait.AARAKOCRA_SPECIAL_TRAITS, Action.AARAKOCRA_ACTIONS
  )

  static ABOLETH = new Monster(MonsterId.ABOLETH_ID,
    'Aboleth', MonsterSize.LARGE, MonsterType.ABERRATION, [], Alignment.LAWFUL_EVIL,
    [new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR])], new MonsterHitPoints(135, 18, DieType.D10, 36),
    new MonsterSpeeds(new MonsterSpeed(10), new MonsterSpeed(0), new MonsterSpeed(40)),
    new AbilitySet(21, 9, 15, 18, 15, 18),
    MonsterChallenge.TEN,
    [new SavingThrow(Ability.CONSTITUTION, 6), new SavingThrow(Ability.INTELLIGENCE, 8),
      new SavingThrow(Ability.WISDOM, 6)],
    [new MonsterSkill(Skill.HISTORY, 12), new MonsterSkill(Skill.PERCEPTION, 10)],
    undefined, undefined, undefined,
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], 20),
    new MonsterLanguages([new SingleMonsterLanguage(Language.DEEP_SPEECH)], 120),
    SpecialTrait.ABOLETH_SPECIAL_TRAITS,
    Action.ABOLETH_ACTIONS, [], LegendaryAction.ABOLETH_LEGENDARY_ACTIONS
  )

  static DEVA = new Monster(MonsterId.DEVA_ID,
    'Deva', MonsterSize.MEDIUM, MonsterType.CELESTIAL, [], Alignment.LAWFUL_GOOD,
    [new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR])], new MonsterHitPoints(136, 16, DieType.D8, 64),
    new MonsterSpeeds(new MonsterSpeed(30), new MonsterSpeed(90)),
    new AbilitySet(18, 18, 18, 17, 20, 20),
    MonsterChallenge.TEN, [new SavingThrow(Ability.WISDOM, 9), new SavingThrow(Ability.CHARISMA, 9)],
    [new MonsterSkill(Skill.INSIGHT, 7), new MonsterSkill(Skill.PERCEPTION, 9)],
    new DamageResistances([DamageType.RADIANT], [DamageType.BLUDGEONING, DamageType.PIERCING,
      DamageType.SLASHING]), undefined,
    [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED],
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], 19),
    new MonsterLanguages([new SingleMonsterLanguage(Language.ALL)], 120),
    SpecialTrait.DEVA_SPECIAL_TRAITS, Action.DEVA_ACTIONS
  )

  static PLANETAR = new Monster(MonsterId.PLANETAR_ID,
    'Planetar', MonsterSize.LARGE, MonsterType.CELESTIAL, [], Alignment.LAWFUL_GOOD,
    [new MonsterArmor(19, [MonsterEquipment.NATURAL_ARMOR])], new MonsterHitPoints(200, 16, DieType.D10, 112),
    new MonsterSpeeds(new MonsterSpeed(40), new MonsterSpeed(120)), new AbilitySet(24, 20, 24, 19, 22, 25),
    MonsterChallenge.SIXTEEN,
    [new SavingThrow(Ability.CONSTITUTION, 12), new SavingThrow(Ability.WISDOM, 11), new SavingThrow(Ability.CHARISMA, 12)],
    [new MonsterSkill(Skill.PERCEPTION, 11)], new DamageResistances([DamageType.RADIANT], [DamageType.BLUDGEONING, DamageType.PIERCING, DamageType.SLASHING]),
    undefined, [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED],
    new MonsterSenses([new MonsterSense(Sense.TRUESIGHT, 120)], 21),
    new MonsterLanguages([new SingleMonsterLanguage(Language.ALL)], 120), SpecialTrait.PLANETAR_SPECIAL_TRAITS,
    Action.PLANETAR_ACTIONS
  );

  static SOLAR = new Monster(MonsterId.SOLAR_ID, 'Solar', MonsterSize.LARGE, MonsterType.CELESTIAL, [], Alignment.LAWFUL_GOOD,
    [new MonsterArmor(21, [MonsterEquipment.NATURAL_ARMOR])], new MonsterHitPoints(243, 18, DieType.D10, 144),
    new MonsterSpeeds(new MonsterSpeed(50), new MonsterSpeed(150)), new AbilitySet(26, 22, 26, 25, 25, 30),
    MonsterChallenge.TWENTY_ONE, [new SavingThrow(Ability.INTELLIGENCE, 14), new SavingThrow(Ability.WISDOM, 14), new SavingThrow(Ability.CHARISMA, 17)],
    [new MonsterSkill(Skill.PERCEPTION, 14)], new DamageResistances([DamageType.RADIANT], [DamageType.BLUDGEONING, DamageType.PIERCING, DamageType.SLASHING]),
    new DamageImmunities([DamageType.NECROTIC, DamageType.POISON]), [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED, Condition.POISONED],
    new MonsterSenses([new MonsterSense(Sense.TRUESIGHT, 120)], 24), new MonsterLanguages([new SingleMonsterLanguage(Language.ALL)], 120),
    SpecialTrait.SOLAR_SPECIAL_TRAITS, Action.SOLAR_ACTIONS, [], LegendaryAction.SOLAR_LEGENDARY_ACTIONS
  )

  static ANIMATED_ARMOR = new Monster(MonsterId.ANIMATED_ARMOR_ID,
    'Animated Armor', MonsterSize.MEDIUM, MonsterType.CONSTRUCT, [], Alignment.UNALIGNED,
    [new MonsterArmor(18, [MonsterEquipment.NATURAL_ARMOR])], new MonsterHitPoints(33, 6, DieType.D8, 6),
    new MonsterSpeeds(new MonsterSpeed(25)), new AbilitySet(14, 11, 13, 1, 3, 1),
    MonsterChallenge.ONE,
    undefined, [], undefined, new DamageImmunities([DamageType.POISON, DamageType.PSYCHIC]),
    [Condition.BLINDED, Condition.CHARMED, Condition.DEAFENED, Condition.EXHAUSTION, Condition.FRIGHTENED,
      Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED],
    new MonsterSenses([new MonsterSense(Sense.BLINDSIGHT, 60, MonsterSenseNote.BLIND_BEYOND_RADIUS)],
      6), undefined,
    SpecialTrait.ANIMATED_ARMOR_SPECIAL_TRAITS, Action.ANIMATED_ARMOR_ACTIONS
  )

  static FLYING_SWORD = new Monster(MonsterId.FLYING_SWORD_ID,
    'Flying Sword', MonsterSize.SMALL, MonsterType.CONSTRUCT, [], Alignment.UNALIGNED,
    [new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR])], new MonsterHitPoints(17, 5, DieType.D6),
    new MonsterSpeeds(new MonsterSpeed(0), new MonsterSpeed(50)), new AbilitySet(12, 15, 11, 1, 5, 1),
    MonsterChallenge.ONE_FOURTH, [new SavingThrow(Ability.DEXTERITY, 4)], [], undefined, new DamageImmunities([DamageType.POISON, DamageType.PSYCHIC]),
    [Condition.BLINDED, Condition.CHARMED, Condition.DEAFENED, Condition.FRIGHTENED, Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED],
    new MonsterSenses([new MonsterSense(Sense.BLINDSIGHT, 60, MonsterSenseNote.BLIND_BEYOND_RADIUS)], 7), undefined,
    SpecialTrait.FLYING_SWORD_SPECIAL_TRAITS, Action.FLYING_SWORD_ACTIONS
  )

  static RUG_OF_SMOTHERING = new Monster(MonsterId.RUG_OF_SMOTHERING_ID,
    'Rug of Smothering', MonsterSize.LARGE, MonsterType.CONSTRUCT, [], Alignment.UNALIGNED,
    [new MonsterArmor(12)], new MonsterHitPoints(33, 6, DieType.D10), new MonsterSpeeds(new MonsterSpeed(10)),
    new AbilitySet(17, 14, 10, 1, 3, 1),
    MonsterChallenge.TWO, undefined, [], undefined, new DamageImmunities([DamageType.POISON, DamageType.PSYCHIC]),
    [Condition.BLINDED, Condition.CHARMED, Condition.DEAFENED, Condition.FRIGHTENED, Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED],
    new MonsterSenses([new MonsterSense(Sense.BLINDSIGHT, 60, MonsterSenseNote.BLIND_BEYOND_RADIUS)], 6), undefined,
    SpecialTrait.RUG_OF_SMOTHERING_SPECIAL_TRAITS, Action.RUG_OF_SMOTHERING_ACTIONS
  )

  static ANKHEG = new Monster(MonsterId.ANKHEG_ID,
    'Ankheg', MonsterSize.LARGE, MonsterType.MONSTROSITY, [], Alignment.UNALIGNED,
    [new MonsterArmor(14, [MonsterEquipment.NATURAL_ARMOR]), new MonsterArmor(11, [], MonsterArmorDescription.WHILE_PRONE)],
    new MonsterHitPoints(39, 6, DieType.D10, 6),
    new MonsterSpeeds(new MonsterSpeed(30), new MonsterSpeed(0), new MonsterSpeed(0), new MonsterSpeed(10)),
    new AbilitySet(17, 11, 13, 1, 13, 6),
    MonsterChallenge.TWO, undefined, undefined, undefined, undefined, undefined,
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60), new MonsterSense(Sense.TREMORSENSE, 60)], 11),
    undefined, undefined, Action.ANKHEG_ACTIONS
  )

  static AZER = new Monster(MonsterId.AZER_ID,
    'Azer', MonsterSize.MEDIUM, MonsterType.ELEMENTAL, [], Alignment.LAWFUL_NEUTRAL,
    [new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR, MonsterEquipment.SHIELD])],
    new MonsterHitPoints(39, 6, DieType.D8, 12), new MonsterSpeeds(new MonsterSpeed(30)),
    new AbilitySet(17, 12, 15, 12, 13, 10),
    MonsterChallenge.TWO, [new SavingThrow(Ability.CONSTITUTION, 4)], undefined, undefined,
    new DamageImmunities([DamageType.FIRE, DamageType.POISON]), [Condition.POISONED],
    new MonsterSenses([], 11), new MonsterLanguages([new SingleMonsterLanguage(Language.IGNAN)]),
    SpecialTrait.AZER_SPECIAL_TRAITS, Action.AZER_ACTIONS,
  )

  static BANSHEE = new Monster(MonsterId.BANSHEE_ID,
    'Banshee', MonsterSize.MEDIUM, MonsterType.UNDEAD, [], Alignment.CHAOTIC_EVIL, [new MonsterArmor(12)],
    new MonsterHitPoints(58, 13, DieType.D8), new MonsterSpeeds(new MonsterSpeed(0), new MonsterSpeed(40, new MonsterSpeedDetails(MonsterSpeedNote.HOVER))),
    new AbilitySet(1, 14, 10, 12, 11, 17),
    MonsterChallenge.FOUR, [new SavingThrow(Ability.WISDOM, 2), new SavingThrow(Ability.CHARISMA, 4)],
    undefined, new DamageResistances([DamageType.ACID, DamageType.FIRE, DamageType.LIGHTNING, DamageType.THUNDER],
      [DamageType.BLUDGEONING, DamageType.PIERCING, DamageType.SLASHING]), new DamageImmunities([DamageType.COLD, DamageType.NECROTIC, DamageType.POISON]),
    [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED, Condition.GRAPPLED, Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED, Condition.PRONE, Condition.RESTRAINED],
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60)], 10),
    new MonsterLanguages([new SingleMonsterLanguage(Language.COMMON), new SingleMonsterLanguage(Language.ELVISH)]),
    SpecialTrait.BANSHEE_SPECIAL_TRAITS, Action.BANSHEE_ACTIONS
  )

  static BASILISK = new Monster(MonsterId.BASILISK_ID,
    'Basilisk', MonsterSize.MEDIUM, MonsterType.MONSTROSITY, [], Alignment.UNALIGNED, [new MonsterArmor(15, [MonsterEquipment.NATURAL_ARMOR])],
    new MonsterHitPoints(52, 8, DieType.D8, 16), new MonsterSpeeds(new MonsterSpeed(20)),
    new AbilitySet(16, 8, 15, 2, 8, 7),
    MonsterChallenge.THREE, undefined, undefined, undefined, undefined, undefined,
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60)], 9), undefined,
    SpecialTrait.BASILISK_SPECIAL_TRAITS, Action.BASILISK_ACTIONS
  )

  static BEHIR = new Monster(MonsterId.BEHIR_ID,
    'Behir', MonsterSize.HUGE, MonsterType.MONSTROSITY, [], Alignment.NEUTRAL_EVIL, [new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR])],
    new MonsterHitPoints(168, 16, DieType.D12, 64), new MonsterSpeeds(new MonsterSpeed(50), new MonsterSpeed(0), new MonsterSpeed(0), new MonsterSpeed(0), new MonsterSpeed(40)),
    new AbilitySet(23, 16, 18, 7, 14, 12), MonsterChallenge.ELEVEN,
    undefined, [new MonsterSkill(Skill.PERCEPTION, 6), new MonsterSkill(Skill.STEALTH, 7)], undefined,
    new DamageImmunities([DamageType.LIGHTNING]), undefined, new MonsterSenses([new MonsterSense(Sense.DARKVISION, 90)], 16),
    new MonsterLanguages([new SingleMonsterLanguage(Language.DRACONIC)]),
    undefined, Action.BEHIR_ACTIONS
  )

  static SPECTATOR = new Monster(MonsterId.SPECTATOR_ID,
    'Spectator', MonsterSize.MEDIUM, MonsterType.ABERRATION, [], Alignment.LAWFUL_NEUTRAL,
    [new MonsterArmor(14, [MonsterEquipment.NATURAL_ARMOR])], new MonsterHitPoints(39, 6, DieType.D8, 12),
    new MonsterSpeeds(new MonsterSpeed(0), new MonsterSpeed(30, new MonsterSpeedDetails(MonsterSpeedNote.HOVER))),
    new AbilitySet(8, 14, 14, 13, 14, 11),
    MonsterChallenge.THREE, undefined, [new MonsterSkill(Skill.PERCEPTION, 6)],
    undefined, undefined, [Condition.PRONE],
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], 16),
    new MonsterLanguages([new SingleMonsterLanguage(Language.DEEP_SPEECH), new SingleMonsterLanguage(Language.UNDERCOMMON)], 120), undefined,
    Action.SPECTATOR_ACTIONS, [Reaction.SPECTATOR_SPELL_REFLECTION]
  )

  static BUGBEAR = new Monster(MonsterId.BUGBEAR_ID,
    'Bugbear', MonsterSize.MEDIUM, MonsterType.HUMANOID, [MonsterTag.GOBLINOID], Alignment.CHAOTIC_EVIL,
    [new MonsterArmor(16, [MonsterEquipment.HIDE_ARMOR, MonsterEquipment.SHIELD])], new MonsterHitPoints(27, 5, DieType.D8, 5),
    new MonsterSpeeds(new MonsterSpeed(30)), new AbilitySet(15, 14, 13, 8, 11, 9),
    MonsterChallenge.ONE, undefined, [new MonsterSkill(Skill.STEALTH, 6), new MonsterSkill(Skill.SURVIVAL, 2)],
    undefined, undefined, undefined, new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60)], 10),
    new MonsterLanguages([new SingleMonsterLanguage(Language.COMMON), new SingleMonsterLanguage(Language.GOBLIN)]), SpecialTrait.BUGBEAR_SPECIAL_TRAITS,
    Action.BUGBEAR_ACTIONS
  )

  static GOBLIN = new Monster(MonsterId.GOBLIN_ID,
    'Goblin', MonsterSize.SMALL, MonsterType.HUMANOID, [MonsterTag.GOBLINOID], Alignment.NEUTRAL_EVIL,
    [new MonsterArmor(15, [MonsterEquipment.LEATHER_ARMOR, MonsterEquipment.SHIELD])], new MonsterHitPoints(7, 2, DieType.D6),
    new MonsterSpeeds(new MonsterSpeed(30)), new AbilitySet(8, 14, 10, 10, 8, 8),
    MonsterChallenge.ONE_FOURTH, undefined, [new MonsterSkill(Skill.STEALTH, 6)], undefined, undefined, undefined,
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60)], 9),
    new MonsterLanguages([new SingleMonsterLanguage(Language.COMMON), new SingleMonsterLanguage(Language.GOBLIN)]), SpecialTrait.GOBLIN_SPECIAL_TRAITS,
    Action.GOBLIN_ACTIONS
  )

  static WEREWOLF = new Monster(MonsterId.WEREWOLF_ID,
    'Werewolf', MonsterSize.MEDIUM, MonsterType.HUMANOID, [MonsterTag.HUMAN, MonsterTag.SHAPECHANGER], Alignment.CHAOTIC_EVIL,
    [new MonsterArmor(11, [], MonsterArmorDescription.IN_HUMANOID_FORM),
      new MonsterArmor(12, [MonsterEquipment.NATURAL_ARMOR], MonsterArmorDescription.IN_WOLF_OR_HYBRID_FORM)],
    new MonsterHitPoints(58, 9, DieType.D8, 18),
    new MonsterSpeeds(new MonsterSpeed(30, new MonsterSpeedDetails(MonsterSpeedNote.IN_WOLF_FORM, 40))),
    new AbilitySet(15, 13, 14, 10, 11, 10),
    MonsterChallenge.THREE, undefined, [new MonsterSkill(Skill.PERCEPTION, 4), new MonsterSkill(Skill.STEALTH, 3)],
    undefined, new DamageImmunities([], new AdditionalImmunities([DamageType.BLUDGEONING, DamageType.PIERCING, DamageType.SLASHING],
      AdditionalDamageNote.FROM_NON_MAGICAL_NON_SILVERED_WEAPONS)),
    undefined, new MonsterSenses([], 14),
    new MonsterLanguages([new SingleMonsterLanguage(Language.COMMON, MonsterLanguageNote.CANT_SPEAK_IN_WOLF_FORM)]),
    SpecialTrait.WEREWOLF_SPECIAL_TRAITS, Action.WEREWOLF_ACTIONS
  )

  static NIGHTMARE = new Monster(MonsterId.NIGHTMARE_ID,
    'Nightmare', MonsterSize.LARGE, MonsterType.FIEND, [], Alignment.NEUTRAL_EVIL,
    [new MonsterArmor(13, [MonsterEquipment.NATURAL_ARMOR])],
    new MonsterHitPoints(68, 8, DieType.D10, 24),
    new MonsterSpeeds(new MonsterSpeed(60), new MonsterSpeed(90)),
    new AbilitySet(18, 15, 16, 10, 13, 15),
    MonsterChallenge.THREE, undefined, undefined, undefined,
    new DamageImmunities([DamageType.FIRE]), undefined, new MonsterSenses([], 11),
    new MonsterLanguages(
      [new SingleMonsterLanguage(Language.ABYSSAL), new SingleMonsterLanguage(Language.COMMON), new SingleMonsterLanguage(Language.INFERNAL)], 0, false),
    SpecialTrait.NIGHTMARE_SPECIAL_TRAITS, Action.NIGHTMARE_ACTIONS
  )

  static MONSTERS: Monster[] = [
    this.AARAKOCRA, this.ABOLETH, this.DEVA, this.PLANETAR, this.SOLAR, this.ANIMATED_ARMOR, this.FLYING_SWORD,
    this.RUG_OF_SMOTHERING, this.ANKHEG, this.AZER, this.BANSHEE, this.BASILISK, this.BEHIR, this.SPECTATOR, this.BUGBEAR,
    this.GOBLIN, this.WEREWOLF, this.NIGHTMARE
  ]

}
