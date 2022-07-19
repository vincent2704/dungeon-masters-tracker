import {Skill} from "./skill";

export class Ability {

  private constructor(private name: string, private skills: Skill[]) {
  }

  static CHARISMA = new Ability('Charisma',
    [Skill.DECEPTION, Skill.INTIMIDATION, Skill.PERFORMANCE, Skill.PERSUASION]);

  static CONSTITUTION = new Ability('Constitution', []);

  static DEXTERITY = new Ability('Dexterity',
    [Skill.ACROBATICS, Skill.SLEIGHT_OF_HAND, Skill.STEALTH]);

  static INTELLIGENCE = new Ability('Intelligence',
    [Skill.ARCANA, Skill.HISTORY, Skill.INVESTIGATION, Skill.NATURE, Skill.RELIGION]);

  static STRENGTH = new Ability('Strength',
    [Skill.ATHLETICS]);

  static WISDOM = new Ability('Wisdom',
    [Skill.ANIMAL_HANDLING, Skill.INSIGHT, Skill.MEDICINE, Skill.PERCEPTION, Skill.SURVIVAL]);

}
