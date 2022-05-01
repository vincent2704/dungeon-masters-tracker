import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //TODO: later - save settings in local storage
  private autoLoadProtagonists: boolean = true;
  private useSISystem: boolean = true;

  constructor() { }

  isUsingSISystem(): boolean {
    return this.useSISystem;
  }

  changeUsedMeasurementSystem() {
    this.useSISystem = !this.useSISystem;
  }

  isAutoLoadProtagonists(): boolean {
    return this.autoLoadProtagonists;
  }

  changeAutoLoadProtagonists() {
    this.autoLoadProtagonists = !this.autoLoadProtagonists;
  }
}
