import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {TemporalService} from "../../services/temporal/temporal.service";
import {TimeStructure} from "../../models/timeStructure";

@Component({
  selector: 'app-time-configuration',
  templateUrl: './time-configuration.component.html',
  styleUrls: ['./time-configuration.component.css']
})
export class TimeConfigurationComponent implements OnInit {

  dateModel: NgbDateStruct;
  timeModel: NgbTimeStruct;
  currentDate: Date;

  isCollapsed: boolean = true;

  timeStructure: TimeStructure = new TimeStructure();

  constructor(private calendar: NgbCalendar, private temporalService: TemporalService) {
    this.currentDate = temporalService.getCurrentDate();
    this.dateModel = { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth()+1, day: this.currentDate.getDate() };
    this.timeModel = { hour: this.currentDate.getHours(), minute: this.currentDate.getMinutes(), second: this.currentDate.getSeconds() };
  }

  ngOnInit(): void {
  }

  onConfirmDate() {
    this.temporalService.setCurrentDate(this.dateModel, this.timeModel);
    this.currentDate = this.temporalService.getCurrentDate();
  }

  getCurrentDateModel(): NgbDateStruct {
    return this.dateModel;
  }

  addTime() {
    this.temporalService.addTime(this.timeStructure);
  }

  subtractTime() {
    this.temporalService.subtractTime(this.timeStructure);
  }
}
