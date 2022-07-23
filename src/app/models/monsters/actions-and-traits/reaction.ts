export class Reaction {

  private constructor(private name: string, private description: string) {
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  static readonly SPECTATOR_SPELL_REFLECTION = new Reaction('Spell Reflection',
    "If the spectator makes a successful saving " +
    "throw against a spell, or a spell attack misses it, the spectator " +
    "can choose another creature (including the spellcaster) it can " +
    "see within 30 feet of it. The spell targets the chosen creature " +
    "instead of the spectator. If the spell forced a saving throw, the " +
    "chosen creature makes its own save. If the spell was an attack, " +
    "the attack roll is rerolled against the chosen creature. ")

}
