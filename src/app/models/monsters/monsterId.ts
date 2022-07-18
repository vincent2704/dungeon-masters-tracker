import {$localize} from "@angular/localize/init";

export class MonsterId {

  constructor(private readonly id: number, private readonly source: MonsterSource) {
  }

  static readonly AARAKOCRA_ID = new MonsterId(1, MonsterSource.MONSTER_MANUAL);

  getId(): number {
    return this.id
  }

  getSource(): string {
    return $localize`${this.source}`;
  }

}
