import {AdditionalDamageNote} from "./enums/additionalDamageNote";
import {DamageType} from "./enums/damageType";

export class AdditionalImmunities {
  constructor(private readonly damageTypes: DamageType[], private readonly damageNote: AdditionalDamageNote) {
  }

  getDamageTypes(): DamageType[] {
    return this.damageTypes;
  }

  getDamageNote(): AdditionalDamageNote {
    return this.damageNote;
  }
}
