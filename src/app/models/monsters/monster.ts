import {MonsterSize} from "./monsterSize";
import {MonsterId} from "./monsterId";
import {MonsterType} from "./monsterType";
import {Alignment} from "./alignment";
import {$localize} from "@angular/localize/init";

export class Monster {

  constructor(
    private id: MonsterId, private name: string, private size: MonsterSize, private type: MonsterType,
    private alignment: Alignment
  ) {}

  getName() {
    return $localize`${this.name}`;
  }
}
