import {Component, Input, OnInit} from '@angular/core';
import {Condition} from "../../models/Condition";
import {BattleActorService} from "../../services/battle-actor.service";
import {BattleActor} from "../../models/battleActor";

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit {

  @Input()
  condition!: Condition;
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
