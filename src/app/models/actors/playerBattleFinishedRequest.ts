export interface PlayerBattleFinishedRequest {
  playerId: number,
  playerCurrentHp: number,
  timeOfDeath?: Date
}
