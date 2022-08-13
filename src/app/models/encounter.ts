import {Monster} from "./monsters/monster";

export class Encounter {
  constructor(private name: string, private monsterList: Map<Monster, number>, private description: string = '') {
  }

  getName(): string {
    return this.name;
  }

  getMonsterList(): Map<Monster, number> {
    return this.monsterList;
  }

  getDescription(): string {
    return this.description;
  }

}
