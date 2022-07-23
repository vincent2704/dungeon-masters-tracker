export class Sense {
  private constructor(private name: string, private description: string) {
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  static readonly BLINDSIGHT = new Sense('Blindsight',
    "A monster with blindsight can perceive its surroundings without relying on sight, within a specific radius. "+
    "Creatures without eyes, such as grim locks and gray " +
    "oozes, typically have this special sense, as do creatures " +
    "with echolocation or heightened senses, such as bats and true dragons. " +
    "If a monster is naturally blind, it has a parenthetical " +
    "note to this effect, indicating that the radius of its " +
    "blindsight defines the maximum range of its perception. ");

  static readonly DARKVISION = new Sense('Darkvision',
    "A monster with darkvision can see in the dark within a " +
    "specific radius. The monster can see in dim light within " +
    "the radius as if it were bright light, and in darkness as " +
    "if it were dim light. The monster can't discern color in " +
    "darkness, only shades of gray. Many creatures that live " +
    "underground have this special sense.");

  static readonly TREMORSENSE = new Sense('Tremorsense',
    "A monster with tremorsense can detect and pinpoint " +
    "the origin of vibrations within a specific radius, " +
    "provided that the monster and the source of the " +
    "vibrations are in contact with the same ground or " +
    "substance. Tremorsense can't be used to detect flying or " +
    "incorporeal creatures. Many burrowing creatures, such " +
    "as ankhegs and umber hulks, have this special sense.");

  static readonly TRUESIGHT = new Sense('Truesight',
    "A monster with truesight can, out to a specific range, see " +
    "in normal and magical darkness, see invisible creatures " +
    "and objects, automatically detect visual illusions and " +
    "succeed on saving throws against them, and perceive " +
    "the original form of a shapechanger or a creature that " +
    "is transformed by magic. Furthermore, the monster can " +
    "see into the Ethereal Plane within the same range.")
}
