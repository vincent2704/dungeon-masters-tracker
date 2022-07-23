import {MonsterSource} from "./monsterSource";

export class MonsterId {

  constructor(private readonly id: number, private readonly source: MonsterSource) {
  }

  static readonly AARAKOCRA_ID = new MonsterId(1, MonsterSource.MONSTER_MANUAL);
  static readonly ABOLETH_ID = new MonsterId(2, MonsterSource.MONSTER_MANUAL);
  static readonly DEVA_ID = new MonsterId(3, MonsterSource.MONSTER_MANUAL);

  static readonly SPECTATOR_ID = new MonsterId(16, MonsterSource.MONSTER_MANUAL);

  getId(): number {
    return this.id
  }

  getSource(): string {
    return this.source;
  }

}
