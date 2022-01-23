// object representing an actor during a single fight
export class BattleActor {

  name: string;
  initiative: number;
  unconscious: boolean;
  dead: boolean;
  private progressed: boolean;

  constructor(
    name: string,
    initiative: number = 0,
    unconscious: boolean = false,
    dead: boolean = false,
    progressed: boolean = false
  ) {
    this.name = name;
    this.initiative = initiative;
    this.unconscious = unconscious;
    this.dead = dead;
    this.progressed = progressed;
  }

  setActorProgress(progressed: boolean) {
    this.progressed = progressed;
  }

  isActorProgressed(): boolean {
    return this.progressed;
  }

}
