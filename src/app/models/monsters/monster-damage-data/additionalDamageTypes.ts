import {AdditionalDamageNote} from "./additionalDamageNote";
import {DamageType} from "./damageType";

export class AdditionalDamageTypes {
  constructor(private readonly damageTypes: DamageType[], private readonly damageNote: AdditionalDamageNote) {
  }

  getDamageTypes(): DamageType[] {
    return this.damageTypes;
  }

  getDamageNote(): AdditionalDamageNote {
    return this.damageNote;
  }
}
