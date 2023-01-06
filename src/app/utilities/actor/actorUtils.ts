import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {Actor} from "../../models/actors/actor";
import {BattleParticipantType} from "../../models/actors/battleParticipantType";

export class ActorUtils {

  static fromJsonArray(playerCharacters: PlayerCharacter[]): Actor[] {
    return playerCharacters.map(playerCharacter => this.fromJson(playerCharacter));
  }

  static fromJson(data: PlayerCharacter): Actor {
    let actor = new Actor(data.name, data.maxHp);

    actor.id = data.id;
    actor.currentHp = data.currentHp!;
    actor.level = data.level;
    actor.type = BattleParticipantType.PLAYER_CHARACTER;

    const timeOfDeath = data.timeOfDeathEpoch
      ? new Date(data.timeOfDeathEpoch)
      : undefined
    actor.setTimeOfDeath(timeOfDeath);
    actor.setResurrectionPenalty(data.resurrectionPenalty!);

    return actor;
  }

}
