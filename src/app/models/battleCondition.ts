import {Condition} from "./Condition";

export class BattleCondition {

  private permanent: boolean;

  constructor(
    private condition: Condition,
    private durationInTurns: number = 0) {

    this.permanent = durationInTurns <= 0;

  }

  getName() {
    return this.condition.getName();
  }

  getDescription() {
    return this.condition.getDescription();
  }

}
