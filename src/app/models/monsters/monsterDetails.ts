import {MonsterArmor} from "./monsterArmor";
import {MonsterHitPoints} from "./monsterHitPoints";
import {MonsterSpeed} from "./monster-speed/monsterSpeed";
import {AbilitySet} from "../common/ability/abilitySet";
import {SavingThrow} from "./savingThrow";
import {MonsterSkill} from "./monsterSkill";
import {DamageResistances} from "./monster-damage-data/damageResistances";
import {DamageImmunities} from "./monster-damage-data/damageImmunities";
import {Condition} from "../Condition";
import {MonsterSenses} from "./monsterSenses";
import {MonsterLanguages} from "./monster-languages/monsterLanguages";
import {SpecialTrait} from "./actions-and-traits/specialTrait";
import {Action} from "./actions-and-traits/action";
import {Reaction} from "./actions-and-traits/reaction";
import {LegendaryAction} from "./actions-and-traits/legendaryAction";
import {Alignment} from "../common/alignment";
import {MonsterTag} from "./enums/monsterTag";

export class MonsterDetails {
  constructor(
    private readonly alignment: Alignment,
    private readonly armorClass: MonsterArmor[],
    private readonly hitPoints: MonsterHitPoints,
    private readonly speeds: MonsterSpeed[],
    private readonly abilitySet: AbilitySet,
    private readonly senses: MonsterSenses = new MonsterSenses([], 0),
    private readonly tags: MonsterTag[] = [],
    private readonly savingThrows: SavingThrow[] = [],
    private readonly skills: MonsterSkill[] = [],
    private readonly languages: MonsterLanguages = new MonsterLanguages([]),
    private readonly actions: Action[] = [],
    private readonly specialTraits: SpecialTrait[] = [],
    private readonly damageResistances?: DamageResistances,
    private readonly damageImmunities?: DamageImmunities,
    private readonly conditionImmunities: Condition[] = [],
    // 5th part
    // special traits
    private readonly reactions: Reaction[] = [],
    private readonly legendaryActions: LegendaryAction[] = []
  ) {
  }

  getAlignment(): Alignment {
    return this.alignment;
  }

  getArmorClass(): MonsterArmor[] {
    return this.armorClass;
  }

  getHitPoints(): MonsterHitPoints {
    return this.hitPoints;
  }

  getSpeeds(): MonsterSpeed[] {
    return this.speeds;
  }

  getAbilitySet(): AbilitySet {
    return this.abilitySet;
  }

  getSenses(): MonsterSenses {
    return this.senses!;
  }

  getTags(): MonsterTag[] {
    return this.tags;
  }

  getSavingThrows(): SavingThrow[] {
    return this.savingThrows;
  }

  getSkills(): MonsterSkill[] {
    return this.skills;
  }

  getDamageResistances(): DamageResistances {
    return this.damageResistances!;
  }

  getDamageImmunities(): DamageImmunities {
    return this.damageImmunities!;
  }

  getConditionImmunities(): Condition[] {
    return this.conditionImmunities;
  }

  getLanguages(): MonsterLanguages {
    return this.languages!;
  }

  getSpecialTraits(): SpecialTrait[] {
    return this.specialTraits;
  }

  getActions(): Action[] {
    return this.actions;
  }

  getReactions(): Reaction[] {
    return this.reactions;
  }

  getLegendaryActions(): LegendaryAction[] {
    return this.legendaryActions;
  }
}
