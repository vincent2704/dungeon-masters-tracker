import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../../models/actor";

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

  addSuccess() {
    this.successes++;
    if(this.successes == 3) {
      this.actor.setStabilized(true);
    }
  }

  addFailure() {
    this.failures++;
    if(this.failures === 3) {
      this.actor.kill();
    }
  }

}
