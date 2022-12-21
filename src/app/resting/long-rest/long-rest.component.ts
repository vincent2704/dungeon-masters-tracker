import {Component, Input, OnInit} from '@angular/core';
import {RestingService} from "../../services/resting/resting.service";
import {PlayerCharacter} from "../../models/actors/playerCharacter";

@Component({
  selector: 'app-long-rest',
  templateUrl: './long-rest.component.html',
  styleUrls: ['./long-rest.component.css']
})
export class LongRestComponent implements OnInit {

  @Input()
  playerCharacters!: PlayerCharacter[];
  restTimeInHours: number = 0;

  constructor(private restingService: RestingService) {
  }

  ngOnInit(): void {
    this.restTimeInHours = this.restingService.getMinimumRestingTime();
  }

  rest(): void {
    this.restingService.performLongRest(this.restTimeInHours, this.playerCharacters);
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
