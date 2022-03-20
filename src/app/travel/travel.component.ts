import { Component, OnInit } from '@angular/core';
import {MeasurementSystemService} from "../services/measurement-system.service";

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  constructor(private measurementSystemService: MeasurementSystemService) { }

  ngOnInit(): void {
  }

  setPace(event: Event) {

  }

  getTypeDistancePlaceholder(): string {
    return this.measurementSystemService.isUsingSISystem() ? 'Type distance in kilometers' : 'Type distance in miles';
  }
}
