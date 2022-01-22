export class BattleActor {

  name: string;
  initiative: number;

  constructor(name: string, initiative = 0) {
    this.name = name;
    this.initiative = initiative;
  }

}
