import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-time-configuration',
  templateUrl: './time-configuration.component.html',
  styleUrls: ['./time-configuration.component.css']
})
export class TimeConfigurationComponent implements OnInit {

  model: NgbDateStruct;
  date?: {year: number, month: number};

  isCollapsed: boolean = true;

  constructor(private calendar: NgbCalendar) {
    this.model = this.calendar.getToday();

  }

  ngOnInit(): void {
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

}
