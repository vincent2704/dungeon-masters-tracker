import { Campaign } from "./campaign";
import { PlayerCharacter } from "../actors/playerCharacter";

export interface BattleFinishedResponse {
  campaign: Campaign;
  playerCharacters: PlayerCharacter[];
}
