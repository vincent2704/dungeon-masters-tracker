import {MeasurementSystem} from "../../../services/measurement-system/measurement.system";
import {MonsterSpeedDetails} from "./monsterSpeedDetails";
import {MovementType} from "./movementType";

export class MonsterSpeed {
  constructor(private readonly speedInFeet: number,
              private readonly movementType: MovementType = MovementType.LAND,
              private readonly details?: MonsterSpeedDetails) {

  }

  getMovementType(): MovementType {
    return this.movementType;
  }

  getSpeed(): number {
    return MeasurementSystem.getFeetDistance(this.speedInFeet);
  }

  getDetails(): MonsterSpeedDetails {
    return this.details!;
  }
}
