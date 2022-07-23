export class MonsterType {

  private constructor(private readonly name: string) {
  }

  public getName(): string {
    return this.name;
  }

  static HUMANOID = new MonsterType('humanoid');
  static ABERRATION = new MonsterType('aberration');
  static CELESTIAL = new MonsterType('celestial');

}
