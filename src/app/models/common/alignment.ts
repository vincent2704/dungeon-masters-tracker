export class Alignment {

  private constructor(private alignment: string) {
  }

  public getAlignment() {
    return this.alignment;
  }

  static LAWFUL_GOOD = new Alignment('lawful good')
  static NEUTRAL_GOOD = new Alignment('neutral good')
  static LAWFUL_EVIL = new Alignment('lawful evil')

}
