import {DamageType} from "./damageType";
import {AdditionalDamageTypes} from "./additionalDamageTypes";

// this class is basically the same as DamageResistances,
// but they are separate due to easier error avoidance during monster creation and readability
export class DamageImmunities {
  constructor(private immunities: DamageType[] = [],
              private additionalImmunities?: AdditionalDamageTypes) {
  }

  getImmunities(): DamageType[] {
    return this.immunities
  }

  getAdditionalImmunities(): AdditionalDamageTypes {
    return this.additionalImmunities!;
  }

}
