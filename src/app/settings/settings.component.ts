import { Component, OnInit } from '@angular/core';
import {Settings} from "../services/settings/settings";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onUseSISystemChange() {
    Settings.changeUsedMeasurementSystem();
  }

  isUsingSISystem() {
    return Settings.isUsingSISystem();
  }

  isAutoLoadProtagonists() {
    return Settings.isAutoLoadProtagonists();
  }

  onAutoLoadProtagonistsChange() {
    Settings.changeAutoLoadProtagonists();
  }

}
