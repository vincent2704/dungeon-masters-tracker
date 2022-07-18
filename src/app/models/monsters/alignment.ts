import {$localize} from "@angular/localize/init";

export class Alignment {

  private constructor(private alignment: string) {
  }

  public getAlignment() {
    return $localize`${this.alignment}`;
  }

  static NEUTRAL_GOOD = new Alignment('Neutral good')

}
