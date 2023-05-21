import { PlayerBattleFinishedRequest } from "../actors/playerBattleFinishedRequest";

export interface BattleFinishRequest {
  battleTimeInSeconds: number;
  playerBattleFinishedRequests: PlayerBattleFinishedRequest[];
}
