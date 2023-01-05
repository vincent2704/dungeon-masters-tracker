import {Component, Input, OnInit} from '@angular/core';
import {AbilitySet} from "../../../models/common/ability/abilitySet";
import {CombatUtils} from "../../../services/combat/combatUtils";
import {Ability} from "../../../models/common/ability/ability";
import {AbilityScore} from "../../../models/common/ability/abilityScore";

@Component({
  selector: 'app-saving-throws',
  templateUrl: './saving-throws.component.html',
  styleUrls: ['./saving-throws.component.css']
})
export class SavingThrowsComponent implements OnInit {

  @Input()
  abilitySet!: AbilitySet;

  throwResult?: string;
  abilityThrown?: Ability;

  constructor() {
  }

  ngOnInit(): void {
  }

  rollSavingThrow(abilityNameShort: string): void {
    const abilityScore = this.abilitySet.getAbilityScore(abilityNameShort);

    this.abilityThrown = abilityScore.getAbility();
    this.throwResult = `${CombatUtils.rollSavingThrow(abilityScore)}`
  }

  getAbilityInfo(abilityScore: AbilityScore): string {
    const abilityScoreValue = abilityScore.getScore();
    const modifier: number = Ability.ABILITY_MODIFIERS.get(abilityScoreValue)!;
    const modifierInfo: string = modifier >= 0
      ? `+${modifier}`
      : `${modifier}`

    return `${abilityScoreValue} (${modifierInfo})`;
  }

}
