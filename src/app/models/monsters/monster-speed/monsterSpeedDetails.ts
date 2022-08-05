import {MonsterSpeedNote} from "./monsterSpeedNote";
import {MeasurementSystem} from "../../../services/measurement-system/measurement.system";

export class MonsterSpeedDetails {

  constructor(private readonly note: MonsterSpeedNote, private readonly distanceInFeet?: number) {
  }

  getDetails(): string {
    if(this.distanceInFeet) {
      return `${MeasurementSystem.getFeetDistance(this.distanceInFeet)} ${MeasurementSystem.getMeasurementUnit()} ${this.note}`;
    }
    return this.note;
  }

}
