import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {CampaignService} from "../../services/campaign/campaign.service";
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

  timeChangeInput: TimeStructure = new TimeStructure();

  constructor(private calendar: NgbCalendar, private temporalService: CampaignService) {
    this.currentDate = temporalService.getSessionStorageCurrentDate();
    this.dateModel = { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth()+1, day: this.currentDate.getDate() };
    this.timeModel = { hour: this.currentDate.getHours(), minute: this.currentDate.getMinutes(), second: this.currentDate.getSeconds() };
  }

  ngOnInit(): void {
  }

  onConfirmDate(): void {
    this.temporalService.setCurrentDate(this.dateModel, this.timeModel)
      .subscribe(response => {
        this.temporalService.getCampaign()
          .subscribe(response => {
            this.temporalService.updateSessionStorageCampaign(response);

            this.currentDate = new Date(
              // month-1 because NgbDateStruct counts months from 1 while Date counts months from 0
              this.dateModel.year, this.dateModel.month - 1, this.dateModel.day,
              this.timeModel.hour, this.timeModel.minute, this.timeModel.second
            );
          })
      });
  }

  getCurrentDateModel(): NgbDateStruct {
    return this.dateModel;
  }

  getCurrentDateFormatted(): string {
    return `
    ${this.currentDate.getDate()},
    ${this.currentDate.toLocaleString('en-US', {month: 'long'})},
    ${this.currentDate.getFullYear()}`;
  }

  addTime(): void {
    this.temporalService.addTime(this.timeChangeInput);
    this.clearTimeChangeInput();
  }

  subtractTime(): void {
    this.temporalService.subtractTime(this.timeChangeInput);
    this.clearTimeChangeInput();
  }

  clearTimeChangeInput(): void {
    this.timeChangeInput.months = undefined;
    this.timeChangeInput.days = undefined;
    this.timeChangeInput.hours = undefined;
    this.timeChangeInput.minutes = undefined;
    this.timeChangeInput.seconds = undefined;
  }
}
