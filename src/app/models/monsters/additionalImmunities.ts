import {AdditionalDamageNote} from "./monster-damage-data/additionalDamageNote";
import {DamageType} from "./monster-damage-data/damageType";

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
