import {MonsterBasicInfo} from "./monsterBasicInfo";
import {MonsterDetails} from "./monsterDetails";

export class Monster {

  constructor(
    private readonly basicInfo: MonsterBasicInfo,
    private readonly details?: MonsterDetails
  ) {}

  getBasicInfo(): MonsterBasicInfo {
    return this.basicInfo;
  }

  getDetails(): MonsterDetails {
    return this.details!;
  }

}
