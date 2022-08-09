import {MonsterType} from "./enums/monsterType";
import {MonsterSize} from "./monsterSize";
import {MonsterChallenge} from "./monsterChallenge";
import {MonsterId} from "./monsterId";

export class MonsterBasicInfo {
  constructor(private readonly id: MonsterId, private readonly name: string, private readonly size: MonsterSize,
              private readonly type: MonsterType, private readonly challengeRating: MonsterChallenge) {
  }

  getId(): MonsterId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getType(): MonsterType {
    return this.type;
  }

  getSize(): MonsterSize {
    return this.size;
  }

  getChallengeRating(): MonsterChallenge {
    return this.challengeRating;
  }
}
