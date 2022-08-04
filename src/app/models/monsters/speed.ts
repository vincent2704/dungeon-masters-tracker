import {MeasurementSystem} from "../../services/measurement-system/measurement.system";
import {SpeedDescription} from "./speedDescription";

export class Speed {
  constructor(private readonly speedInFeet: number, private readonly description?: SpeedDescription) {

  }

  getSpeed(): number {
    return MeasurementSystem.getFeetDistance(this.speedInFeet);
  }

  getDescription(): string {
    return this.description!;
  }
}
