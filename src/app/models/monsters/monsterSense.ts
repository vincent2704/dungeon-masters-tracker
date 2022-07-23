import {Sense} from "../common/sense";

export class MonsterSense {
  constructor(private sense: Sense, private radius: string) {
  }

  getSense() {
    return this.sense;
  }

  getRadius() {
    return this.radius;
  }
}
