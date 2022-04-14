export class Npc {

  constructor(private readonly name: string, private description: string) {
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

}
