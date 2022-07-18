import {$localize} from "@angular/localize/init";

export class MonsterType {

  private constructor(private name: string) {
  }

  public getName(): string {
    return $localize`${this.name}`;
  }

  static HUMANOID = new MonsterType('Humanoid');

}
