import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { CampaignService } from "../../services/campaign/campaign.service";
import { TimeStructure } from "../../models/timeStructure";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";
import { DateUtils } from "../../utilities/date/dateUtils";
import { CampaignUpdateRequest } from "../../models/campaign/campaignUpdateRequest";

@Component({
  selector: 'app-time-configuration',
  templateUrl: './time-configuration.component.html',
  styleUrls: ['./time-configuration.component.css']
})
export class TimeConfigurationComponent implements OnInit {

  dateModel!: NgbDateStruct;
  timeModel!: NgbTimeStruct;
  currentDate!: Date;

  isCollapsed: boolean = true;
  timeChangeInput: TimeStructure = new TimeStructure();

  constructor(private calendar: NgbCalendar, private campaignService: CampaignService) {
  }

  ngOnInit(): void {
    this.currentDate = DateUtils.extractCurrentCampaignDate(LocalStorageUtils.getCampaign());

    console.log(`${this.currentDate}`)

    this.dateModel = {
      year: this.currentDate.getFullYear(),
      month: this.currentDate.getMonth() + 1,
      day: this.currentDate.getDate()
    };
    this.timeModel = {
      hour: this.currentDate.getHours(),
      minute: this.currentDate.getMinutes(),
      second: this.currentDate.getSeconds()
    };
  }

  onConfirmDate(): void {
    const campaignUpdateRequest: CampaignUpdateRequest = {
      campaignCurrentDateTime: DateUtils.mapToCampaignDateTime(this.getCurrentDateFromModels())
    }

    this.campaignService.updateCampaign(campaignUpdateRequest)
      .subscribe(response => {
        LocalStorageUtils.setCurrentCampaign(response);
        this.currentDate = DateUtils.extractCurrentCampaignDate(response);
      })
  }

  getCurrentDateModel(): NgbDateStruct {
    return this.dateModel;
  }

  getCurrentDateInfo(): string {
    return `${this.currentDate.getDate()}, ${this.currentDate.toLocaleString('en-US', {month: 'long'})}, ${this.currentDate.getFullYear()}`;
  }

  addTime(): void {
    const newDate = DateUtils.extractCurrentCampaignDate(LocalStorageUtils.getCampaign());

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

    this.updateCampaignWithNewDate(newDate);
  }

  subtractTime(): void {
    const newDate = DateUtils.extractCurrentCampaignDate(LocalStorageUtils.getCampaign());

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

    this.updateCampaignWithNewDate(newDate);
  }

  updateCampaignWithNewDate(newDate: Date) {
    let campaign = LocalStorageUtils.getCampaign();
    campaign.campaignDateTimeCurrent = DateUtils.mapToCampaignDateTime(newDate);

    this.campaignService.updateCampaign(campaign)
      .subscribe(response => {
        this.campaignService.updateLocalStorageCampaign(response);
        this.clearTimeChangeInput();
        this.currentDate = DateUtils.extractCurrentCampaignDate(response)
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
