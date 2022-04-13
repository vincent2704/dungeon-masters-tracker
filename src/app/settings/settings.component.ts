import { Component, OnInit } from '@angular/core';
import {MeasurementSystemService} from "../services/measurement-system.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private measurementSystemService: MeasurementSystemService) { }

  ngOnInit(): void {
  }

  onUseSISystemChange() {
    this.measurementSystemService.changeUsedMeasurementSystem();
  }

  isUsingSISystem() {
    return this.measurementSystemService.isUsingSISystem();
  }

}
