import {Component, Input, OnInit} from '@angular/core';
import {Action} from "../../../models/monsters/actions-and-traits/action";
import {CombatUtils} from "../../../services/combat/combatUtils";
import {Actor} from "../../../models/actors/actor";

@Component({
  selector: 'app-monster-actions',
  templateUrl: './monster-actions.component.html',
  styleUrls: ['./monster-actions.component.css']
})
export class MonsterActionsComponent implements OnInit {

  @Input()
  monsterActor!: Actor;

  attackRolls: Map<string, string> = new Map<string, string>();

  constructor() { }

  ngOnInit(): void {
  }

  getActions(): Action[] {
    return this.monsterActor.getMonster()!.getDetails().getActions();
  }

  getAttackRollResult(action: Action): string | undefined {
    const key = action.getName();
    return this.attackRolls.get(key);
  }

  rollAttack(action: Action) {
    const rollResult = CombatUtils.throwDiceForAttackRoll(action);
    const key = action.getName();
    this.attackRolls.set(key, rollResult);
  }

}
