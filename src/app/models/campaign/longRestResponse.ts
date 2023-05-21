import { PlayerCharacter } from "../actors/playerCharacter";

export interface LongRestResponse {
  longRestTimeFinishedEpoch: number;
  playerCharacters: PlayerCharacter[];
}
