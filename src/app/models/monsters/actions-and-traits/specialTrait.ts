// these are often monster-specific and could be created in
// Monster constructor, but they're listed here because of
// code readability and some of them might repeat
export class SpecialTrait {

  private constructor(private readonly name: string, private readonly description: string) {
  }

  getName(){
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  static readonly DIVE_ATTACK = new SpecialTrait('Dive Attack',
    "If the aarakocra is flying and dives at least 30 feet " +
    "straight toward a target and then hits it with a melee weapon " +
    "attack, the attack deals an extra 3 (1d6) damage to the target.");

  static readonly AMPHIBIOUS = new SpecialTrait('Amphibious',
    "The aboleth can breathe air and water");

  static readonly MUCOUS_CLOUD = new SpecialTrait('Mucous Cloud',
    "While underwater, the aboleth is surrounded " +
    "by transformative mucus. A creature that touches the aboleth " +
    "or that hits it with a melee attack while within 5 feet of it must " +
    "make a DC 14 Constitution savin g throw. On a failure, the " +
    "creature is diseased for 1d4 hours. The diseased creature can " +
    "breathe only underwater.")

  static readonly PROBING_TELEPATHY = new SpecialTrait('Probing Telepathy',
    "If a creature communicates telepathically " +
    "with the aboleth, the aboleth learns the creature's greatest " +
    "desires if the aboleth can see the creature.")

  static readonly ANGELIC_WEAPONS = new SpecialTrait('Angelic Weapons',
    " The deva's weapon attacks are magical. " +
    "When the deva hits with any weapon, the weapon deals an " +
    "extra 4d8 radiant damage (included in the attack).")

  static readonly INNATE_SPELLCASTING = new SpecialTrait('Innate Spellcasting',
    "The deva's spellcasting ability is Charisma " +
    "(spell save DC 17). The deva can innately cast the following " +
    "spells, requiring only verbal components: " +
    "At will: detect evil and good " +
    "1/day each: commune, raise dead")

  static readonly MAGIC_RESISTANCE = new SpecialTrait('Magic Resistance',
    "The deva has advantage on saving throws " +
    "against spells and other magical effects. ")

}
