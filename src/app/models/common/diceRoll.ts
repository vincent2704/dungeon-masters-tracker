import {DieType} from "./dieType";

export class DiceRoll {

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

  toString(): string {
    let damageRollString: string = `${this.hitPoints} ` +
      `(${this.diceThrows}${this.dieType.getName()}`
    let staticAdditionalHp = this.getStaticAdditionalHP();
    if (staticAdditionalHp == 0) {
      damageRollString += `)`;
    } else {
      if(staticAdditionalHp > 0) {
        damageRollString += ` + ${staticAdditionalHp})`;
      } else {
        staticAdditionalHp = Math.abs(staticAdditionalHp)
        damageRollString += ` - ${staticAdditionalHp})`;
      }
    }
    return damageRollString;
  }

}
