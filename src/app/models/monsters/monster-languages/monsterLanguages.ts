import {MeasurementSystem} from "../../../services/measurement-system/measurement.system";
import {SingleMonsterLanguage} from "./singleMonsterLanguage";

export class MonsterLanguages {

  constructor(private readonly languages: SingleMonsterLanguage[], private readonly telepathyRadiusInFeet: number = 0,
              private readonly speaks: boolean = true) {
  }

  getLanguages(): SingleMonsterLanguage[] {
    return this.languages;
  }

  getTelepathyRadius(): number {
    return MeasurementSystem.getFeetDistance(this.telepathyRadiusInFeet);
  }

  canSpeak(): boolean {
    return this.speaks;
  }

}
