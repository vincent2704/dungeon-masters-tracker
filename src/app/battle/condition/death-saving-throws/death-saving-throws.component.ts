import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../../models/actor";
import {Condition} from "../../../models/Condition";

@Component({
  selector: 'app-death-saving-throws',
  templateUrl: './death-saving-throws.component.html',
  styleUrls: ['./death-saving-throws.component.css']
})
export class DeathSavingThrowsComponent implements OnInit {
  @Input()
  actor!: Actor;

  successes: number = 0;
  failures: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  success() {
    this.successes++;
    if(this.successes == 3) {
      this.actor.setStabilized(true);
    }
  }

  failure() {
    this.failures++;
    if(this.failures >= 3) {
      this.actor.kill();
    }
  }

  criticalSuccess() {
    this.actor.setStabilized(true);
    this.actor.setHP(1);
    this.actor.removeCondition(Condition.UNCONSCIOUS);
    this.actor.setKnockedDown(false);
  }

  criticalFail() {
    this.failures += 2;
    if(this.failures >= 3) {
      this.actor.kill();
    }
  }
}
