import {MeasurementSystem} from "../../services/measurement-system/measurement.system";
import {MonsterSpeedNote} from "./enums/monsterSpeedNote";

export class MonsterSpeed {
  constructor(private readonly speedInFeet: number, private readonly description?: MonsterSpeedNote) {

  }

  getSpeed(): number {
    return MeasurementSystem.getFeetDistance(this.speedInFeet);
  }

  getDescription(): string {
    return this.description!;
  }
}
