export class Npc {

  constructor(private readonly name: string, private description: string = '', private notes: string[] = []) {
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getNotes() {
    return this.notes;
  }

}
