import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Encounter} from "../../../models/encounter";
import {Actor} from "../../../models/actor";
import {CombatUtils, MonsterHitPointsRule} from "../../../services/combat/combatUtils";

@Component({
  selector: 'app-saved-encounter',
  templateUrl: './saved-encounter.component.html',
  styleUrls: ['./saved-encounter.component.css']
})
export class SavedEncounterComponent implements OnInit {

  @Input()
  encounter!: Encounter;
  @Output()
  encounterEmitter = new EventEmitter<Actor[]>();

  isCollapsed: boolean = true;
  randomizeMonstersHPCheckboxChecked: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  addMonstersToEncounter(): void {
    let monsterHitPointsRule = this.randomizeMonstersHPCheckboxChecked
      ? MonsterHitPointsRule.THROW_DICE
      : MonsterHitPointsRule.FIXED;

    this.encounterEmitter.emit(CombatUtils.getEncounterMonsters(
      this.encounter.getMonsterList(), monsterHitPointsRule));
  }

}
