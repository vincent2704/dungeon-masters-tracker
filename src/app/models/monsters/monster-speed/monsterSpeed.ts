import {MeasurementSystem} from "../../../services/measurement-system/measurement.system";
import {MonsterSpeedDetails} from "./monsterSpeedDetails";

export class MonsterSpeed {
  constructor(private readonly speedInFeet: number, private readonly description?: MonsterSpeedDetails) {

  }

  getSpeed(): number {
    return MeasurementSystem.getFeetDistance(this.speedInFeet);
  }

  getDescription(): MonsterSpeedDetails {
    return this.description!;
  }
}
