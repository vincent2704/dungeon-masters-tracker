import {Condition} from "./Condition";

export class BattleCondition {

  readonly permanent: boolean;

  constructor(
    private condition: Condition,
    private durationInTurns: number = 0,
    private exhaustionLevel: number = 0) {

    this.permanent = durationInTurns <= 0;
  }

  getCondition() {
    return this.condition;
  }

  getName(): string {
    return this.condition.getName();
  }

  getDescription(): string[] {
    return this.condition.getDescription();
  }

  getExhaustionLevel(): number {
    return this.exhaustionLevel;
  }

  setExhaustionLevel(exhaustionLevel: number): void {
    this.exhaustionLevel = exhaustionLevel;
  }

  isPermanent(): boolean {
    return this.permanent;
  }

  getDurationInTurns(): number {
    return this.durationInTurns;
  }

  decrementDuration(): void {
    if(this.durationInTurns > 0) {
      this.durationInTurns -= 1;
    }
  }

}
