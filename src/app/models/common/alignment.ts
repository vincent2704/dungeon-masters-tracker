export class Alignment {

  private constructor(private alignment: string) {
  }

  public getAlignment() {
    return this.alignment;
  }

  static readonly LAWFUL_GOOD = new Alignment('lawful good')
  static readonly NEUTRAL_GOOD = new Alignment('neutral good')
  static readonly LAWFUL_EVIL = new Alignment('lawful evil')

}
