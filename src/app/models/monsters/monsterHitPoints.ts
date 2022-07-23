export class MonsterHitPoints {

  constructor(private hitPoints: number, private diceThrows: number,
              private dieType: number, private staticAdditionalHP: number = 0) {
  }

  getHitPoints(): number {
    return this.hitPoints;
  }

  getDiceThrows(): number {
    return this.diceThrows;
  }

  getDieType(): number {
    return this.dieType;
  }

  getStaticAdditionalHP(): number {
    return this.staticAdditionalHP;
  }

}
