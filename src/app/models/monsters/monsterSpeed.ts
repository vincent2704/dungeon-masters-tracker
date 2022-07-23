export class MonsterSpeed {

  constructor(private landSpeed: number, private flyingSpeed = 0, private swimmingSpeed = 0) {
  }

  getLandSpeed(): number {
    return this.landSpeed;
  }

  getFlyingSpeed(): number {
    return this.flyingSpeed;
  }

  getSwimmingSpeed(): number {
    return this.swimmingSpeed;
  }

}
