import {Component, Input, OnInit} from '@angular/core';
import {PlayerCharacter} from "../../../../models/actors/playerCharacter";
import {BackendCondition} from "../../../../models/actors/backendCondition";
import {Condition} from "../../../../models/Condition";

@Component({
  selector: 'app-condition-cell',
  templateUrl: './condition-cell.component.html',
  styleUrls: ['./condition-cell.component.css']
})
export class ConditionCellComponent implements OnInit {

  constructor() { }

  @Input()
  playerCharacter!: PlayerCharacter;

  ngOnInit(): void {
  }

  isExhaustion(condition: BackendCondition): boolean {
    return condition.name == Condition.EXHAUSTION.getName().toUpperCase();
  }

}
