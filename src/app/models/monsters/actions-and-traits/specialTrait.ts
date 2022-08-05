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

  private static readonly AZER_HEATED_BODY = new SpecialTrait('Heated Body',
    "A creature that touches the azer or hits it with a " +
    "melee attack while within 5 feet of it takes 5 (1d10) fire damage.")

  private static readonly AZER_HEATED_WEAPONS = new SpecialTrait('Heated Weapons',
    "When the azer hits with a metal melee " +
    "weapon, it deals an extra 3 (1d6) fire damage (included in " +
    "the attack).")

  private static readonly AZER_ILLUMINATION = new SpecialTrait('Illumination',
    "The azer sheds bright light in a 10-foot radius and " +
    "dim light for an additional 10 feet.")


  private static readonly BANSHEE_DETECT_LIFE = new SpecialTrait('Detect Life',
    "The banshee can magically sense the presence " +
    "of living creatures up to 5 miles away. She knows the general " +
    "direction they're in but not their exact locations.")

  private static readonly BANSHEE_INCORPOREAL_MOVEMENT = new SpecialTrait('Incorporeal Movement',
    "The banshee can move through other " +
    "creatures and objects as if they were difficult terrain. She takes " +
    "5 (1d10) force damage if she ends her turn inside an object. ")

  private static readonly BUGBEAR_BRUTE = new SpecialTrait('Brute',
    "A melee weapon deals one extra die of its damage when the " +
    "bugbear hits with it (included in the attack).")

  private static readonly BUGBEAR_SURPRISE_ATTACK = new SpecialTrait('Surprise Attack',
    "If the bugbear surprises a creature and hits it " +
    "with an attack during the first round of combat, the target takes " +
    "an extra 7 (2d6) damage from the attack.")

  private static readonly GOBLIN_NIMBLE_ESCAPE = new SpecialTrait('Nimble Escape',
    "The goblin can take the Disengage or Hide " +
    "action as a bonus action on each of its turns")

  private static readonly WEREWOLF_SHAPECHANGER = new SpecialTrait('Shapechanger',
    "The werewolf can use its action to polymorph " +
    "into a wolf-humanoid hybrid or into a wolf, or back into its true " +
    "form, which is humanoid. Its statistics, other than its AC, are " +
    "the same in each form. ArcJy equipment it, is wearing or carrying " +
    "isn't transformed. It reverts to its true form if it dies.")

  private static readonly WEREWOLF_KEEN_HEARING_AND_SMELL = new SpecialTrait('Keen Hearing and Smell',
    "The werewolf has advantage on " +
    "Wisdom (Perception) checks that rely on hearing or smell.")

  private static readonly NIGHTMARE_CONFER_FIRE_RESISTANCE = new SpecialTrait('Confer Fire Resistance',
    "The nightmare can grant resistance to " +
    "fire damage to anyone riding it.");

  private static readonly NIGHTMARE_ILLUMINATION = new SpecialTrait('Illumination',
    "The nightmare sheds bright light in a 10-foot " +
    "radius and dim light for an additional 10 feet.")

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

  static readonly AZER_SPECIAL_TRAITS = [this.AZER_HEATED_BODY, this.AZER_HEATED_WEAPONS, this.AZER_ILLUMINATION];
  static readonly BANSHEE_SPECIAL_TRAITS = [this.BANSHEE_DETECT_LIFE, this.BANSHEE_INCORPOREAL_MOVEMENT]
  static readonly BUGBEAR_SPECIAL_TRAITS = [this.BUGBEAR_BRUTE, this.BUGBEAR_SURPRISE_ATTACK];
  static readonly GOBLIN_SPECIAL_TRAITS = [this.GOBLIN_NIMBLE_ESCAPE];
  static readonly WEREWOLF_SPECIAL_TRAITS = [this.WEREWOLF_SHAPECHANGER, this.WEREWOLF_KEEN_HEARING_AND_SMELL];
  static readonly NIGHTMARE_SPECIAL_TRAITS = [this.NIGHTMARE_CONFER_FIRE_RESISTANCE, this.NIGHTMARE_ILLUMINATION];

}
