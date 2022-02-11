import {Component, Input, OnInit} from '@angular/core';
import {BattleActorService} from "../../services/battle-actor.service";
import {BattleActor} from "../../models/battleActor";
import {BattleCondition} from "../../models/battleCondition";
import {Condition} from "../../models/Condition";
@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit {

  @Input()
  battleCondition!: BattleCondition;

  @Input()
  actor!: BattleActor;

  showDescription: boolean = false;

  constructor(private battleActorService: BattleActorService) {}

  ngOnInit(): void {
  }

  removeCondition(condition: Condition) {
    this.battleActorService.removeCondition(this.actor, condition);
  }

  onShowDescription() {
    this.showDescription = !this.showDescription;
  }
}
