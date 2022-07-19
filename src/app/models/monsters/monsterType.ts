export class MonsterType {

  private constructor(private name: string) {
  }

  public getName(): string {
    return this.name;
  }

  static HUMANOID = new MonsterType('Humanoid');

}
