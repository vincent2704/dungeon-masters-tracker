import {MonsterSense} from "./monsterSense";
import {MonsterSkill} from "./monsterSkill";

export class MonsterSenses {
  constructor(private monsterSenses: MonsterSense[], private passiveSkills: MonsterSkill[] = []) {
  }

  getMonsterSenses(): MonsterSense[] {
    return this.monsterSenses;
  }

  getPassiveSkills(): MonsterSkill[] {
    return this.passiveSkills;
  }

}
