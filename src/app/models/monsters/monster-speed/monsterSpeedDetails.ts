import {MonsterSpeedNote} from "./monsterSpeedNote";
import {MeasurementSystem} from "../../../services/measurement-system/measurement.system";

export class MonsterSpeedDetails {

  constructor(private readonly note: MonsterSpeedNote, private readonly distanceInFeet?: number) {
  }

  getNote(): MonsterSpeedNote {
    return this.note;
  }

  getDistance(): number {
    return MeasurementSystem.getFeetDistance(this.distanceInFeet!);
  }

}
