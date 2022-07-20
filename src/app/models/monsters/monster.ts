import {MonsterSize} from "./monsterSize";
import {MonsterId} from "./monsterId";
import {MonsterType} from "./monsterType";
import {Alignment} from "./alignment";
import {AbilitySet} from "../common/ability/abilitySet";
import {MonsterTag} from "./monsterTag";

export class Monster {

  constructor(
    private readonly id: MonsterId, private readonly name: string, private readonly size: MonsterSize,
    private readonly type: MonsterType, private readonly tags: MonsterTag[], private readonly alignment: Alignment,
    private readonly armorClass: number,
    private readonly hitPoints: number, private readonly speed: string, //TODO: move to objects
    private readonly abilitySet: AbilitySet
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
}
