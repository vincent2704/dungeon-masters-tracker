export class DieType {

  private constructor(private name: string, private sides: number) {
  }

  static D4 = new DieType('d4', 4);
  static D6 = new DieType('d6', 6);
  static D8 = new DieType('d8', 8);
  static D10 = new DieType('d10', 10);
  static D12 = new DieType('d12', 12);
  static D20 = new DieType('d20', 20);
  static D100 = new DieType('d100', 100);

  getName(): string {
    return this.name;
  }

  getSides(): number {
    return this.sides;
  }

}
