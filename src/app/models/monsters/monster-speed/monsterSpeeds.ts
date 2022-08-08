import {MonsterSpeed} from "./monsterSpeed";

export class MonsterSpeeds {

  constructor(private readonly landSpeed: MonsterSpeed,
              private readonly flyingSpeed: MonsterSpeed = new MonsterSpeed(0),
              private readonly swimmingSpeed: MonsterSpeed = new MonsterSpeed(0),
              private readonly burrowSpeed: MonsterSpeed = new MonsterSpeed(0),
              private readonly climbSpeed: MonsterSpeed = new MonsterSpeed(0)) {
  }

  getLandSpeed(): MonsterSpeed {
    return this.landSpeed;
  }

  getFlyingSpeed(): MonsterSpeed {
    return this.flyingSpeed;
  }

  getSwimmingSpeed(): MonsterSpeed {
    return this.swimmingSpeed;
  }

  getBurrowSpeed(): MonsterSpeed {
    return this.burrowSpeed;
  }

  getClimbSpeed(): MonsterSpeed {
    return this.climbSpeed;
  }

}
