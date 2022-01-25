// object representing an actor during a single fight
import {Condition} from "./Condition";

export class BattleActor {

  name: string;
  maxHP: number;
  currentHP: number;
  initiative: number;
  dead: boolean;
  private progressed: boolean;
  conditions: Condition[];

  constructor(
    name: string,
    maxHP: number,
    currentHP: number = maxHP,
    initiative: number = 0,
    unconscious: boolean = false,
    dead: boolean = false,
    progressed: boolean = false,
    conditions: Condition[] = []
  ) {
    this.name = name;
    this.maxHP = maxHP;
    this.currentHP = currentHP;
    this.initiative = initiative;
    this.dead = dead;
    this.progressed = progressed;
    this.conditions = conditions;
  }

  setActorProgress(progressed: boolean) {
    this.progressed = progressed;
  }

  isActorProgressed(): boolean {
    return this.progressed;
  }

}
