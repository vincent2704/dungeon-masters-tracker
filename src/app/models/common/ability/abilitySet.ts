import {AbilityScore} from "./abilityScore";
import {Ability} from "./ability";

export class AbilitySet {

  private strength: AbilityScore;
  private dexterity: AbilityScore;
  private constitution: AbilityScore;
  private intelligence: AbilityScore;
  private wisdom: AbilityScore;
  private charisma: AbilityScore;

  // order is not alphabetical but the same as stated in DnD books
  constructor(
    strengthScore: number, dexterityScore: number, constitutionScore: number,
    intelligenceScore: number, wisdomScore: number, charismaScore: number) {

    this.strength = new AbilityScore(Ability.STRENGTH, strengthScore);
    this.dexterity = new AbilityScore(Ability.DEXTERITY, dexterityScore);
    this.constitution = new AbilityScore(Ability.CONSTITUTION, constitutionScore);
    this.intelligence = new AbilityScore(Ability.INTELLIGENCE, intelligenceScore);
    this.wisdom = new AbilityScore(Ability.WISDOM, wisdomScore);
    this.charisma = new AbilityScore(Ability.CHARISMA, charismaScore);
  }

  getAbilityScore(ability: Ability): AbilityScore {
    switch (ability) {
      case Ability.STRENGTH: {
        return this.strength;
      }
      case Ability.DEXTERITY: {
        return this.dexterity;
      }
      case Ability.CONSTITUTION: {
        return this.constitution;
      }
      case Ability.INTELLIGENCE: {
        return this.intelligence;
      }
      case Ability.WISDOM: {
        return this.wisdom;
      }
      default: {
        return this.charisma;
      }
    }
  }

  getAbilityScores(): AbilityScore[] {
    return [this.strength, this.dexterity, this.constitution, this.intelligence, this.wisdom, this.charisma]
  }

}