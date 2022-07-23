export class Action {

  private constructor(private readonly name: string, private readonly description: string) {
  }

  getName(){
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  private static AARAKOCRA_TALON = new Action('Talon',
    "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. " +
    "Hit: 4 (ld4 + 2) slashing damage .")

  private static AARAKOCRA_JAVELIN = new Action('Javelin',
    "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or " +
    "range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage.")

  private static ABOLETH_MULTIATTACK = new Action('Multiattack',
    "The aboleth makes three tentacle attacks")

  private static ABOLETH_TENTACLE = new Action('Tentacle',
    " Melee Weapon Attack: +9 to hit, reach 10ft., one " +
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

  private static ABOLETH_TAIL = new Action('Tail',
    "Melee Weapon Attack: +9 to hit, reach 10ft. one target. " +
    "Hit: 15 (3d6 + 5) bludgeoning damage.")

  private static ABOLETH_ENSLAVE = new Action('Enslave (3/Day)',
    "The aboleth targets one creature it can see " +
    "within 30 feet of it. The target must succeed on a DC 14 " +
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

  private static DEVA_MULTIATTACK = new Action('Multiattack',
    "The deva makes two melee attacks.")

  private static DEVA_MACE = new Action('Mace',
    "Melee Weapon Attack: +8 to hit, reach 5 ft., one " +
    "target. Hit: 7 (1d6 + 4) bludgeoning damage plus 18 (4d8) " +
    "radiant damage. ")

  private static DEVA_HEALING_TOUCH = new Action('Healing Touch (3/Day)',
    "The deva touches another creature. " +
    "The target magically regains 20 (4d8 + 2) hit points and is freed " +
    "from any curse, disease, poison, blindness, or deafness.")

  private static DEVA_CHANGE_SHAPE = new Action('Change Shape',
    "The deva magically polymorphs into a " +
    "humanoid or beast that has a challenge rating equal to or " +
    "less than its own, or back into its true form. It reverts to its " +
    "true form if it dies. Any equipment it is wearing or carrying is " +
    "absorbed or borne by the new form (the deva's choice). " +
    "In a new form, the deva retains its game statistics and ability " +
    "to speak, but its AC, movement modes, Strength, Dexterity, " +
    "and special senses are repl aced by those of the new form, and " +
    "it gains any statistics and capabilities (except class features, " +
    "legendary actions, and lair actions) that the new form has but " +
    "that it lacks.")

  private static SPECTATOR_BITE = new Action('Bite',
    "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. " +
    "Hit: 2 (1d6- 1) piercing damage. ")

  private static SPECTATOR_EYE_RAYS = new Action('Eye Rays',
    "The spectator shoots up to two of the following " +
    "magical eye rays at one or two creatures it can see within 90 " +
    "feet of it. It can use each ray only once on a turn. " +
    "7. Confusion Ray. The target must succeed on a DC 13 " +
    "Wisdom saving throw, or it can't take reactions until the end " +
    "of its next turn. On its turn, the target can't move, and it uses " +
    "its action to make a melee or ranged attack against a randomly " +
    "determined creature within range. If the target can't attack, it " +
    "does nothing on its turn. \n\t" +
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
    "save, or half as much damage on a successful one. ")

  private static SPECTATOR_CREATE_FOOD_AND_WATER = new Action('Create Food and Water',
    "The spectator magically creates " +
    "enough food and water to sustain itself for 24 hours. ")

  static AARAKOCRA_ACTIONS = [this.AARAKOCRA_TALON, Action.AARAKOCRA_JAVELIN]
  static ABOLETH_ACTIONS = [this.ABOLETH_MULTIATTACK, Action.ABOLETH_TENTACLE, Action.ABOLETH_TAIL, Action.ABOLETH_ENSLAVE];
  static DEVA_ACTIONS = [Action.DEVA_MULTIATTACK, Action.DEVA_MACE, Action.DEVA_HEALING_TOUCH, Action.DEVA_CHANGE_SHAPE]

  static SPECTATOR_ACTIONS = [Action.SPECTATOR_BITE, Action.SPECTATOR_EYE_RAYS, Action.SPECTATOR_CREATE_FOOD_AND_WATER]

}
