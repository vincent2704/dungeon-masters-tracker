import {Component, OnInit} from '@angular/core';
import {TemporalService} from "../../services/temporal/temporal.service";
import {Settings} from "../../services/settings/settings";

@Component({
  selector: 'app-travel-calculator',
  templateUrl: './travel-calculator.component.html',
  styleUrls: ['./travel-calculator.component.css']
})
export class TravelCalculatorComponent implements OnInit {
  pace: string = '';
  travelInformation: string = '';
  trackTime: boolean = true;

  constructor( private temporalService: TemporalService) {
  }

  ngOnInit(): void {
  }

  setPace(event: Event) {
    this.pace = (<HTMLInputElement>event.target).value;
  }

  getTypeDistancePlaceholder(): string {
    return Settings.isUsingSISystem() ? 'Distance in kilometers' : 'Distance in miles';
  }

  getTimePlaceholder(): string {
    return 'Travel time in hours';
  }

  onCalculateTime(event: any) {
    if (!this.isPaceSelected()) {
      return;
    }
    let distance = parseFloat((<HTMLInputElement>event.target).value);
    if(!distance) {
      this.travelInformation = "Distance input is empty";
      return;
    }
    this.updateTravelTime(distance);
  }

  onCalculateDistance(event: any) {
    if (!this.isPaceSelected()) {
      return;
    }
    let time = parseFloat((<HTMLInputElement>event.target).value);
    if (!time) {
      this.travelInformation = "Time input is empty";
      return;
    }
    this.updateTravelDistance(time);
  }

  updateTravelTime(distance: number) {
    let travelTimeInHours: string = (distance / this.getOneHourTravelToPaceRatio()).toFixed(1);
    this.travelInformation = `Travel time: ${travelTimeInHours} hours`;
    if (this.trackTime) {
      this.temporalService.addSeconds(parseFloat(travelTimeInHours) * 3600);
    }
  }

  private updateTravelDistance(time: number) {
    let distanceTraveledForHours = (time * this.getOneHourTravelToPaceRatio()).toFixed(1);
    let measureUnit = Settings.isUsingSISystem() ? 'kilometers' : 'miles';
    this.travelInformation = `Traveled distance: ${distanceTraveledForHours} ${measureUnit}`;
  }

  private isPaceSelected(): boolean {
    if (this.pace.length == 0) {
      this.travelInformation = 'Travel pace is not selected';
      return false;
    }
    return true;
  }

  private getOneHourTravelToPaceRatio(): number {
    switch (this.pace) {
      case 'Fast': {
        return Settings.isUsingSISystem() ? 6 : 4;
      }
      case 'Normal': {
        return Settings.isUsingSISystem() ? 4.5 : 3;
      }
      case 'Slow': {
        return Settings.isUsingSISystem() ? 3 : 2;
      }
      default: {
        return 0;
      }
    }
  }

}
