import {MonsterSize} from "./monsterSize";
import {MonsterId} from "./monsterId";
import {MonsterType} from "./monsterType";
import {Alignment} from "./alignment";

export class Monster {

  constructor(
    private id: MonsterId, private name: string, private size: MonsterSize, private type: MonsterType,
    private alignment: Alignment
  ) {}

  static AARAKOCRA = new Monster(
    MonsterId.AARAKOCRA_ID, 'Aarakocra', MonsterSize.MEDIUM, MonsterType.HUMANOID, Alignment.NEUTRAL_GOOD
  )
}
