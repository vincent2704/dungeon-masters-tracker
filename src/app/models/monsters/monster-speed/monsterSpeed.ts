import {MeasurementSystem} from "../../../services/measurement-system/measurement.system";
import {MonsterSpeedDetails} from "./monsterSpeedDetails";

export class MonsterSpeed {
  constructor(private readonly speedInFeet: number, private readonly details?: MonsterSpeedDetails) {

  }

  getSpeed(): number {
    return MeasurementSystem.getFeetDistance(this.speedInFeet);
  }

  getDetails(): MonsterSpeedDetails {
    return this.details!;
  }
}
