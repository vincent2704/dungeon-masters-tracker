import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";

@Component({
  selector: 'app-temporary-hit-points',
  templateUrl: './temporary-hit-points.component.html',
  styleUrls: ['./temporary-hit-points.component.css']
})
export class TemporaryHitPointsComponent implements OnInit {

  @Input()
  character!: Actor;

  // temporary Hit Points form
  temporaryHitPointsAmount: number = 0;
  temporaryHitPointsDuration: number = 0;
  isCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  setTemporaryHitPointsToAdd(event: Event) {
    let hitPointAmount = parseInt((<HTMLInputElement>event.target).value);
    if (hitPointAmount > 0) {
      this.temporaryHitPointsAmount = hitPointAmount;
    }
  }

  setTemporaryHitPointsToAddDuration(event: Event) {
    this.temporaryHitPointsDuration = parseInt((<HTMLInputElement>event.target).value);
  }

  onSubmitTemporaryHitPoints(actor: Actor) {
    actor.setTemporaryHitPoints(this.temporaryHitPointsAmount, this.temporaryHitPointsDuration);
  }

  showTemporaryHitPoints(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
