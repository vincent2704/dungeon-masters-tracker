import {Sense} from "../common/sense";
import {MeasurementSystem} from "../../services/measurement-system/measurement.system";
import {MonsterSenseNote} from "./enums/monsterSenseNote";

export class MonsterSense {
  constructor(private readonly sense: Sense, private readonly radiusInFeet: number,
              private readonly note?: MonsterSenseNote) {}

  getSense(): Sense {
    return this.sense;
  }

  getRadius(): number {
    return MeasurementSystem.getFeetDistance(this.radiusInFeet);
  }

  getNote(): string {
    return this.note!;
  }
}
