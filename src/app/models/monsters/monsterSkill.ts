import {Skill} from "../common/skill";

export class MonsterSkill {

  constructor(private skill: Skill, private score: number) {
  }

  getSkill() {
    return this.skill;
  }

  getScore() {
    return this.score;
  }
}
