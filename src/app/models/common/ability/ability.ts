import {Skill} from "../skill";

export class Ability {

  private constructor(private name: string, private nameShort: string, private skills: Skill[]) {
  }

  static readonly CHARISMA = new Ability('Charisma', 'CHA',
    [Skill.DECEPTION, Skill.INTIMIDATION, Skill.PERFORMANCE, Skill.PERSUASION]);

  static readonly CONSTITUTION = new Ability('Constitution', 'CON', []);

  static readonly DEXTERITY = new Ability('Dexterity', 'DEX',
    [Skill.ACROBATICS, Skill.SLEIGHT_OF_HAND, Skill.STEALTH]);

  static readonly INTELLIGENCE = new Ability('Intelligence', 'INT',
    [Skill.ARCANA, Skill.HISTORY, Skill.INVESTIGATION, Skill.NATURE, Skill.RELIGION]);

  static readonly STRENGTH = new Ability('Strength', 'STR',
    [Skill.ATHLETICS]);

  static readonly WISDOM = new Ability('Wisdom', 'WIS',
    [Skill.ANIMAL_HANDLING, Skill.INSIGHT, Skill.MEDICINE, Skill.PERCEPTION, Skill.SURVIVAL]);

  getName(): string {
    return this.name;
  }

  getNameShort(): string {
    return this.nameShort;
  }

  // source - Basic Rules, pg. 60
  static readonly ABILITY_MODIFIERS: Map<number, number> = new Map<number, number>([
    [1, -5],
    [2, -4],
    [3, -4],
    [4, -3],
    [5, -3],
    [6, -2],
    [7, -2],
    [8, -1],
    [9, -1],
    [10, 0],

    [11, 0],
    [12, 1],
    [13, 1],
    [14, 2],
    [15, 2],
    [16, 3],
    [17, 3],
    [18, 4],
    [19, 4],
    [20, 5],

    [21, 5],
    [22, 6],
    [23, 6],
    [24, 7],
    [25, 7],
    [26, 8],
    [27, 8],
    [28, 9],
    [29, 9],
    [30, 10],
  ]);

}
