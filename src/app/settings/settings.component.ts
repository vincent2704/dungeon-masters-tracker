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

  onUseSISystemChange(): void {
    Settings.changeUsedMeasurementSystem();
  }

  onAutoLoadProtagonistsChange(): void {
    Settings.changeAutoLoadProtagonists();
  }

  onAutoLoadMonsterActionsChange(): void {
    Settings.changeAutoLoadMonsterActions();
  }

  isUsingSISystem(): boolean {
    return Settings.isUsingSISystem();
  }

  isAutoLoadProtagonists(): boolean {
    return Settings.isAutoLoadProtagonists();
  }

  isAutoLoadMonsterActions(): boolean {
    return Settings.isAutoLoadMonsterActions();
  }

}
