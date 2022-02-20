import {Component, Input, OnInit} from '@angular/core';
import {ActorService} from "../../services/actor.service";
import {Actor} from "../../models/actor";
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
  actor!: Actor;

  showDescription: boolean = false;

  constructor(private actorService: ActorService) {}

  ngOnInit(): void {
  }

  removeCondition(condition: Condition) {
    this.actorService.removeCondition(this.actor, condition);
  }

  onShowDescription() {
    this.showDescription = !this.showDescription;
  }
}
