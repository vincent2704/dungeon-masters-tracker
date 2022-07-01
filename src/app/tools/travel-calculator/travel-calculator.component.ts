import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {TemporalService} from "../../services/temporal/temporal.service";

@Component({
  selector: 'app-travel-calculator',
  templateUrl: './travel-calculator.component.html',
  styleUrls: ['./travel-calculator.component.css']
})
export class TravelCalculatorComponent implements OnInit {
  pace: string = '';
  travelInformation: string = '';
  trackTime: boolean = true;

  constructor(private settingsService: SettingsService, private temporalService: TemporalService) {
  }

  ngOnInit(): void {
  }

  setPace(event: Event) {
    this.pace = (<HTMLInputElement>event.target).value;
  }

  getTypeDistancePlaceholder(): string {
    return this.settingsService.isUsingSISystem() ? 'Distance in kilometers' : 'Distance in miles';
  }

  getTimePlaceholder(): string {
    return 'Travel time in hours';
  }

  onCalculateTime(event: any) {
    let distance = parseFloat((<HTMLInputElement>event.target).value);
    this.updateTravelTime(distance);
  }

  onCalculateDistance(event: any) {
    let time = parseFloat((<HTMLInputElement>event.target).value);
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
    let measureUnit = this.settingsService.isUsingSISystem() ? 'kilometers' : 'miles';
    this.travelInformation = `Traveled distance: ${distanceTraveledForHours} ${measureUnit}`;
  }

  private getOneHourTravelToPaceRatio(): number {
    if (this.pace === 'Fast') {
      return this.settingsService.isUsingSISystem() ? 6 : 4;
    }
    if (this.pace === 'Normal') {
      return this.settingsService.isUsingSISystem() ? 4.5 : 3;
    }
    if (this.pace === 'Slow') {
      return this.settingsService.isUsingSISystem() ? 3 : 2;
    }
    console.error('ERROR ON SELECTING PACE');
    return 0;
  }

}
