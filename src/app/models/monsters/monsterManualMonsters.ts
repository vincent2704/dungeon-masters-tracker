import {Monster} from "./monster";
import {MonsterId} from "./monsterId";
import {MonsterSize} from "./monsterSize";
import {MonsterType} from "./monsterType";
import {Alignment} from "./alignment";

export class MonsterManualMonsters {

  static AARAKOCRA = new Monster(
    MonsterId.AARAKOCRA_ID, 'Aarakocra', MonsterSize.MEDIUM, MonsterType.HUMANOID, Alignment.NEUTRAL_GOOD
  )

  static MONSTERS: Monster[] = [
    this.AARAKOCRA
  ]

}
