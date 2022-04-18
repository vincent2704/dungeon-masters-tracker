import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../services/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  onUseSISystemChange() {
    this.settingsService.changeUsedMeasurementSystem();
  }

  isUsingSISystem() {
    return this.settingsService.isUsingSISystem();
  }

  isAutoLoadProtagonists() {
    return this.settingsService.isAutoLoadProtagonists();
  }

  onAutoLoadProtagonistsChange() {
    this.settingsService.changeAutoLoadProtagonists();
  }

}
