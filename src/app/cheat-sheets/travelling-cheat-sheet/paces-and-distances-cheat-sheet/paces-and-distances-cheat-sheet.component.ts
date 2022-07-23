import {Component, OnInit} from '@angular/core';
import {Settings} from "../../../services/settings/settings";
import {MeasurementSystem} from "../../../services/measurement-system/measurement.system";

@Component({
  selector: 'app-paces-and-distances-cheat-sheet',
  templateUrl: './paces-and-distances-cheat-sheet.component.html',
  styleUrls: ['./paces-and-distances-cheat-sheet.component.css']
})
export class PacesAndDistancesCheatSheetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getDistanceForMinute(distanceInFeet: number): string {
    return Settings.isUsingSISystem()
      ? MeasurementSystem.getFeetDistance(distanceInFeet) + " m"
      : distanceInFeet + " feet";
  }

  getDistance(distanceInMiles: number): string {
    return Settings.isUsingSISystem()
      ? MeasurementSystem.convertMilesToKilometers(distanceInMiles) + " km"
      : distanceInMiles + " miles";
  }

}
