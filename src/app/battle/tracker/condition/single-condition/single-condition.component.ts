import {Component, EventEmitter, Input, OnInit} from '@angular/core';
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

  actorDeathEmitter = new EventEmitter<void>();
  conditionRemovedEmitter = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    if(this.condition.getCondition() == Condition.EXHAUSTION) {
      this.exhaustionLevelsMap = Condition.EXHAUSTION_LEVELS;
    }
  }

  isExhaustion(): boolean {
    return this.condition.getCondition() == Condition.EXHAUSTION;
  }


  incrementExhaustionLevel() {
    const condition = this.condition.getCondition()
    let exhaustionLevel = this.condition.getExhaustionLevel()
    if(condition == Condition.EXHAUSTION && exhaustionLevel < 6) {
      this.condition.setExhaustionLevel(++exhaustionLevel);
    }
    if(exhaustionLevel == 6) {
      this.actorDeathEmitter.emit();
    }
  }

  decrementExhaustionLevel() {
    const condition = this.condition.getCondition()
    let exhaustionLevel = this.condition.getExhaustionLevel()
    if(condition == Condition.EXHAUSTION && exhaustionLevel > 0) {
      this.condition.setExhaustionLevel(--exhaustionLevel);
    }
    if(this.condition.getExhaustionLevel() == 0) {
      this.conditionRemovedEmitter.emit();
    }
  }
}
