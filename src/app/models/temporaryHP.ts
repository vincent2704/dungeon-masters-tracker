export class TemporaryHP {

  private permanent: boolean;

  constructor(private hitPoints: number, private turnsLeft: number = 0) {
    this.permanent = turnsLeft <= 0;
  }

  getHitPoints() {
    return this.hitPoints;
  }

  getTurnsLeft() {
    return this.turnsLeft;
  }

  hasTemporaryHitPoints() {
    return this.hitPoints > 0;
  }

  decrementDuration() {
    if (this.permanent) {
      return;
    }
    if (this.turnsLeft > 0) {
      this.turnsLeft -= 1;
    }
    if (this.turnsLeft == 0) {
      this.reset();
    }
  }

  subtractTemporaryHitPoints(damage: number) {
    if(damage > this.hitPoints) {
      this.reset();
    } else {
      this.hitPoints -= damage;
    }
  }

  private reset() {
    this.hitPoints = 0;
    this.turnsLeft = 0;
    this.permanent = true;
  }
}
