import {MonsterSense} from "./monsterSense";

export class MonsterSenses {
  constructor(private monsterSenses: MonsterSense[], private passivePerception: number = 0) {
  }

  getMonsterSenses(): MonsterSense[] {
    return this.monsterSenses;
  }

  getPassivePerception(): number {
    return this.passivePerception;
  }

}
