export class BattleActor {

  private  readonly name?: string;
  initiative: number;

  constructor(name: string) {
    this.name = name;
    this.initiative = 0;
  }

  public getName() {
    return this.name;
  }

}
