import {Condition} from "./Condition";

export class BattleCondition {

  constructor(
    private condition: Condition,
    private permanent: boolean,
    private durationInTurns: number) {
  }

  getName() {
    return this.condition.getDescription();
  }

  getDescription() {
    return this.condition.getDescription();
  }

}
