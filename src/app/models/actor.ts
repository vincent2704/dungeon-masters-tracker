import {Condition} from "./Condition";

export class Actor {
  constructor(
    private name: string,
    private level: number,
    private maxHP: number,
    private currentHP: number = maxHP,
    private dead: boolean = false,
    private conditions: Condition[] = []
  ){}

  public getName() {
    return this.name;
  }

  public getMaxHP() {
    return this.maxHP;
  }
}
