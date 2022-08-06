import {StringUtils} from "../../../utilities/string/stringUtils";

export class LegendaryAction {

  private constructor(private name: string, private description: string) {
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return StringUtils.formatDescription(this.description);
  }

  private static readonly ABOLETH_DETECT = new LegendaryAction('Detect',
    "The aboleth makes a Wisdom (Perception) check.");

  private static readonly ABOLETH_TAIL_SWIPE = new LegendaryAction('Tail Swipe',
    "The aboleth makes one tail attack.")

  private static readonly ABOLETH_PSYCHIC_DRAIN = new LegendaryAction('Psychic Drain (Costs 2 Actions)',
    "One creature charmed by the " +
    "aboleth takes 10 (3d6) psychic damage, and the aboleth " +
    "regains hit points equal to the damage the creature takes.")

  private static readonly SOLAR_TELEPORT = new LegendaryAction('Teleport',
    "The solar magically teleports, along with any " +
    "equipment it is wearing or carrying, up to {120} {feet} to an " +
    "unoccupied space it can see.")

  private static readonly SOLAR_SEARING_BURST = new LegendaryAction('Searing Burst (Costs 2 Actions)',
    "The solar emits magical, divine " +
    "energy. Each creature of its choice in a {10}-{foot} radius must " +
    "make a DC 23 Dexterity saving throw, taking 14 (4d6) fire " +
    "damage plus 14 (4d6) radiant damage on a failed save, or half " +
    "as much damage on a successful one."
  )

  private static readonly SOLAR_BLINDING_GAZE = new LegendaryAction('Blinding Gaze (Costs 3 Actions)',
    "The solar targets one creature " +
    "it can see within {30} {feet} of it. If the target can see it, the " +
    "target must succeed on a DC 15 Constitution saving throw " +
    "or be blinded until magic such as the lesser restoration spell " +
    "removes the blindness.")

  static readonly ABOLETH_LEGENDARY_ACTIONS = [LegendaryAction.ABOLETH_DETECT, LegendaryAction.ABOLETH_TAIL_SWIPE,
    LegendaryAction.ABOLETH_PSYCHIC_DRAIN]
  static readonly SOLAR_LEGENDARY_ACTIONS = [this.SOLAR_TELEPORT, this.SOLAR_SEARING_BURST, this.SOLAR_BLINDING_GAZE]

}
