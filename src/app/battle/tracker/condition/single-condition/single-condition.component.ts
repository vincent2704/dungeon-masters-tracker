import {Component, Input, OnInit} from '@angular/core';
import {BattleCondition} from "../../../../models/battleCondition";
import {Condition} from "../../../../models/Condition";

@Component({
  selector: 'app-single-condition',
  templateUrl: './single-condition.component.html',
  styleUrls: ['./single-condition.component.css']
})
export class SingleConditionComponent implements OnInit {

  @Input()
  condition!: BattleCondition;

  exhaustionLevelsMap: Map<number, string> = new Map<number, string>();

  constructor() { }

  ngOnInit(): void {
    if(this.condition.getCondition() == Condition.EXHAUSTION) {
      this.exhaustionLevelsMap = Condition.EXHAUSTION_LEVELS;
    }
  }

  isExhaustion(): boolean {
    return this.condition.getCondition() == Condition.EXHAUSTION;
  }



}
