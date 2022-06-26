import { Component, OnInit } from '@angular/core';
import {RestingService} from "../../services/resting/resting.service";

@Component({
  selector: 'app-long-rest',
  templateUrl: './long-rest.component.html',
  styleUrls: ['./long-rest.component.css']
})
export class LongRestComponent implements OnInit {

  restTimeInHours: number;

  constructor(private restingService: RestingService) {
    this.restTimeInHours = restingService.getMinimumRestingTime();
  }

  ngOnInit(): void {
    this.restTimeInHours = this.restingService.getMinimumRestingTime();
  }

  rest(): void {
    this.restingService.performLongRest(this.restTimeInHours);
  }

  getTimeSinceLastRest(): number {
    return this.restingService.getTimeSinceLastLongRest();
  }

  getMinimumRestingTime(): number {
    return this.restingService.getMinimumRestingTime();
  }

  isRestingEnabled(): boolean {
    return this.restTimeInHours >= this.restingService.getMinimumRestingTime();
  }
}
