import {MonsterSpeed} from "./monsterSpeed";

export class MonsterSpeeds {

  constructor(private readonly monsterSpeeds: MonsterSpeed[]) {
  }

  getMonsterSpeeds(): MonsterSpeed[] {
    return this.monsterSpeeds;
  }

}
