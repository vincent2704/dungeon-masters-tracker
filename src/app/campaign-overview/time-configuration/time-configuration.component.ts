import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {CampaignService} from "../../services/campaign/campaign.service";
import {TimeStructure} from "../../models/timeStructure";
import { Campaign } from "../../models/campaign/campaign";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";

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

  constructor(private calendar: NgbCalendar, private campaignService: CampaignService) {
    this.currentDate = new Date(campaignService.getLocalStorageCampaign().campaignDateTimeCurrentEpoch);
    this.dateModel = { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth()+1, day: this.currentDate.getDate() };
    this.timeModel = { hour: this.currentDate.getHours(), minute: this.currentDate.getMinutes(), second: this.currentDate.getSeconds() };
  }

  ngOnInit(): void {
  }

  onConfirmDate(): void {
    const newDate: Date = this.getCurrentDateFromModels();

    this.campaignService.setCurrentDate(newDate)
      .subscribe(() => {
        this.campaignService.getCampaign()
          .subscribe(response => {
            LocalStorageUtils.setCurrentCampaign(response);
          })
      });
  }

  getCurrentDateModel(): NgbDateStruct {
    return this.dateModel;
  }

  getCurrentDateFormatted(): string {
    const campaignDate = LocalStorageUtils.getCampaign();
    return '';
    // return `${this.currentDate.getDate()}, ${this.currentDate.toLocaleString('en-US', {month: 'long'})}, ${this.currentDate.getFullYear()}`;
  }

  addTime(): void {
    const newDate = new Date(this.campaignService.getLocalStorageCampaign().campaignDateTimeCurrentEpoch)

    let months = this.timeChangeInput.months ? this.timeChangeInput.months : 0;
    let days = this.timeChangeInput.days ? this.timeChangeInput.days : 0;
    let hours = this.timeChangeInput.hours ? this.timeChangeInput.hours : 0;
    let minutes = this.timeChangeInput.minutes ? this.timeChangeInput.minutes : 0;
    let seconds = this.timeChangeInput.seconds ? this.timeChangeInput.seconds : 0;

    newDate.setMonth(newDate.getMonth() + months);
    newDate.setDate(newDate.getDate() + days);
    newDate.setHours(
      newDate.getHours() + hours,
      newDate.getMinutes() + minutes,
      newDate.getSeconds() + seconds
    );

    this.campaignService.setCurrentDate(newDate)
      .subscribe(response => {
        this.campaignService.updateLocalStorageCampaign(response);
        this.clearTimeChangeInput();
        this.currentDate = new Date(response.campaignDateTimeCurrentEpoch)
      })
  }

  subtractTime(): void {
    let newDate = new Date(this.campaignService.getLocalStorageCampaign().campaignDateTimeCurrentEpoch)

    let months = this.timeChangeInput.months ? this.timeChangeInput.months : 0;
    let days = this.timeChangeInput.days ? this.timeChangeInput.days : 0;
    let hours = this.timeChangeInput.hours ? this.timeChangeInput.hours : 0;
    let minutes = this.timeChangeInput.minutes ? this.timeChangeInput.minutes : 0;
    let seconds = this.timeChangeInput.seconds ? this.timeChangeInput.seconds : 0;

    newDate.setMonth(newDate.getMonth() - months);
    newDate.setDate(newDate.getDate() - days);
    newDate.setHours(
      newDate.getHours() - hours,
      newDate.getMinutes() - minutes,
      newDate.getSeconds() - seconds
    );

    this.campaignService.setCurrentDate(newDate)
      .subscribe(response => {
        this.campaignService.updateLocalStorageCampaign(response);
        this.clearTimeChangeInput();
        this.currentDate = new Date(response.campaignDateTimeCurrentEpoch)
      })
  }

  clearTimeChangeInput(): void {
    this.timeChangeInput.months = undefined;
    this.timeChangeInput.days = undefined;
    this.timeChangeInput.hours = undefined;
    this.timeChangeInput.minutes = undefined;
    this.timeChangeInput.seconds = undefined;
  }

  getCurrentDateFromModels(): Date {
    return new Date(
      // month-1 because NgbDateStruct counts months from 1 while Date counts months from 0
      this.dateModel.year, this.dateModel.month - 1, this.dateModel.day,
      this.timeModel.hour, this.timeModel.minute, this.timeModel.second
    );
  }
}
