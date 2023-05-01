import { Campaign } from "./campaign";
import { PlayerCharacter } from "../actors/playerCharacter";

export interface LongRestResponse {
  campaign: Campaign;
  playerCharacters: PlayerCharacter[];
}
