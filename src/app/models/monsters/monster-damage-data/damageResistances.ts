import {DamageType} from "./damageType";
import {AdditionalDamageTypes} from "./additionalDamageTypes";

// this class is basically the same as DamageImmunities,
// but they are separate due to error avoidance during monster creation and readability
export class DamageResistances {
  constructor(private resistances: DamageType[] = [],
              private additionalResistances?: AdditionalDamageTypes) {
  }

  getResistances() {
    return this.resistances
  }

  getAdditionalResistances() {
    return this.additionalResistances;
  }

}
