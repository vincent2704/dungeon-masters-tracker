import {StringUtils} from "../../../utilities/string/stringUtils";

export class Action {

  private constructor(private readonly name: string, private readonly description: string) {
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return StringUtils.formatDescription(this.description);
  }

  private static readonly AARAKOCRA_TALON = new Action('Talon',
    "Melee Weapon Attack: +4 to hit, reach {5} {ft.}, one target. " +
    "Hit: 4 (ld4 + 2) slashing damage.")

  private static readonly AARAKOCRA_JAVELIN = new Action('Javelin',
    "Melee or Ranged Weapon Attack: +4 to hit, reach {5} {ft.} or " +
    "range 30/120 {ft.}, one target. Hit: 5 (1d6 + 2) piercing damage.")

  private static readonly ABOLETH_MULTIATTACK = new Action('Multiattack',
    "The aboleth makes three tentacle attacks")

  private static readonly ABOLETH_TENTACLE = new Action('Tentacle',
    "Melee Weapon Attack: +9 to hit, reach {10} {ft.}, one " +
    "target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a " +
    "creature, it must succeed on a DC 14 Constitution saving throw " +
    "or become diseased. The disease has no effect for 1 minute and " +
    "can be removed by any magic that cures disease. After 1 minute, " +
    "the diseased creature's skin becomes translucent and slimy, the " +
    "creature can't regain hit points unless it is underwater, and the " +
    "disease can be removed only by heal or another disease-curing " +
    "spell of 6th level or higher. When the creature is outside a body " +
    "of water, it takes 6 (1d12) acid damage every 10 minutes unless " +
    "moisture is applied to the skin before 10 minutes have passed")

  private static readonly ABOLETH_TAIL = new Action('Tail',
    "Melee Weapon Attack: +9 to hit, reach {10} {ft.} one target. " +
    "Hit: 15 (3d6 + 5) bludgeoning damage.")

  private static readonly ABOLETH_ENSLAVE = new Action('Enslave (3/Day)',
    "The aboleth targets one creature it can see " +
    "within {30} {feet} of it. The target must succeed on a DC 14 " +
    "Wisdom saving throw or be magically charmed by the aboleth " +
    "until the aboleth dies or until it is on a different plane of " +
    "existence from the target. The charmed target is under the " +
    "aboleth's control and can't take reactions, and the aboleth and " +
    "the target can communicate telepathically with each other over " +
    "any distance. " +
    "Whenever the charmed target takes damage, the target can " +
    "repeat the saving throw. On a success, the effect ends. No " +
    "more than once every 24 hours, the target can also repeat the " +
    "saving throw when it is at least 1 mile away from the aboleth.")

  private static readonly DEVA_MULTIATTACK = new Action('Multiattack',
    "The deva makes two melee attacks.")

  private static readonly DEVA_MACE = new Action('Mace',
    "Melee Weapon Attack: +8 to hit, reach {5} {ft.}, one " +
    "target. Hit: 7 (1d6 + 4) bludgeoning damage plus 18 (4d8) " +
    "radiant damage.")

  private static readonly DEVA_HEALING_TOUCH = new Action('Healing Touch (3/Day)',
    "The deva touches another creature. " +
    "The target magically regains 20 (4d8 + 2) hit points and is freed " +
    "from any curse, disease, poison, blindness, or deafness.")

  private static readonly DEVA_CHANGE_SHAPE = new Action('Change Shape',
    "The deva magically polymorphs into a " +
    "humanoid or beast that has a challenge rating equal to or " +
    "less than its own, or back into its true form. It reverts to its " +
    "true form if it dies. Any equipment it is wearing or carrying is " +
    "absorbed or borne by the new form (the deva's choice). " +
    "In a new form, the deva retains its game statistics and ability " +
    "to speak, but its AC, movement modes, Strength, Dexterity, " +
    "and special senses are replaced by those of the new form, and " +
    "it gains any statistics and capabilities (except class features, " +
    "legendary actions, and lair actions) that the new form has but " +
    "that it lacks.")

  private static readonly PLANETAR_MULTIATTACK = new Action('Multiattack',
    "The planetar makes two melee attacks.")

  private static readonly PLANETAR_GREATSWORD = new Action('Greatsword',
    "Melee Weapon Attack: +12 to hit, reach {5} {ft.}, " +
    "one target. Hit: 21 (4d6 + 7) slashing damage plus 22 (5d8) " +
    "radiant damage.")

  private static readonly PLANETAR_HEALING_TOUCH = new Action('Healing Touch (4/Day)',
    "The planetar touches another creature. " +
    "The target magically regains 30 (6d8 + 3) hit points and is freed " +
    "from any curse, disease, poison, blindness, or deafness.")

  private static readonly SOLAR_MULTIATTACK = new Action('Multiattack',
    "The solar makes two greatsword attacks.")

  private static readonly SOLAR_GREATSWORD = new Action('Greatsword',
    "Melee Weapon Attack: +15 to hit, reach {5} {ft.}, " +
    "one target. Hit: 22 (4d6 + 8) slashing damage plus 27 (6d8) " +
    "radiant damage.")

  private static readonly SOLAR_SLAYING_LONGBOW = new Action('Slaying Longbow',
    "Ranged Weapon Attack: +13 to hit, range " +
    "{120}/{600} {ft.}, one target. Hit: 15 (2d8 + 6) piercing damage plus " +
    "27 (6d8) radiant damage. If the target is a creature that has 100 " +
    "hit points or fewer, it must succeed on a DC 15 Constitution " +
    "saving throw or die.")

  private static readonly SOLAR_FLYING_SWORD = new Action('Flying Sword',
    "The solar releases its greatsword to hover " +
    "magically in an unoccupied space within {5} {feet} of it. If the solar " +
    "can see the sword, the solar can mentally command it as a " +
    "bonus action to fly up to {50} {feet} and either make one attack " +
    "against a target or return to the solar's hands. If the hovering " +
    "sword is targeted by any effect, the solar is considered to be " +
    "holding it. The hovering sword falls if the solar dies.")

  private static readonly SOLAR_HEALING_TOUCH = new Action('Healing Touch (4/Day)',
    "The solar touches another creature. " +
    "The target magically regains 40 (8d8 + 4) hit points and is freed " +
    "from any curse, disease, poison, blindness, or deafness.")

  private static readonly ANIMATED_ARMOR_MULTIATTACK = new Action('Multiattack',
    "The armor makes two melee attacks.")

  private static readonly ANIMATED_ARMOR_SLAM = new Action('Slam',
    "Melee Weapon Attack: +4 to hit, reach {5} {ft.}, one target. " +
    "Hit: 5 (1d6 + 2) bludgeoning damage.")

  private static readonly FLYING_SWORD_LONGSWORD = new Action('Longsword',
    "Melee Weapon Attack: +3 to hit, reach {5} {ft.}, one " +
    "target. Hit: 5 (1d8 + 1) slashing damage.")

  private static readonly RUG_OF_SMOTHERING_SMOTHER = new Action('Smother',
    "Melee Weapon Attack: +5 to hit, reach {5} {ft.}, one " +
    "Medium or smaller creature. Hit: The creature is grappled " +
    "(escape DC 13). Until this grapple ends, the target is restrained, " +
    "blinded, and at risk of suffocating, and the rug can't smother " +
    "another target. In addition, at the start of each of the target's " +
    "turns, the target takes 10 (2d6 + 3) bludgeoning damage.")

  private static readonly ANKHEG_BITE = new Action('Bite',
    "Melee Weapon Attack: +5 to hit, reach {5} {ft.}, one target. " +
    "Hit: 9 (2d6 + 3) slashing damage plus 3 (1d6) acid damage. If " +
    "the target is a Large or smaller creature, it is grappled (escape " +
    "DC 13). Until this grapple ends, the ankheg can bite only the " +
    "grappled creature and has advantage on attack rolls to do so.")

  private static readonly ANKHEG_ACID_SPRAY = new Action('Acid Spray (Recharge 6)',
    " The ankheg spits acid in a line that is " +
    "{30} {feet} long and {5} {feet} wide, provided that it has no creature " +
    "grappled. Each creature in that line must make a DC 13 " +
    "Dexterity saving throw, taking 10 (3d6) acid damage on a failed " +
    "save, or half as much damage on a successful one.")

  private static readonly AZER_WARHAMMER = new Action('Warhammer',
    "Melee Weapon Attack: +5 to hit, reach {5} {ft.}, one " +
    "target. Hit: 7 (1d8 + 3) bludgeoning damage, or 8 (1d10 + 3) " +
    "bludgeoning damage if used with two hands to make a melee " +
    "attack, plus 3 (1d6) fire damage.")

  private static readonly BANSHEE_CORRUPTING_TOUCH = new Action('Corrupting Touch',
    "Melee Spell Attack: +4 to hit, reach {5} {ft.}, one " +
    "target. Hit: 12 (3d6 + 2) necrotic damage.")

  private static readonly BANSHEE_HORRIFYING_VISAGE = new Action('Horrifying Visage',
    "Each non-undead creature within {60} {feet} of " +
    "the banshee that can see her must succeed on a DC 13 Wisdom " +
    "saving throw or be frightened for 1 minute. A frightened target " +
    "can repeat the saving throw at the end of each of its turns, " +
    "with disadvantage if the banshee is within line of sight, ending " +
    "the effect on itself on a success. If a target's saving throw is " +
    "successful or the effect ends for it, the target is immune to the " +
    "banshee's Horrifying Visage for the next 24 hours.")

  private static readonly BANSHEE_WAIL = new Action('Wail (1/Day)',
    "The banshee releases a mournful wail, provided " +
    "that she isn't in sunlight. This wail has no effect on constructs " +
    "and undead. All other creatures within {30} {feet} of her that can " +
    "hear her must make a DC 13 Constitution saving throw. On " +
    "a failure, a creature drops to 0 hit points. On a success, a " +
    "creature takes 10 (3d6) psychic damage.")

  private static readonly BASILISK_BITE = new Action('Bite',
    "Melee Weapon Attack: +5 to hit, reach {5} {ft.}, one target. " +
    "Hit: 10 (2d6 + 3) piercing damage plus 7 (2d6) poison damage.")

  private static readonly BEHIR_MULTIATTACK = new Action('Multiattack',
    "The behir makes two attacks: one with its bite and " +
    "one to constrict.")

  private static readonly BEHIR_BITE = new Action('Bite',
    "Melee Weapon Attack: +10 to hit, reach {10} {ft.}, one target. " +
    "Hit: 22 (3d10 + 6) piercing damage.")

  private static readonly BEHIR_CONSTRICT = new Action('Constrict',
    "Melee Weapon Attack: + 10 to hit, reach {5} {ft}., one " +
    "Large or smaller creature. Hit: 17 (2d10 + 6) bludgeoning " +
    "damage plus 17 (2d10 + 6) slashing damage. The target is " +
    "grappled (escape DC 16) if the behir isn't already constricting a " +
    "creature, and the target is restrained until this grapple ends.")

  private static readonly BEHIR_LIGHTNING_BREATH = new Action('Lightning Breath (Recharge 5-6)',
    "The behir exhales a line of " +
    "lightning that is {20} {feet} long and {5} {feet} wide. Each creature " +
    "in that line must make a DC 16 Dexterity saving throw, taking " +
    "66 (12d10) lightning damage on a failed save, or half as much " +
    "damage on a successful one.")

  private static readonly BEHIR_SWALLOW = new Action('Swallow',
    "The behir makes one bite attack against a Medium or " +
    "smaller target it is grappling. If the attack hits, the target is also " +
    "swallowed, and the grapple ends. While swallowed, the target " +
    "is blinded and restrained, it has total cover against attacks " +
    "and other effects outside the behir, and it takes 21 (6d6) acid " +
    "damage at the start of each of the behir's turns. A behir can " +
    "have only one creature swallowed at a time. " +
    "If the behir takes 30 damage or more on a single turn from " +
    "the swallowed creature, the behir must succeed on a DC 14 " +
    "Constitution saving throw at the end of that turn or regurgitate " +
    "the creature, which falls prone in a space within {10} {feet} of " +
    "the behir. If the behir dies, a swallowed creature is no longer " +
    "restrained by it and can escape from the corpse by using {15} {feet} " +
    "of movement, exiting prone.")

  private static readonly SPECTATOR_BITE = new Action('Bite',
    "Melee Weapon Attack: +1 to hit, reach {5} {ft.}, one target. " +
    "Hit: 2 (1d6- 1) piercing damage.")

  private static readonly SPECTATOR_EYE_RAYS = new Action('Eye Rays',
    "The spectator shoots up to two of the following " +
    "magical eye rays at one or two creatures it can see within {90} " +
    "{feet} of it. It can use each ray only once on a turn. " +
    "7. Confusion Ray. The target must succeed on a DC 13 " +
    "Wisdom saving throw, or it can't take reactions until the end " +
    "of its next turn. On its turn, the target can't move, and it uses " +
    "its action to make a melee or ranged attack against a randomly " +
    "determined creature within range. If the target can't attack, it " +
    "does nothing on its turn. " +
    "2. Paralyzing Ray. The target must succeed on a DC 13 " +
    "Constitution saving throw or be paralyzed for 1 minute. The " +
    "target can repeat the saving throw at the end of each of its " +
    "turns, ending the effect on itself on a success. " +
    "3. Fear Ray. The target must succeed on a DC 13 Wisdom " +
    "saving throw or be frightened for 1 minute. The target can " +
    "repeat the saving throw at the end of each of its turns, with " +
    "disadvantage if the spectator is visible to the target, ending the " +
    "effect on itself on a success. " +
    "4. Wounding Ray. The target must make a DC 13 Constitution " +
    "saving throw, taking 16 (3d10) necrotic damage on a failed " +
    "save, or half as much damage on a successful one.")

  private static readonly SPECTATOR_CREATE_FOOD_AND_WATER = new Action('Create Food and Water',
    "The spectator magically creates " +
    "enough food and water to sustain itself for 24 hours.")

  private static readonly BUGBEAR_MORNINGSTAR = new Action('Morningstar',
    "Melee Weapon Attack: +4 to hit, reach {5} {ft.}, one " +
    "target. Hit: 11 (2d8 + 2) piercing damage.")

  private static readonly BUGBEAR_JAVELIN = new Action('Javelin',
    "Melee or Ranged Weapon Attack: +4 to hit, reach {5} {ft.} or " +
    "range {30}/{120} {ft.}, one target. Hit: 9 (2d6 + 2) piercing damage " +
    "in melee or 5 (1d6 + 2) piercing damage at range.")

  private static readonly GOBLIN_SCIMITAR = new Action('Scimitar',
    "Melee Weapon Attack: +4 to hit, reach {5} {ft.}, one " +
    "target. Hit: 5 (1d6 + 2) slashing damage.")

  private static readonly GOBLIN_SHORTBOW = new Action('Shortbow',
    "Ranged Weapon Attack: +4 to hit, range {80}/{320} {ft.}, " +
    "Hit: 5 (1d6 + 2) piercing damage.")

  private static readonly WEREWOLF_MULTIATTACK = new Action('Multiattack (Humanoid or Hybrid Form Only)',
    "The werewolf " +
    "makes two attacks: one with its bite and one with its " +
    "claws or spear.")

  private static readonly WEREWOLF_BITE = new Action('Bite (Wolf or Hybrid Form Only)',
    "Melee Weapon Attack: " +
    "+4 to hit, reach {5} {ft.}, one target. Hit: 6 (1d8 + 2) piercing " +
    "damage. If the target is a humanoid, it must succeed on a " +
    "DC 12 Constitution saving throw or be cursed with werewolf " +
    "lycanthropy.")

  private static readonly WEREWOLF_CLAWS = new Action('Claws (Hybrid Form Only)',
    "Melee Weapon Attack: +4 to hit, " +
    "reach {5} {ft.}, one creature. Hit: 7 (2d4 + 2) slashing damage.")

  private static readonly WEREWOLF_SPEAR = new Action('Spear (Humanoid Form Only)',
    "Melee or Ranged Weapon Attack: " +
    "+4 to hit, reach {5} {ft.} or range {20}/{60} {ft.}, one creature. Hit: 5 (1d6 " +
    "+ 2) piercing damage, or 6 (1d8 + 2) piercing damage if used " +
    "with two hands to make a melee attack.")

  private static readonly NIGHTMARE_HOOVES = new Action('Hooves',
    "Melee Weapon Attack: +6 to hit, reach {5} {ft.}, one " +
    "target. Hit: 13 (2d8 + 4) bludgeoning damage plus 7 (2d6) " +
    "fire damage.")

  private static readonly NIGHTMARE_ETHEREAL_STRIDE = new Action('Ethereal Stride',
    "The nightmare and up to three willing creatures " +
    "within {5} {feet} of it magically enter the Ethereal Plane from the " +
    "Material Plane, or vice versa.")

  static AARAKOCRA_ACTIONS = [this.AARAKOCRA_TALON, this.AARAKOCRA_JAVELIN];
  static ABOLETH_ACTIONS = [this.ABOLETH_MULTIATTACK, this.ABOLETH_TENTACLE, this.ABOLETH_TAIL, this.ABOLETH_ENSLAVE];
  static DEVA_ACTIONS = [this.DEVA_MULTIATTACK, this.DEVA_MACE, this.DEVA_HEALING_TOUCH, this.DEVA_CHANGE_SHAPE];
  static PLANETAR_ACTIONS = [this.PLANETAR_MULTIATTACK, this.PLANETAR_GREATSWORD, this.PLANETAR_HEALING_TOUCH];
  static SOLAR_ACTIONS = [this.SOLAR_MULTIATTACK, this.SOLAR_GREATSWORD, this.SOLAR_SLAYING_LONGBOW,
    this.SOLAR_FLYING_SWORD, this.SOLAR_HEALING_TOUCH]

  static ANIMATED_ARMOR_ACTIONS = [this.ANIMATED_ARMOR_MULTIATTACK, this.ANIMATED_ARMOR_SLAM];
  static FLYING_SWORD_ACTIONS = [this.FLYING_SWORD_LONGSWORD];
  static RUG_OF_SMOTHERING_ACTIONS = [this.RUG_OF_SMOTHERING_SMOTHER];
  static ANKHEG_ACTIONS = [this.ANKHEG_BITE, this.ANKHEG_ACID_SPRAY];
  static AZER_ACTIONS = [this.AZER_WARHAMMER];

  static BANSHEE_ACTIONS = [this.BANSHEE_CORRUPTING_TOUCH, this.BANSHEE_HORRIFYING_VISAGE, this.BANSHEE_WAIL];
  static BASILISK_ACTIONS = [this.BASILISK_BITE];
  static BEHIR_ACTIONS = [this.BEHIR_MULTIATTACK, this.BEHIR_BITE, this.BEHIR_CONSTRICT, this.BEHIR_LIGHTNING_BREATH,
    this.BEHIR_SWALLOW]

  static SPECTATOR_ACTIONS = [this.SPECTATOR_BITE, this.SPECTATOR_EYE_RAYS, this.SPECTATOR_CREATE_FOOD_AND_WATER];

  static BUGBEAR_ACTIONS = [this.BUGBEAR_MORNINGSTAR, this.BUGBEAR_JAVELIN];

  static GOBLIN_ACTIONS = [this.GOBLIN_SCIMITAR, this.GOBLIN_SHORTBOW];

  static WEREWOLF_ACTIONS = [this.WEREWOLF_MULTIATTACK, this.WEREWOLF_BITE, this.WEREWOLF_CLAWS, this.WEREWOLF_SPEAR];
  static NIGHTMARE_ACTIONS = [this.NIGHTMARE_HOOVES, this.NIGHTMARE_ETHEREAL_STRIDE];

}
