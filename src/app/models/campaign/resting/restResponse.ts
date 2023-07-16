import { Campaign } from "../campaign";
import { PlayerCharacter } from "../../actors/playerCharacter";

export interface RestResponse {

  campaign: Campaign;
  playerCharacters: PlayerCharacter[];

}
