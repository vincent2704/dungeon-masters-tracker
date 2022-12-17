import {BackendCondition} from "./backendCondition";

export interface PlayerCharacter {

  id?: number,
  level: number,
  name: string,
  maxHp: number,
  currentHp?: number,
  resurrectionPenalty?: number,
  timeOfDeath?: Date,
  conditions?: BackendCondition[],
  availableHitDice?: number,
  lastLongRestTime?: Date

}



