import {Component, Input, OnInit} from '@angular/core';
import {Monster} from "../../models/monsters/monster";
import {AbilityScore} from "../../models/common/ability/abilityScore";
import {Ability} from "../../models/common/ability/ability";
import {MeasurementSystem} from "../../services/measurement-system/measurement.system";
import {SingleMonsterLanguage} from "../../models/monsters/monster-languages/singleMonsterLanguage";

@Component({
  selector: 'app-monster-details',
  templateUrl: './monster-details.component.html',
  styleUrls: ['./monster-details.component.css']
})
export class MonsterDetailsComponent implements OnInit {

  @Input()
  monster!: Monster;

  constructor() {
  }

  ngOnInit(): void {
  }

  getAbilityScoreInfo(abilityScore: AbilityScore): string {
    let modifierValue = Ability.ABILITY_MODIFIERS.get(abilityScore.getScore());
    let score = abilityScore.getScore();
    if (modifierValue && modifierValue > 0) {
      return `${score} (+${modifierValue})`;
    }
    return `${score} (${modifierValue})`;
  }

  getDamageResistances(): string {
    let resistances = this.monster.getDamageResistances().getResistances();
    let nonMagicalResistances = this.monster.getDamageResistances().getNonMagicalResistances();

    if (nonMagicalResistances.length == 0) {
      return resistances.join(', ');
    }
    return `${resistances.join(', ')}; ${nonMagicalResistances.join(', ')} from nonmagical weapons`;
  }

  getDamageImmunities(): string {
    let immunities = this.monster.getDamageImmunities().getImmunities();
    let additionalImmunities = this.monster.getDamageImmunities().getAdditionalImmunities();

    if (!additionalImmunities) {
      return immunities.join(', ');
    }

    if (immunities.length > 0) {
      return `; ${additionalImmunities.getDamageTypes().join(', ')} ${additionalImmunities.getDamageNote()}`;
    }

    return `${additionalImmunities.getDamageTypes().join(', ')} ${additionalImmunities.getDamageNote()}`;
  }

  getConditionImmunities(): string {
    return this.monster.getConditionImmunities().map(condition => condition.getName()).join(', ');
  }

  getSenses(): string {
    let senses = this.monster.getSenses().getMonsterSenses().map(monsterSense => {
      let sense = monsterSense.getSense().getName();
      let radius = monsterSense.getRadius();
      let note = monsterSense.getNote();

      if (note) {
        return `${sense} ${radius} ${MeasurementSystem.getMeasurementUnit()} (${note})`;
      }
      return `${sense} ${radius} ${MeasurementSystem.getMeasurementUnit()}`;
    }).join(', ');

    let passivePerception = this.monster.getSenses().getPassivePerception();
    if (passivePerception > 0) {
      if (senses.length > 0) {
        return `${senses}, passive Perception ${passivePerception}`;
      }
      return `passive Perception ${passivePerception}`;
    }
    return senses;
  }

  getLanguages(): string {
    let monsterLanguages = this.monster.getLanguages();
    if (!monsterLanguages) {
      return '—'
    }
    let monsterLanguagesList: SingleMonsterLanguage[] = monsterLanguages.getLanguages();

    let languagesInfo: string[] = monsterLanguagesList.map(singleLanguage => {
      let languageNote = singleLanguage.getNote();
      if (languageNote) {
        return `${singleLanguage.getLanguage()} (${languageNote})`;
      } else {
        return `${singleLanguage.getLanguage()}`;
      }
    })

    let telepathyRadius = monsterLanguages.getTelepathyRadius();
    if (telepathyRadius) {
      return `${languagesInfo.join(', ')}, telepathy ${telepathyRadius} ${MeasurementSystem.getMeasurementUnit()}`;
    }
    return languagesInfo.join(', ');
  }

}
