export class Condition {

  private constructor(private name: string, private description: string[]) {}

  public getName() {
    return this.name;
  }

  getDescription(): string[] {
    return this.description;
  }

  static BLINDED = new Condition(
    'Blinded',
    [
      "A blinded creature can't see and automatically fails any ability check that requires sight.",
      "Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage."
    ]
  );

  static CHARMED = new Condition(
    "Charmed",
    [
      "A charmed creature can’t Attack the charmer or target the charmer with harmful Abilities or magical Effects."
    ]);

  static DEAFENED = new Condition(
    "Deafened",
    [
      "A deafened creature can’t hear and automatically fails any ability check that requires hearing."
    ]);

  static FRIGHTENED = new Condition(
    "Frightened",
    [
      "A frightened creature has disadvantage on Ability Checks and Attack rolls while the source of its fear is within Line of Sight.",
      "The creature can’t willingly move closer to the source of its fear."
    ]
  );

  static GRAPPLED = new Condition(
    "Grappled",
    [
      "A grappled creature’s speed becomes 0, and it can’t benefit from any bonus to its speed.",
      "The condition ends if the Grappler is incapacitated (see the condition).",
      "The condition also ends if an Effect removes the grappled creature from the reach of the Grappler or Grappling Effect, such as when a creature is hurled away by the Thunderwave spell."
    ]
  );

  static INCAPACITATED = new Condition(
    "Incapacitated",
    [
      "An incapacitated creature can’t take Actions or Reactions."
    ]
  );

  static INVISIBLE = new Condition(
    "Invisible",
    [
      "An invisible creature is impossible to see without the aid of magic or a Special sense. For the Purpose of Hiding, the creature is heavily obscured. The creature’s Location can be detected by any noise it makes or any tracks it leaves.",
      "Attack rolls against the creature have disadvantage, and the creature’s Attack rolls have advantage."
    ]
  );

  static PARALYZED = new Condition(
    "Paralyzed",
    [
      "A paralyzed creature is incapacitated (see the condition) and can’t move or speak.",
      "The creature automatically fails Strength and Dexterity Saving Throws.",
      "Attack rolls against the creature have advantage.",
      "Any Attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
    ]
  );

  static PETRIFIED = new Condition(
    "Petrified",
    [
      "A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.",
      "The creature is incapacitated (see the condition), can’t move or speak, and is unaware of its surroundings.",
      "Attack rolls against the creature have advantage.",
      "The creature automatically fails Strength and Dexterity Saving Throws.",
      "The creature has Resistance to all damage.",
      "The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized."
    ]
  );

  static POISONED = new Condition(
    "Poisoned",
    [
      "A poisoned creature has disadvantage on attack rolls and ability checks."
    ]
  );

  static PRONE = new Condition(
    "Prone",
    [
      "A prone creature’s only Movement option is to crawl, unless it stands up and thereby ends the condition.",
      "The creature has disadvantage on Attack rolls.",
      "An Attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the Attack roll has disadvantage."
    ]
  );

  static RESTRAINED = new Condition(
    "Restrained",
    [
      "A restrained creature’s speed becomes 0, and it can’t benefit from any bonus to its speed.",
      "Attack rolls against the creature have advantage, and the creature’s Attack rolls have disadvantage.",
      "The creature has disadvantage on Dexterity Saving Throws."
    ]
  );

  static STUNNED = new Condition(
    "Stunned",
    [
      "A stunned creature is incapacitated (see the condition), can’t move, and can speak only falteringly.",
      "The creature automatically fails Strength and Dexterity Saving Throws.",
      "Attack rolls against the creature have advantage."
    ]
  );

  static UNCONSCIOUS = new Condition(
    "Unconscious",
    [
      "An unconscious creature is incapacitated (see the condition), can’t move or speak, and is unaware of its surroundings",
      "The creature drops whatever it’s holding and falls prone.",
      "The creature automatically fails Strength and Dexterity Saving Throws.",
      "Attack rolls against the creature have advantage.",
      "Any Attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
    ]
  );

  static EXHAUSTION = new Condition(
    "Exhaustion",
    [
      "Some special abilities and environmental hazards, such as " +
      "starvation and the long-term effects of freezing or scorching " +
      "temperatures, can lead to a special condition called " +
      "exhaustion. Exhaustion is measured in six levels. An effect " +
      "can give a creature one or more levels of exhaustion, as " +
      "specified in the effect’s description.",

      "If an already exhausted creature suffers another effect that " +
      "causes exhaustion, its current level of exhaustion increases " +
      "by the amount specified in the effect’s description.",

      "A creature suffers the effect of its current level of " +
      "exhaustion as well as all lower levels. For example, a " +
      "creature suffering level 2 exhaustion has its speed halved " +
      "and has disadvantage on ability checks.",

      "An effect that removes exhaustion reduces its level as " +
      "specified in the effect’s description, with all exhaustion " +
      "effects ending if a creature’s exhaustion level is " +
      "reduced below 1.",

      "Finishing a long rest reduces a creature’s exhaustion level " +
      "by 1, provided that the creature has also ingested some " +
      "food and drink. Also, being raised from the dead reduces a " +
      "creature’s exhaustion level by 1."
    ]
  );

  static EXHAUSTION_LEVELS = new Map<number, string>(
    [
      [1, 'Disadvantage on ability checks'],
      [2, 'Speed halved'],
      [3, 'Disadvantage on attack rolls and saving throws'],
      [4, 'Hit point maximum halved'],
      [5, 'Speed reduced to 0'],
      [6, 'Death'],
    ]
  )

  static ALL_CONDITIONS: Condition[] = [
    Condition.BLINDED, Condition.CHARMED, Condition.DEAFENED, Condition.FRIGHTENED, Condition.GRAPPLED,
    Condition.INCAPACITATED, Condition.INVISIBLE, Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED,
    Condition.PRONE, Condition.RESTRAINED, Condition.STUNNED, Condition.UNCONSCIOUS, Condition.EXHAUSTION
  ];

  static NON_MAGICAL_CONDITIONS: Condition[] = [
    Condition.BLINDED, Condition.DEAFENED, Condition.FRIGHTENED, Condition.GRAPPLED, Condition.INCAPACITATED,
    Condition.PARALYZED, Condition.POISONED, Condition.PRONE, Condition.RESTRAINED, Condition.STUNNED,
    Condition.UNCONSCIOUS, Condition.EXHAUSTION
  ];

  static MAGICAL_CONDITIONS: Condition[] = [
    Condition.CHARMED, Condition.INVISIBLE, Condition.PETRIFIED
  ];

}
