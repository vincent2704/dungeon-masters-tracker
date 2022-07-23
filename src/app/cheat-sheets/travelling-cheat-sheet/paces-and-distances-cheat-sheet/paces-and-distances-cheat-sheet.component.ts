import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../../services/settings/settings.service";
import {MeasurementSystem} from "../../../services/measurement-system/measurement.system";

@Component({
  selector: 'app-paces-and-distances-cheat-sheet',
  templateUrl: './paces-and-distances-cheat-sheet.component.html',
  styleUrls: ['./paces-and-distances-cheat-sheet.component.css']
})
export class PacesAndDistancesCheatSheetComponent implements OnInit {

  constructor(
    private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  getDistanceForMinute(distanceInFeet: number): string {
    return this.settingsService.isUsingSISystem()
      ? MeasurementSystem.convertFeetToMeters(distanceInFeet) + " m"
      : distanceInFeet + " feet";
  }

  getDistance(distanceInMiles: number): string {
    return this.settingsService.isUsingSISystem()
      ? MeasurementSystem.convertMilesToKilometers(distanceInMiles) + " km"
      : distanceInMiles + " miles";
  }

}
