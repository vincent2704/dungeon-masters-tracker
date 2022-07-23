import {Sense} from "../common/sense";
import {MeasurementSystem} from "../../services/measurement-system/measurement.system";

export class MonsterSense {
  constructor(private sense: Sense, private radiusInFeet: number) {
  }

  getSense() {
    return this.sense;
  }

  getRadius() {
    return MeasurementSystem.getFeetDistance(this.radiusInFeet);
  }
}
