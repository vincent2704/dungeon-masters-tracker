import {BackendCondition} from "./backendCondition";

export interface PlayerCharacter {

  id?: number
  name: string,
  maxHp: number,
  currentHp?: number,
  level: number,
  resurrectionPenalty?: number,
  timeOfDeath?: Date,
  conditions?: BackendCondition[]

}



