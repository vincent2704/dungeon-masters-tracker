// object representing an actor during a single fight
import {Condition} from "./Condition";

export class BattleActor {

  name: string;
  initiative: number;
  unconscious: boolean;
  dead: boolean;
  progressed: boolean;
  conditions: Condition[];

  constructor(
    name: string,
    initiative: number = 0,
    unconscious: boolean = false,
    dead: boolean = false,
    progressed: boolean = false,
    conditions: Condition[] = []
  ) {
    this.name = name;
    this.initiative = initiative;
    this.unconscious = unconscious;
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
