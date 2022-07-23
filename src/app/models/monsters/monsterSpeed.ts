import {MeasurementSystem} from "../../services/measurement-system/measurement.system";

export class MonsterSpeed {

  constructor(private landSpeedInFeet: number, private flyingSpeedInFeet = 0,
              private swimmingSpeedInFeet = 0) {
  }

  getLandSpeed(): number {
    return MeasurementSystem.getFeetDistance(this.landSpeedInFeet);
  }

  getFlyingSpeed(): number {
    return MeasurementSystem.getFeetDistance(this.flyingSpeedInFeet);
  }

  getSwimmingSpeed(): number {
    return MeasurementSystem.getFeetDistance(this.swimmingSpeedInFeet);
  }

}
