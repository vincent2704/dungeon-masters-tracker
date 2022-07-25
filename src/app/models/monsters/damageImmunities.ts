import {DamageType} from "./enums/damageType";

// this class is basically the same as DamageResistances,
// but they are separate due to easier error avoidance during monster creation and readability
export class DamageImmunities {
  constructor(private immunities: DamageType[], private nonMagicalImmunities: DamageType[] = []) {
  }

  getImmunities() {
    return this.immunities
  }

  getNonMagicalImmunities() {
    return this.nonMagicalImmunities;
  }

}
