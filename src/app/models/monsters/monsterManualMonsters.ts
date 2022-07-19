import {Monster} from "./monster";
import {MonsterId} from "./monsterId";
import {MonsterSize} from "./monsterSize";
import {MonsterType} from "./monsterType";
import {Alignment} from "./alignment";
import {AbilitySet} from "../common/abilitySet";
import {MonsterTag} from "./monsterTag";

export class MonsterManualMonsters {

  static AARAKOCRA = new Monster(
    MonsterId.AARAKOCRA_ID, 'Aarakocra', MonsterSize.MEDIUM, MonsterType.HUMANOID, [MonsterTag.AARAKOCRA],
    Alignment.NEUTRAL_GOOD, 12, 13, '20 ft., fly 50 ft.',
    new AbilitySet(10, 14, 10, 11, 12, 11)
  )

  static MONSTERS: Monster[] = [
    this.AARAKOCRA
  ]

}
