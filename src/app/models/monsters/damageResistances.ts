import {DamageType} from "./enums/damageType";

// this class is basically the same as DamageImmunities,
// but they are separate due to error avoidance during monster creation and readability
export class DamageResistances {
  constructor(private resistances: DamageType[], private nonMagicalResistances: DamageType[] = []) {
  }

  getResistances() {
    return this.resistances
  }

  getNonMagicalResistances() {
    return this.nonMagicalResistances;
  }

  // getResistances(): string {
  //   let resistances = this.resistances.join(', ')
  //   if(this.nonMagicalResistances.length > 0) {
  //     let nonMagicalResistances = this.nonMagicalResistances.join(', ')
  //     resistances+= `; ${nonMagicalResistances} from nonmagical weapons`
  //   }
  //   return resistances;
  // }

}
