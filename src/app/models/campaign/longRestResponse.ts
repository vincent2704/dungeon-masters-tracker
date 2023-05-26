import { PlayerCharacter } from "../actors/playerCharacter";
import { CampaignDateTime } from "./campaignDateTime";

export interface LongRestResponse {
  longRestDateTimeFinished: CampaignDateTime;
  playerCharacters: PlayerCharacter[];
}
