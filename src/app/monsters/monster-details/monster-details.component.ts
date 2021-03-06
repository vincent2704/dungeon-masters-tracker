import {Component, Input, OnInit} from '@angular/core';
import {Monster} from "../../models/monsters/monster";
import {AbilityScore} from "../../models/common/ability/abilityScore";
import {Ability} from "../../models/common/ability/ability";
import {MeasurementSystem} from "../../services/measurement-system/measurement.system";

@Component({
  selector: 'app-monster-details',
  templateUrl: './monster-details.component.html',
  styleUrls: ['./monster-details.component.css']
})
export class MonsterDetailsComponent implements OnInit {

  @Input()
  monster!: Monster;

  constructor() { }

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

    if(nonMagicalResistances.length == 0) {
      return resistances.join(', ');
    }
    return `${resistances.join(', ')}; ${nonMagicalResistances.join(', ')} from nonmagical weapons`;
  }

  getDamageImmunities(): string {
    let immunities = this.monster.getDamageImmunities().getImmunities();
    let nonMagicalImmunities = this.monster.getDamageImmunities().getNonMagicalImmunities();

    if(nonMagicalImmunities.length == 0) {
      return immunities.join(', ');
    }
    return `${immunities.join(', ')}; ${nonMagicalImmunities.join(', ')} form nonmagical weapons`;
  }

  getConditionImmunities(): string {
    return this.monster.getConditionImmunities().map(condition => condition.getName()).join(', ');
  }

  getSenses(): string {
    let senses = this.monster.getSenses().getMonsterSenses().map(monsterSense => {
      let sense = monsterSense.getSense().getName();
      let radius = monsterSense.getRadius();
      let note = monsterSense.getNote();

      if(note) {
        return `${sense} ${radius} ${MeasurementSystem.getMeasurementUnit()} (${note})`;
      }
      return `${sense} ${radius} ${MeasurementSystem.getMeasurementUnit()}`;
    }).join(', ');

    let passiveSkills = this.monster.getSenses().getPassiveSkills();
    if (passiveSkills.length > 0) {
      let passives = passiveSkills.map(passiveSkill => {
        let skill = passiveSkill.getSkill();
        let score = passiveSkill.getScore();
        return `${skill} ${score}`
      }).join(', ');

      if (senses.length > 0) {
        return `${senses}, passive ${passives}`;
      }
      return `passive ${passives}`;
    }
    return senses;
  }

  getLanguages(): string {
    let monsterLanguages = this.monster.getLanguages();
    if (!monsterLanguages) {
      return '???'
    }
    let languages = monsterLanguages.getLanguages().join(', ');
    let telepathyRadius = monsterLanguages.getTelepathyRadius();
    if (telepathyRadius) {
      return `${languages}, telepathy ${telepathyRadius} ${MeasurementSystem.getMeasurementUnit()}`
    }
    return languages;
  }

}
