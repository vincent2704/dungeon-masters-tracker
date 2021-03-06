export class SpecialTrait {

  private constructor(private readonly name: string, private readonly description: string) {
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  private static readonly AARAKOCRA_DIVE_ATTACK = new SpecialTrait('Dive Attack',
    "If the aarakocra is flying and dives at least 30 feet " +
    "straight toward a target and then hits it with a melee weapon " +
    "attack, the attack deals an extra 3 (1d6) damage to the target.");

  private static readonly ABOLETH_AMPHIBIOUS = new SpecialTrait('Amphibious',
    "The aboleth can breathe air and water");

  private static readonly ABOLETH_MUCOUS_CLOUD = new SpecialTrait('Mucous Cloud',
    "While underwater, the aboleth is surrounded " +
    "by transformative mucus. A creature that touches the aboleth " +
    "or that hits it with a melee attack while within 5 feet of it must " +
    "make a DC 14 Constitution savin g throw. On a failure, the " +
    "creature is diseased for 1d4 hours. The diseased creature can " +
    "breathe only underwater.")

  private static readonly ABOLETH_PROBING_TELEPATHY = new SpecialTrait('Probing Telepathy',
    "If a creature communicates telepathically " +
    "with the aboleth, the aboleth learns the creature's greatest " +
    "desires if the aboleth can see the creature.")

  private static readonly DEVA_ANGELIC_WEAPONS = new SpecialTrait('Angelic Weapons',
    " The deva's weapon attacks are magical. " +
    "When the deva hits with any weapon, the weapon deals an " +
    "extra 4d8 radiant damage (included in the attack).")

  private static readonly DEVA_INNATE_SPELLCASTING = new SpecialTrait('Innate Spellcasting',
    "The deva's spellcasting ability is Charisma " +
    "(spell save DC 17). The deva can innately cast the following " +
    "spells, requiring only verbal components: " +
    "At will: detect evil and good " +
    "1/day each: commune, raise dead")

  private static readonly DEVA_MAGIC_RESISTANCE = new SpecialTrait('Magic Resistance',
    "The deva has advantage on saving throws " +
    "against spells and other magical effects.")

  private static readonly PLANETAR_ANGELIC_WEAPONS = new SpecialTrait('Angelic Weapons',
    " The planetar's weapon attacks are magical. " +
    "When the planetar hits with any weapon, the weapon deals an " +
    "extra 5d8 radiant damage (included in the attack).")

  private static readonly PLANETAR_DIVINE_AWARENESS = new SpecialTrait('Divine Awareness',
    "The planetar knows if it hears a lie.")

  private static readonly PLANETAR_INNATE_SPELLCASTING = new SpecialTrait('Innate Spellcasting',
    "The planetar's spellcasting ability is " +
    "Charisma (spell save DC 20). The planetar can innately cast the " +
    "following spells, requiring no material components: " +
    "At will: detect evil and good, invisibility (self only) " +
    "3/day each: blade barrier, dispel evil and good, flame strike, " +
    "raise dead " +
    "1/day each: commune, control weather, insect plague")

  private static readonly PLANETAR_MAGIC_RESISTANCE = new SpecialTrait('Magic Resistance',
    "The planetar has advantage on saving " +
    "throws against spells and other magical effects.")

  static readonly NIMBLE_ESCAPE = new SpecialTrait('Nimble Escape',
    "The goblin can take the Disengage or Hide " +
    "action as a bonus action on each of its turns")

  private static readonly ANIMATED_ARMOR_ANTIMAGIC_SUSCEPTIBILITY = new SpecialTrait('Antimagic Susceptibility',
    "The armor is incapacitated while in " +
    "the area of an antimagic field. If targeted by dispel magic, the " +
    "armor must succeed on a Constitution saving throw against the " +
    "caster's spell save DC or fall unconscious for 1 minute")

  private static readonly ANIMATED_ARMOR_FALSE_APPEARANCE = new SpecialTrait('False Appearance',
    "While the armor remains motion less, it is " +
    "indistinguishable from a normal suit of armor.")

  private static readonly FLYING_SWORD_ANTIMAGIC_SUSCEPTIBILITY = new SpecialTrait('Antimagic Susceptibility',
    "The sword is incapacitated while in " +
    "the area of an anti magic field. If targeted by dispel magic, the " +
    "sword must succeed on a Constitution saving throw against " +
    "the caster's spell save DC or fall unconscious for 1 minute.")

  private static readonly FLYING_SWORD_FALSE_APPEARANCE = new SpecialTrait('False Appearance',
    "While the sword remains motionless and " +
    "isn't flying, it is indistinguishable from a normal sword. ")

  private static readonly RUG_OF_SMOTHERING_ANTIMAGIC_SUSCEPTIBILITY = new SpecialTrait('Antimagic Susceptibility',
    "The rug is incapacitated while in " +
    "the area of an antimagic field. If targeted by dispel magic, the " +
    "rug must succeed on a Constitution saving throw against the " +
    "caster's spell save DC or fall unconscious for 1 minute. ")

  private static readonly RUG_OF_SMOTHERING_DAMAGE_TRANSFER = new SpecialTrait('Damage Transfer',
    "While it is grappling a creature, the rug takes " +
    "only half the damage dealt to it, and the creature grappled by " +
    "the rug takes the other half.")

  private static readonly RUG_OF_SMOTHERING_FALSE_APPEARANCE = new SpecialTrait('False Appearance',
    "While the rug remains motionless, it is " +
    "indistinguishable from a normal rug.")

  private static readonly SOLAR_ANGELIC_WEAPONS = new SpecialTrait('Angelic Weapons',
    "The solar's weapon attacks are magical. " +
    "When the solar hits with any weapon, the weapon deals an " +
    "extra 6d8 radiant damage (included in the attack).")

  private static readonly SOLAR_DIVINE_AWARENESS = new SpecialTrait('Divine Awareness',
    "The solar knows if it hears a lie.")

  private static readonly SOLAR_INNATE_SPELLCASTING = new SpecialTrait('Innate Spellcasting',
    "The solar's spell casting ability is Charisma " +
    "(spell save DC 25). It can innately cast the following spells, " +
    "requiring no material components: " +
    "At will: detect evil and good, invisibility (self only) " +
    "3/day each: blade barrier, dispel evil and good, resurrection " +
    "1/day each: commune, control weather")

  private static readonly SOLAR_MAGIC_RESISTANCE = new SpecialTrait('Magic Resistance',
    "The solar has advantage on saving throws " +
    "against spells and other magical effects.")

  static readonly AARAKOCRA_SPECIAL_TRAITS = [this.AARAKOCRA_DIVE_ATTACK]

  static readonly ABOLETH_SPECIAL_TRAITS = [this.ABOLETH_AMPHIBIOUS, this.ABOLETH_MUCOUS_CLOUD, this.ABOLETH_PROBING_TELEPATHY];

  static readonly DEVA_SPECIAL_TRAITS = [this.DEVA_ANGELIC_WEAPONS, this.DEVA_INNATE_SPELLCASTING, this.DEVA_MAGIC_RESISTANCE]
  static readonly PLANETAR_SPECIAL_TRAITS = [SpecialTrait.PLANETAR_ANGELIC_WEAPONS, SpecialTrait.PLANETAR_DIVINE_AWARENESS,
    SpecialTrait.PLANETAR_INNATE_SPELLCASTING, SpecialTrait.PLANETAR_MAGIC_RESISTANCE];
  static readonly SOLAR_SPECIAL_TRAITS = [SpecialTrait.SOLAR_ANGELIC_WEAPONS, SpecialTrait.SOLAR_DIVINE_AWARENESS,
    SpecialTrait.SOLAR_INNATE_SPELLCASTING, SpecialTrait.SOLAR_MAGIC_RESISTANCE];

  static readonly ANIMATED_ARMOR_SPECIAL_TRAITS = [this.ANIMATED_ARMOR_ANTIMAGIC_SUSCEPTIBILITY, this.ANIMATED_ARMOR_FALSE_APPEARANCE]
  static readonly FLYING_SWORD_SPECIAL_TRAITS = [this.FLYING_SWORD_ANTIMAGIC_SUSCEPTIBILITY, this.FLYING_SWORD_FALSE_APPEARANCE]
  static readonly RUG_OF_SMOTHERING_SPECIAL_TRAITS = [this.RUG_OF_SMOTHERING_ANTIMAGIC_SUSCEPTIBILITY, this.RUG_OF_SMOTHERING_DAMAGE_TRANSFER,
    this.RUG_OF_SMOTHERING_FALSE_APPEARANCE]

}
