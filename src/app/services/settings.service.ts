import { Injectable } from '@angular/core';
import { MeasurementSystemService } from "./measurement-system.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //TODO: later - save settings in local storage
  private autoLoadProtagonists: boolean = true;

  constructor(private measurementService: MeasurementSystemService) { }

  isUsingSISystem(): boolean {
    return this.measurementService.isUsingSISystem();
  }

  changeUsedMeasurementSystem() {
    this.measurementService.changeUsedMeasurementSystem();
  }

  isAutoLoadProtagonists(): boolean {
    return this.autoLoadProtagonists;
  }

  changeAutoLoadProtagonists() {
    this.autoLoadProtagonists = !this.autoLoadProtagonists;
  }
}
