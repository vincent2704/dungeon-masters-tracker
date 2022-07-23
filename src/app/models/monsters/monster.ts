import {MonsterSize} from "./monsterSize";
import {MonsterId} from "./monsterId";
import {MonsterType} from "./monsterType";
import {Alignment} from "../common/alignment";
import {AbilitySet} from "../common/ability/abilitySet";
import {MonsterTag} from "./monsterTag";
import {MonsterChallenge} from "./monsterChallenge";
import {SavingThrow} from "./savingThrow";
import {MonsterSkill} from "./monsterSkill";
import {DamageResistances} from "./damageResistances";
import {Condition} from "../Condition";
import {MonsterSenses} from "./monsterSenses";
import {MonsterLanguages} from "./monsterLanguages";
import {SpecialTrait} from "./actions-and-traits/specialTrait";
import {Action} from "./actions-and-traits/action";
import {Reaction} from "./actions-and-traits/reaction";
import {LegendaryAction} from "./actions-and-traits/legendaryAction";
import {MonsterSpeed} from "./monsterSpeed";

export class Monster {

  constructor(
    // 1st section of the monster card (separated by horizontal lines)
    private readonly id: MonsterId, private readonly name: string, private readonly size: MonsterSize,
    private readonly type: MonsterType, private readonly tags: MonsterTag[], private readonly alignment: Alignment,
    // second part
    private readonly armorClass: number,
    private readonly hitPoints: number, private readonly speed: MonsterSpeed, //TODO: move hitPoints
    // third part
    private readonly abilitySet: AbilitySet,
    // fourth part
    private readonly challenge: MonsterChallenge,
    private readonly savingThrows: SavingThrow[] = [],
    private readonly skills: MonsterSkill[] = [],
    private readonly damageResistances?: DamageResistances,
    private readonly conditionImmunities: Condition[] = [],
    private readonly senses?: MonsterSenses,
    private readonly languages?: MonsterLanguages,
    // 5th part
    // special traits
    private readonly specialTraits: SpecialTrait[] = [],
    private readonly actions: Action[] = [],
    private readonly reactions: Reaction[] = [],
    private readonly legendaryActions: LegendaryAction[] = [],
  ) {}

  getName() {
    return this.name;
  }

  getOverview(): string {
    if(this.tags.length == 0) {
      return `${this.size.getSize()} ${this.type.getName()}, ${this.alignment.getAlignment()}`
    }
    let tags = this.tags.join(', ')
    return `${this.size.getSize()} ${this.type.getName()} (${tags}), ${this.alignment.getAlignment()}`
  }

  getArmorClass(): number {
    return this.armorClass;
  }

  getHitPoints(): number {
    return this.hitPoints;
  }

  getSpeed(): MonsterSpeed {
    return this.speed;
  }

  getAbilitySet(): AbilitySet {
    return this.abilitySet;
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

  getConditionImmunities(): Condition[] {
    return this.conditionImmunities;
  }

  getSenses(): MonsterSenses {
    return this.senses!;
  }

  getLanguages() {
    return this.languages;
  }

  getChallenge(): MonsterChallenge {
    return this.challenge;
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
