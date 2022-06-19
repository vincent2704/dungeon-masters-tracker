export class ShortRestInput {
  hitDiceToSpend: number;
  hpToAdd: number;

  constructor(hitDiceToSpend = 0, hpToAdd = 0) {
    this.hitDiceToSpend = hitDiceToSpend;
    this.hpToAdd = hpToAdd;
  }
}
