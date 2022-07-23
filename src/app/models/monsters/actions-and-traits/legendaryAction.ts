export class LegendaryAction {

  private constructor(private name: string, private description: string) {
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  private static readonly ABOLETH_DETECT = new LegendaryAction('Detect',
    "The aboleth makes a Wisdom (Perception) check.");

  private static readonly ABOLETH_TAIL_SWIPE = new LegendaryAction('Tail Swipe',
    "The aboleth makes one tail attack. ")

  private static readonly ABOLETH_PSYCHIC_DRAIN = new LegendaryAction('Psychic Drain (Costs 2 Actions)',
    "One creature charmed by the " +
    "aboleth takes 10 (3d6) psychic damage, and the aboleth " +
    "regains hit points equal to the damage the creature takes. ")

  static readonly ABOLETH_LEGENDARY_ACTIONS = [LegendaryAction.ABOLETH_DETECT, LegendaryAction.ABOLETH_TAIL_SWIPE,
    LegendaryAction.ABOLETH_PSYCHIC_DRAIN]

}
