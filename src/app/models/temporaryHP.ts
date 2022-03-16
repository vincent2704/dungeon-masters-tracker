/*
  Because this class is an integral part of Actor, it's tested within actor.spec.ts classes
 */
export class TemporaryHP {

  constructor(private hitPoints: number, private turnsLeft: number) {
  }

  getHitPoints() {
    return this.hitPoints;
  }

  hasTemporaryHitPoints() {
    return this.hitPoints > 0 && this.turnsLeft > 0;
  }

  decrementDuration() {
    if(this.turnsLeft > 0) {
      this.turnsLeft -= 1;
    }
    if(this.turnsLeft == 0) {
      this.hitPoints = 0;
    }
  }
}
