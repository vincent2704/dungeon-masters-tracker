import {Condition} from "./Condition";

export class BattleCondition {

  constructor(
    private condition: Condition,
    private permanent: boolean = true,
    private durationInTurns: number = 0) {
  }

  getName() {
    return this.condition.getName();
  }

  getDescription() {
    return this.condition.getDescription();
  }

}
