export class Condition {

  private constructor(private name: string, private description: string[]) {
  }

  public getName() {
    return this.name;
  }

  static BLINDED = new Condition(
    'Blinded',
    [
      "A blinded creature can't see and automatically fails any ability check that requires sight.",
      "Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage."
    ]
  );

  static POISONED = new Condition(
    'Poisoned',
    [
      "A poisoned creature has disadvantage on attack rolls and ability checks."
    ]
  );
}
