import {StringUtils} from "../../../utilities/string/stringUtils";

export class ActionDescriptionPoint {
  constructor(private readonly title: string,
              private readonly text: string) {
  }

  getTitle(): string {
    return this.title;
  }

  getText(): string {
    return StringUtils.formatDescription(this.text);
  }

  static readonly SPECTATOR_EYE_RAYS_DESCRIPTION_POINTS = [
    new ActionDescriptionPoint("Confusion Ray",
      "The target must succeed on a DC 13 " +
      "Wisdom saving throw, or it can't take reactions until the end " +
      "of its next turn. On its turn, the target can't move, and it uses " +
      "its action to make a melee or ranged attack against a randomly " +
      "determined creature within range. If the target can't attack, it " +
      "does nothing on its turn."),
    new ActionDescriptionPoint("Paralyzing Ray",
      "The target must succeed on a DC 13 " +
      "Constitution saving throw or be paralyzed for 1 minute. The " +
      "target can repeat the saving throw at the end of each of its " +
      "turns, ending the effect on itself on a success."),
    new ActionDescriptionPoint("Fear Ray",
      "The target must succeed on a DC 13 Wisdom " +
      "saving throw or be frightened for 1 minute. The target can " +
      "repeat the saving throw at the end of each of its turns, with " +
      "disadvantage if the spectator is visible to the target, ending the " +
      "effect on itself on a success."
    ),
    new ActionDescriptionPoint("Wounding Ray",
      "The target must make a DC 13 Constitution " +
      "saving throw, taking 16 (3d10) necrotic damage on a failed " +
      "save, or half as much damage on a successful one."
    )
  ];

}
