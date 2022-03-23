import { Component, OnInit } from '@angular/core';
import {MeasurementSystemService} from "../services/measurement-system.service";

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  pace: string = '';
  travelTimeInformation: string = '';

  constructor(private measurementSystemService: MeasurementSystemService) { }

  ngOnInit(): void {
  }

  setPace(event: Event) {
    this.pace = (<HTMLInputElement>event.target).value;
  }

  getTypeDistancePlaceholder(): string {
    return this.measurementSystemService.isUsingSISystem() ? 'Type distance in kilometers' : 'Type distance in miles';
  }

  getTimePlaceholder(): string {
    return 'Type travel time in hours';
  }

  onCalculateTime(event: any) {
    let distance = parseFloat((<HTMLInputElement>event.target).value);
    switch(this.pace) {
      case 'Fast': {
        let travelTimeInHours = this.measurementSystemService.isUsingSISystem()
          ? `${distance/6}`
          : `${distance/4}`;
        //TODO: change to display hours and minutes on floating numbers
        this.travelTimeInformation =  `Travel time: ${travelTimeInHours} hours`;
        break;
      }

      case 'Normal': {
        let travelTimeInHours = this.measurementSystemService.isUsingSISystem()
          ? `${distance/4.5}`
          : `${distance/3}`;
        this.travelTimeInformation =  `Travel time: ${travelTimeInHours} hours`;
        break;
      }

      case 'Slow': {
        let travelTimeInHours = this.measurementSystemService.isUsingSISystem()
          ? `${distance/3}`
          : `${distance/2}`;
        this.travelTimeInformation =  `Travel time: ${travelTimeInHours} hours`;
        break;
      }

      default: {
        console.error(`CALCULATE TIME ERROR. PACE: ${this.pace}, DISTANCE: ${distance}`);
      }
    }
  }

  onCalculateDistance(event: any) {
    let time = parseFloat((<HTMLInputElement>event.target).value);

  }
}
