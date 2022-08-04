import {Speed} from "./speed";

export class MonsterSpeed {

  constructor(private landSpeed: Speed, private flyingSpeed: Speed = new Speed(0),
              private swimmingSpeed: Speed = new Speed(0)) {
  }

  getLandSpeed(): Speed {
    return this.landSpeed;
  }

  getFlyingSpeed(): Speed {
    return this.flyingSpeed;
  }

  getSwimmingSpeed(): Speed {
    return this.swimmingSpeed;
  }

}
