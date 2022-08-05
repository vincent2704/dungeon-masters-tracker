import {DamageType} from "./damageType";
import {AdditionalImmunities} from "../additionalImmunities";

// this class is basically the same as DamageResistances,
// but they are separate due to easier error avoidance during monster creation and readability
export class DamageImmunities {
  constructor(private immunities: DamageType[],
              private additionalImmunities?: AdditionalImmunities) {
  }

  getImmunities(): DamageType[] {
    return this.immunities
  }

  getAdditionalImmunities(): AdditionalImmunities {
    return this.additionalImmunities!;
  }

}
