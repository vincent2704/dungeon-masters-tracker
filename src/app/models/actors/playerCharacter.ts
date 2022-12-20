import {BackendCondition} from "./backendCondition";

export interface PlayerCharacter {

  id?: number,
  level: number,
  name: string,
  maxHp: number,
  currentHp?: number,
  resurrectionPenalty?: number,
  timeOfDeathEpoch?: number,
  conditions?: BackendCondition[],
  availableHitDice?: number,

}



