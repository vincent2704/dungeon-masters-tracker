import {Component, Input, OnInit} from '@angular/core';
import {ActorService} from "../../services/actor/actor.service";
import {Actor} from "../../models/actor";
import {BattleCondition} from "../../models/battleCondition";
import {Condition} from "../../models/Condition";

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit {

  CONDITIONS: Condition[] = Condition.CONDITIONS;

  @Input()
  actor!: Actor;

  showDescription: boolean = false;

  // condition form
  conditionToAdd!: Condition;
  conditionToAddDuration: number = 0;

  constructor(private actorService: ActorService) {
  }

  ngOnInit(): void {
  }

  removeCondition(condition: Condition) {
    this.actorService.removeCondition(this.actor, condition);
  }

  onShowDescription() {
    this.showDescription = !this.showDescription;
  }

  onSubmitCondition(actor: Actor) {
    let battleCondition = new BattleCondition(this.conditionToAdd, this.conditionToAddDuration);
    this.actorService.addBattleCondition(actor, battleCondition);
    this.conditionToAddDuration = 0;
  }

  setConditionToAdd(event: Event) {
    let conditionName = (<HTMLInputElement>event.target).value;
    for (let condition of this.CONDITIONS) {
      if (condition.getName() === conditionName) {
        this.conditionToAdd = condition;
      }
    }
  }

  setConditionToAddDuration(event: Event) {
    this.conditionToAddDuration = parseInt((<HTMLInputElement>event.target).value);
    (<HTMLInputElement>event.target).value = '';
  }

  isDisabled(condition: BattleCondition, actor: Actor): boolean {
    if (condition.getCondition() === Condition.UNCONSCIOUS) {
      if(actor.getCurrentHP() <= 0) {
        return true;
      }
    }
    return false;
  }

}
