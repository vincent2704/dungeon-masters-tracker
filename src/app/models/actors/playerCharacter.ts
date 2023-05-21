import {BackendCondition} from "./backendCondition";

export interface PlayerCharacter {

  id?: number,
  level: number,
  name: string,
  maxHp: number,
  availableHitDice: number,
  currentHp?: number,
  resurrectionPenalty?: number,
  timeOfDeathEpoch?: number,
  playerConditions?: BackendCondition[],

}



