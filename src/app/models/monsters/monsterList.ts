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
import {MonsterHitPoints} from "./monsterHitPoints";
import {MonsterArmor} from "./monsterArmor";
import {MonsterEquipment} from "./enums/monsterEquipment";
import {DamageImmunities} from "./monster-damage-data/damageImmunities";
import {MonsterSenseNote} from "./enums/monsterSenseNote";
import {DieType} from "../common/dieType";
import {MonsterArmorDescription} from "./enums/monsterArmorDescription";
import {MonsterSpeed} from "./monster-speed/monsterSpeed";
import {MonsterSpeedDetails} from "./monster-speed/monsterSpeedDetails";
import {SingleMonsterLanguage} from "./monster-languages/singleMonsterLanguage";
import {MonsterSpeedNote} from "./monster-speed/monsterSpeedNote";
import {MovementType} from "./monster-speed/movementType";
import {AdditionalDamageNote} from "./monster-damage-data/additionalDamageNote";
import {AdditionalImmunities} from "./monster-damage-data/additionalImmunities";
import {MonsterLanguageNote} from "./monster-languages/monsterLanguageNote";
import {MonsterBasicInfo} from "./monsterBasicInfo";
import {MonsterDetails} from "./monsterDetails";

/*
  This is hardcoded Monster list from the D&D official source - Basic Rules and those that have their data
  available for free under https://www.dndbeyond.com/encounter-builder.
  The frontend app size is increased significantly, but its aim is to reduce load on backend server as well as
  reduce app's response time retrieving most popular monsters.
 */
export class MonsterList {

  static ANIMATED_ARMOR = new Monster(
    new MonsterBasicInfo(MonsterId.ANIMATED_ARMOR_ID,
      'Animated Armor', MonsterSize.MEDIUM, MonsterType.CONSTRUCT, MonsterChallenge.ONE),
    new MonsterDetails(Alignment.UNALIGNED, [new MonsterArmor(18, [MonsterEquipment.NATURAL_ARMOR])],
      new MonsterHitPoints(33, 6, DieType.D8, 6),
      [new MonsterSpeed(25)], new AbilitySet(14, 11, 13, 1, 3, 1),
      Action.ANIMATED_ARMOR_ACTIONS, SpecialTrait.ANIMATED_ARMOR_SPECIAL_TRAITS,
      new MonsterSenses([new MonsterSense(Sense.BLINDSIGHT, 60, MonsterSenseNote.BLIND_BEYOND_RADIUS)], 6),
      [], [], [], undefined, undefined, new DamageImmunities([DamageType.POISON, DamageType.PSYCHIC]),
      [Condition.BLINDED, Condition.CHARMED, Condition.DEAFENED, Condition.EXHAUSTION, Condition.FRIGHTENED,
        Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED],
    )
  )

  static BANSHEE = new Monster(
    new MonsterBasicInfo(MonsterId.BANSHEE_ID,
      'Banshee', MonsterSize.MEDIUM, MonsterType.UNDEAD, MonsterChallenge.FOUR
    ),
    new MonsterDetails(Alignment.CHAOTIC_EVIL, [new MonsterArmor(12)],
      new MonsterHitPoints(58, 13, DieType.D8), [new MonsterSpeed(0), new MonsterSpeed(40, MovementType.FLY, new MonsterSpeedDetails(MonsterSpeedNote.HOVER))],
      new AbilitySet(1, 14, 10, 12, 11, 17),
      Action.BANSHEE_ACTIONS, SpecialTrait.BANSHEE_SPECIAL_TRAITS,
      new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60)], 10),
      [], [new SavingThrow(Ability.WISDOM, 2), new SavingThrow(Ability.CHARISMA, 4)],
      [], new MonsterLanguages([new SingleMonsterLanguage(Language.COMMON), new SingleMonsterLanguage(Language.ELVISH)]),
      new DamageResistances([DamageType.ACID, DamageType.FIRE, DamageType.LIGHTNING, DamageType.THUNDER],
        [DamageType.BLUDGEONING, DamageType.PIERCING, DamageType.SLASHING]), new DamageImmunities([DamageType.COLD, DamageType.NECROTIC, DamageType.POISON]),
      [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED, Condition.GRAPPLED, Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED, Condition.PRONE, Condition.RESTRAINED],
    ),
  )

  static BASILISK = new Monster(
    new MonsterBasicInfo(MonsterId.BASILISK_ID,
      'Basilisk', MonsterSize.MEDIUM, MonsterType.MONSTROSITY, MonsterChallenge.THREE),
    new MonsterDetails(
      Alignment.UNALIGNED, [new MonsterArmor(15, [MonsterEquipment.NATURAL_ARMOR])],
      new MonsterHitPoints(52, 8, DieType.D8, 16), [new MonsterSpeed(20)],
      new AbilitySet(16, 8, 15, 2, 8, 7),
      Action.BASILISK_ACTIONS, SpecialTrait.BASILISK_SPECIAL_TRAITS,
      new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60)], 9)
    )
  )

  static BUGBEAR = new Monster(
    new MonsterBasicInfo(MonsterId.BUGBEAR_ID,
      'Bugbear', MonsterSize.MEDIUM, MonsterType.HUMANOID, MonsterChallenge.ONE),
    new MonsterDetails(Alignment.CHAOTIC_EVIL,
      [new MonsterArmor(16, [MonsterEquipment.HIDE_ARMOR, MonsterEquipment.SHIELD])], new MonsterHitPoints(27, 5, DieType.D8, 5),
      [new MonsterSpeed(30)], new AbilitySet(15, 14, 13, 8, 11, 9),
      Action.BUGBEAR_ACTIONS, SpecialTrait.BUGBEAR_SPECIAL_TRAITS,
      new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60)], 10),
      [MonsterTag.GOBLINOID], [], [new MonsterSkill(Skill.STEALTH, 6), new MonsterSkill(Skill.SURVIVAL, 2)],
      new MonsterLanguages([new SingleMonsterLanguage(Language.COMMON), new SingleMonsterLanguage(Language.GOBLIN)])
    )
  )

  static FLYING_SWORD = new Monster(
    new MonsterBasicInfo(MonsterId.FLYING_SWORD_ID,
      'Flying Sword', MonsterSize.SMALL, MonsterType.CONSTRUCT, MonsterChallenge.ONE_FOURTH
    ),
    new MonsterDetails(
      Alignment.UNALIGNED, [new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR])], new MonsterHitPoints(17, 5, DieType.D6),
      [new MonsterSpeed(0), new MonsterSpeed(50, MovementType.FLY)],
      new AbilitySet(12, 15, 11, 1, 5, 1),
      Action.FLYING_SWORD_ACTIONS, SpecialTrait.FLYING_SWORD_SPECIAL_TRAITS,
      new MonsterSenses([new MonsterSense(Sense.BLINDSIGHT, 60, MonsterSenseNote.BLIND_BEYOND_RADIUS)], 7),
      [], [new SavingThrow(Ability.DEXTERITY, 4)], [], undefined,
      undefined, new DamageImmunities([DamageType.POISON, DamageType.PSYCHIC]),
      [Condition.BLINDED, Condition.CHARMED, Condition.DEAFENED, Condition.FRIGHTENED, Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED]
    )
  )

  static GOBLIN = new Monster(
    new MonsterBasicInfo(MonsterId.GOBLIN_ID,
      'Goblin', MonsterSize.SMALL, MonsterType.HUMANOID, MonsterChallenge.ONE_FOURTH),
    new MonsterDetails(Alignment.NEUTRAL_EVIL,
      [new MonsterArmor(15, [MonsterEquipment.LEATHER_ARMOR, MonsterEquipment.SHIELD])], new MonsterHitPoints(7, 2, DieType.D6),
      [new MonsterSpeed(30)], new AbilitySet(8, 14, 10, 10, 8, 8),
      Action.GOBLIN_ACTIONS, SpecialTrait.GOBLIN_SPECIAL_TRAITS,
      new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60)], 9), [MonsterTag.GOBLINOID],
      [], [new MonsterSkill(Skill.STEALTH, 6)], new MonsterLanguages([new SingleMonsterLanguage(Language.COMMON), new SingleMonsterLanguage(Language.GOBLIN)]),
    )
  )

  static SKELETON = new Monster(
    new MonsterBasicInfo(MonsterId.SKELETON_ID,
      'Skeleton', MonsterSize.MEDIUM, MonsterType.UNDEAD, MonsterChallenge.ONE_FOURTH),
    new MonsterDetails(
      Alignment.LAWFUL_EVIL, [new MonsterArmor(13, [MonsterEquipment.ARMOR_SCRAPS])],
      new MonsterHitPoints(13, 2, DieType.D8, 4), [new MonsterSpeed(30)],
      new AbilitySet(10, 14, 15, 6, 8, 5),
      Action.SKELETON_ACTIONS, [],
      new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60)], 9),
      [], [], [],
      new MonsterLanguages([new SingleMonsterLanguage(Language.ALL_IN_LIFE)], 0, false)
    )
  )

  static SPECTATOR = new Monster(
    new MonsterBasicInfo(MonsterId.SPECTATOR_ID,
      'Spectator', MonsterSize.MEDIUM, MonsterType.ABERRATION, MonsterChallenge.THREE
    ),
    new MonsterDetails(
      Alignment.LAWFUL_NEUTRAL, [new MonsterArmor(14, [MonsterEquipment.NATURAL_ARMOR])],
      new MonsterHitPoints(39, 6, DieType.D8, 12),
      [new MonsterSpeed(0), new MonsterSpeed(30, MovementType.FLY, new MonsterSpeedDetails(MonsterSpeedNote.HOVER))],
      new AbilitySet(8, 14, 14, 13, 14, 11),
      Action.SPECTATOR_ACTIONS, [],
      new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], 16),
      [], [], [new MonsterSkill(Skill.PERCEPTION, 6)],
      new MonsterLanguages([new SingleMonsterLanguage(Language.DEEP_SPEECH), new SingleMonsterLanguage(Language.UNDERCOMMON)], 120),
      undefined, undefined, [Condition.PRONE],
      [Reaction.SPECTATOR_SPELL_REFLECTION]
    )
  )

  static WEREWOLF = new Monster(
    new MonsterBasicInfo(MonsterId.WEREWOLF_ID,
      'Werewolf', MonsterSize.MEDIUM, MonsterType.HUMANOID, MonsterChallenge.THREE),
    new MonsterDetails(Alignment.CHAOTIC_EVIL, [new MonsterArmor(11, [], MonsterArmorDescription.IN_HUMANOID_FORM),
        new MonsterArmor(12, [MonsterEquipment.NATURAL_ARMOR], MonsterArmorDescription.IN_WOLF_OR_HYBRID_FORM)],
      new MonsterHitPoints(58, 9, DieType.D8, 18),
      [new MonsterSpeed(30, MovementType.LAND, new MonsterSpeedDetails(MonsterSpeedNote.IN_WOLF_FORM, 40))],
      new AbilitySet(15, 13, 14, 10, 11, 10),
      Action.WEREWOLF_ACTIONS, SpecialTrait.WEREWOLF_SPECIAL_TRAITS,
      new MonsterSenses([], 14), [MonsterTag.HUMAN, MonsterTag.SHAPECHANGER],
      [], [new MonsterSkill(Skill.PERCEPTION, 4), new MonsterSkill(Skill.STEALTH, 3)],
      new MonsterLanguages([new SingleMonsterLanguage(Language.COMMON, MonsterLanguageNote.CANT_SPEAK_IN_WOLF_FORM)]),
      undefined,
      new DamageImmunities([], new AdditionalImmunities([DamageType.BLUDGEONING, DamageType.PIERCING, DamageType.SLASHING],
        AdditionalDamageNote.FROM_NON_MAGICAL_NON_SILVERED_WEAPONS))
    )
  )

  static ABOLETH = new Monster(
    new MonsterBasicInfo(MonsterId.ABOLETH_ID,
      'Aboleth', MonsterSize.LARGE, MonsterType.ABERRATION, MonsterChallenge.TEN),
    new MonsterDetails(
      Alignment.LAWFUL_EVIL, [new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR])], new MonsterHitPoints(135, 18, DieType.D10, 36),
      [new MonsterSpeed(10), new MonsterSpeed(40, MovementType.SWIM)],
      new AbilitySet(21, 9, 15, 18, 15, 18),
      Action.ABOLETH_ACTIONS, SpecialTrait.ABOLETH_SPECIAL_TRAITS,
      new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], 20),
      [], [new SavingThrow(Ability.CONSTITUTION, 6), new SavingThrow(Ability.INTELLIGENCE, 8),
        new SavingThrow(Ability.WISDOM, 6)], [new MonsterSkill(Skill.HISTORY, 12), new MonsterSkill(Skill.PERCEPTION, 10)],
      new MonsterLanguages([new SingleMonsterLanguage(Language.DEEP_SPEECH)], 120),
      undefined, undefined, undefined, undefined,
      LegendaryAction.ABOLETH_LEGENDARY_ACTIONS
    )
  )

  static DEVA = new Monster(
    new MonsterBasicInfo(MonsterId.DEVA_ID,
      'Deva', MonsterSize.MEDIUM, MonsterType.CELESTIAL, MonsterChallenge.TEN),
    new MonsterDetails(
      Alignment.LAWFUL_GOOD, [new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR])],
      new MonsterHitPoints(136, 16, DieType.D8, 64),
      [new MonsterSpeed(30), new MonsterSpeed(90, MovementType.FLY)],
      new AbilitySet(18, 18, 18, 17, 20, 20),
      Action.DEVA_ACTIONS, SpecialTrait.DEVA_SPECIAL_TRAITS,
      new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], 19),
      [], [new SavingThrow(Ability.WISDOM, 9), new SavingThrow(Ability.CHARISMA, 9)],
      [new MonsterSkill(Skill.INSIGHT, 7), new MonsterSkill(Skill.PERCEPTION, 9)],
      new MonsterLanguages([new SingleMonsterLanguage(Language.ALL)], 120),
      new DamageResistances([DamageType.RADIANT], [DamageType.BLUDGEONING, DamageType.PIERCING,
        DamageType.SLASHING]), undefined,
      [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED],
    )
  )

  static PLANETAR = new Monster(
    new MonsterBasicInfo(MonsterId.PLANETAR_ID,
      'Planetar', MonsterSize.LARGE, MonsterType.CELESTIAL, MonsterChallenge.SIXTEEN),
    new MonsterDetails(
      Alignment.LAWFUL_GOOD, [new MonsterArmor(19, [MonsterEquipment.NATURAL_ARMOR])],
      new MonsterHitPoints(200, 16, DieType.D10, 112),
      [new MonsterSpeed(40), new MonsterSpeed(120, MovementType.FLY)],
      new AbilitySet(24, 20, 24, 19, 22, 25),
      Action.PLANETAR_ACTIONS, SpecialTrait.PLANETAR_SPECIAL_TRAITS,
      new MonsterSenses([new MonsterSense(Sense.TRUESIGHT, 120)], 21),
      [], [new SavingThrow(Ability.CONSTITUTION, 12), new SavingThrow(Ability.WISDOM, 11), new SavingThrow(Ability.CHARISMA, 12)],
      [new MonsterSkill(Skill.PERCEPTION, 11)], new MonsterLanguages([new SingleMonsterLanguage(Language.ALL)], 120),
      new DamageResistances([DamageType.RADIANT], [DamageType.BLUDGEONING, DamageType.PIERCING, DamageType.SLASHING]),
      undefined, [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED],
    )
  );

  static SOLAR = new Monster(
    new MonsterBasicInfo(MonsterId.SOLAR_ID,
      'Solar', MonsterSize.LARGE, MonsterType.CELESTIAL, MonsterChallenge.TWENTY_ONE),
    new MonsterDetails(Alignment.LAWFUL_GOOD,
      [new MonsterArmor(21, [MonsterEquipment.NATURAL_ARMOR])], new MonsterHitPoints(243, 18, DieType.D10, 144),
      [new MonsterSpeed(50), new MonsterSpeed(150, MovementType.FLY)],
      new AbilitySet(26, 22, 26, 25, 25, 30),
      Action.SOLAR_ACTIONS, SpecialTrait.SOLAR_SPECIAL_TRAITS,
      new MonsterSenses([new MonsterSense(Sense.TRUESIGHT, 120)], 24), [],
      [new SavingThrow(Ability.INTELLIGENCE, 14), new SavingThrow(Ability.WISDOM, 14), new SavingThrow(Ability.CHARISMA, 17)],
      [new MonsterSkill(Skill.PERCEPTION, 14)], new MonsterLanguages([new SingleMonsterLanguage(Language.ALL)], 120),
      new DamageResistances([DamageType.RADIANT], [DamageType.BLUDGEONING, DamageType.PIERCING, DamageType.SLASHING]),
      new DamageImmunities([DamageType.NECROTIC, DamageType.POISON]), [Condition.CHARMED, Condition.EXHAUSTION, Condition.FRIGHTENED, Condition.POISONED],
      [], LegendaryAction.SOLAR_LEGENDARY_ACTIONS
    )
  )

  static RUG_OF_SMOTHERING = new Monster(
    new MonsterBasicInfo(MonsterId.RUG_OF_SMOTHERING_ID,
      'Rug of Smothering', MonsterSize.LARGE, MonsterType.CONSTRUCT, MonsterChallenge.TWO),
    new MonsterDetails(Alignment.UNALIGNED, [new MonsterArmor(12)],
      new MonsterHitPoints(33, 6, DieType.D10), [new MonsterSpeed(10)],
      new AbilitySet(17, 14, 10, 1, 3, 1),
      Action.RUG_OF_SMOTHERING_ACTIONS, SpecialTrait.RUG_OF_SMOTHERING_SPECIAL_TRAITS,
      new MonsterSenses([new MonsterSense(Sense.BLINDSIGHT, 60, MonsterSenseNote.BLIND_BEYOND_RADIUS)], 6),
      [], [], [], undefined, undefined, new DamageImmunities([DamageType.POISON, DamageType.PSYCHIC]),
      [Condition.BLINDED, Condition.CHARMED, Condition.DEAFENED, Condition.FRIGHTENED, Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED],
    )
  )

  static ANKHEG = new Monster(
    new MonsterBasicInfo(MonsterId.ANKHEG_ID,
      'Ankheg', MonsterSize.LARGE, MonsterType.MONSTROSITY, MonsterChallenge.TWO
    ),
    new MonsterDetails(
      Alignment.UNALIGNED, [new MonsterArmor(14, [MonsterEquipment.NATURAL_ARMOR]), new MonsterArmor(11, [], MonsterArmorDescription.WHILE_PRONE)],
      new MonsterHitPoints(39, 6, DieType.D10, 6),
      [new MonsterSpeed(30), new MonsterSpeed(10, MovementType.BURROW)],
      new AbilitySet(17, 11, 13, 1, 13, 6),
      Action.ANKHEG_ACTIONS, [],
      new MonsterSenses([new MonsterSense(Sense.DARKVISION, 60), new MonsterSense(Sense.TREMORSENSE, 60)], 11)
    )
  )

  static AZER = new Monster(
    new MonsterBasicInfo(MonsterId.AZER_ID,
      'Azer', MonsterSize.MEDIUM, MonsterType.ELEMENTAL, MonsterChallenge.TWO),
    new MonsterDetails(Alignment.LAWFUL_NEUTRAL, [new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR, MonsterEquipment.SHIELD])],
      new MonsterHitPoints(39, 6, DieType.D8, 12), [new MonsterSpeed(30)],
      new AbilitySet(17, 12, 15, 12, 13, 10),
      Action.AZER_ACTIONS, SpecialTrait.AZER_SPECIAL_TRAITS,
      new MonsterSenses([], 11), [], [new SavingThrow(Ability.CONSTITUTION, 4)],
      [], new MonsterLanguages([new SingleMonsterLanguage(Language.IGNAN)]), undefined,
      new DamageImmunities([DamageType.FIRE, DamageType.POISON]), [Condition.POISONED],
    )
  )

  static BEHIR = new Monster(
    new MonsterBasicInfo(MonsterId.BEHIR_ID,
      'Behir', MonsterSize.HUGE, MonsterType.MONSTROSITY, MonsterChallenge.ELEVEN),
    new MonsterDetails(
      Alignment.NEUTRAL_EVIL, [new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR])],
      new MonsterHitPoints(168, 16, DieType.D12, 64), [new MonsterSpeed(50), new MonsterSpeed(40, MovementType.CLIMB)],
      new AbilitySet(23, 16, 18, 7, 14, 12),
      Action.BEHIR_ACTIONS, [],
      new MonsterSenses([new MonsterSense(Sense.DARKVISION, 90)], 16), [],
      [], [new MonsterSkill(Skill.PERCEPTION, 6), new MonsterSkill(Skill.STEALTH, 7)],
      new MonsterLanguages([new SingleMonsterLanguage(Language.DRACONIC)]),
      undefined, new DamageImmunities([DamageType.LIGHTNING])
    )
  )

  static NIGHTMARE = new Monster(
    new MonsterBasicInfo(MonsterId.NIGHTMARE_ID,
      'Nightmare', MonsterSize.LARGE, MonsterType.FIEND, MonsterChallenge.THREE),
    new MonsterDetails(
      Alignment.NEUTRAL_EVIL, [new MonsterArmor(13, [MonsterEquipment.NATURAL_ARMOR])],
      new MonsterHitPoints(68, 8, DieType.D10, 24),
      [new MonsterSpeed(60), new MonsterSpeed(90, MovementType.FLY)],
      new AbilitySet(18, 15, 16, 10, 13, 15),
      Action.NIGHTMARE_ACTIONS, SpecialTrait.NIGHTMARE_SPECIAL_TRAITS,
      new MonsterSenses([], 11), [], [], [],
      new MonsterLanguages(
        [new SingleMonsterLanguage(Language.ABYSSAL), new SingleMonsterLanguage(Language.COMMON),
          new SingleMonsterLanguage(Language.INFERNAL)], 0, false),
      undefined, new DamageImmunities([DamageType.FIRE])
    )
  )

  static MONSTERS: Monster[] = [
    this.ANIMATED_ARMOR, this.BANSHEE,this.BASILISK, this.BUGBEAR, this.FLYING_SWORD, this.GOBLIN, this.SKELETON,
    this.SPECTATOR, this.WEREWOLF, this.ABOLETH, this.DEVA, this.PLANETAR, this.SOLAR, this.RUG_OF_SMOTHERING,
    this.ANKHEG, this.AZER, this.BEHIR,  this.NIGHTMARE
  ]

}
