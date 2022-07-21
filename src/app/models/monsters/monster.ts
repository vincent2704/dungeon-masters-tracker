import {MonsterSize} from "./monsterSize";
import {MonsterId} from "./monsterId";
import {MonsterType} from "./monsterType";
import {Alignment} from "../common/alignment";
import {AbilitySet} from "../common/ability/abilitySet";
import {MonsterTag} from "./monsterTag";
import {MonsterChallenge} from "./monsterChallenge";
import {SavingThrow} from "./savingThrow";
import {MonsterSkill} from "./monsterSkill";

export class Monster {

  constructor(
    // 1st section of the monster card (separated by horizontal lines)
    private readonly id: MonsterId, private readonly name: string, private readonly size: MonsterSize,
    private readonly type: MonsterType, private readonly tags: MonsterTag[], private readonly alignment: Alignment,
    // second part
    private readonly armorClass: number,
    private readonly hitPoints: number, private readonly speed: string, //TODO: move hitPoints and speed to objects
    // third part
    private readonly abilitySet: AbilitySet,
    // fourth part
    private readonly challenge: MonsterChallenge,
    private readonly savingThrows: SavingThrow[] = [],
    private readonly skills: MonsterSkill[] = [],
    // damage resistances
    // condition immunities
    // senses
    // languages
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

  getSpeed(): string {
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

  getChallenge(): MonsterChallenge {
    return this.challenge;
  }

}
