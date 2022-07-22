import {DamageType} from "./damageType";

export class DamageResistances {
  constructor(private alwaysResistant: DamageType[], private nonMagicalWeaponResistant: DamageType[] = []) {
  }

  getResistances(): string {
    let resistances = this.alwaysResistant.join(', ')
    if(this.nonMagicalWeaponResistant.length > 0) {
      let nonMagicalResistances = this.nonMagicalWeaponResistant.join(', ')
      resistances+= `; ${nonMagicalResistances} from nonmagical weapons`
    }
    return resistances;
  }

}
