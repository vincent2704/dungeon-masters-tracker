import {Condition} from "./Condition";

export class BattleCondition {

  readonly permanent: boolean;

  constructor(
    private condition: Condition,
    private durationInTurns: number = 0) {

    this.permanent = durationInTurns <= 0;

  }

  getName(): string {
    return this.condition.getName();
  }

  getDescription(): string[] {
    return this.condition.getDescription();
  }

  isPermanent(): boolean {
    return this.permanent;
  }

  getDurationInTurns(): number {
    return this.durationInTurns;
  }

  setDurationInTurns(duration: number): void {
    this.durationInTurns = duration;
  }

}
