import {DieType} from "../common/dieType";

export class MonsterHitPoints {

  constructor(private hitPoints: number, private diceThrows: number,
              private dieType: DieType, private staticAdditionalHP: number = 0) {
  }

  getHitPoints(): number {
    return this.hitPoints;
  }

  getDiceThrows(): number {
    return this.diceThrows;
  }

  getDieType(): DieType {
    return this.dieType;
  }

  getStaticAdditionalHP(): number {
    return this.staticAdditionalHP;
  }

}
