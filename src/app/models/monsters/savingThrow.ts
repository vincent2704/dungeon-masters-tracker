import {Ability} from "../common/ability/ability";

export class SavingThrow {

  public constructor(private ability: Ability, private modifier: number) {
  }

  getAbility() {
    return this.ability;
  }

  getModifier() {
    return this.modifier;
  }

}
