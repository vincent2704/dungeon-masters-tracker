import {Ability} from "./ability";

export class AbilityScore {

  constructor(private ability: Ability, private score: number) {
  }

  getAbility() {
    return this.ability;
  }

  getScore() {
    return this.score;
  }

}
