import {Language} from "../common/language";
import {MeasurementSystem} from "../../services/measurement-system/measurement.system";

export class MonsterLanguages {

  constructor(private readonly languages: Language[], private readonly telepathyRadiusInFeet: number = 0) {
  }

  getLanguages(): Language[] {
    return this.languages;
  }

  getTelepathyRadius(): number {
    return MeasurementSystem.getFeetDistance(this.telepathyRadiusInFeet);
  }

}
