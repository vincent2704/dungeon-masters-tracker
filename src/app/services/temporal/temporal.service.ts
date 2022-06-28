import {Injectable} from '@angular/core';
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {TimeStructure} from "../../models/timeStructure";

/*
  Service that manages time progress in the campaign
 */
@Injectable({
  providedIn: 'root'
})
export class TemporalService {

  private currentDate: Date;
  private lastLongRestFinishedDate: Date;

  constructor() {
    //TODO: backend call
    this.currentDate = new Date(
      1524, 6, 17,
      18, 30, 0
    );
    this.lastLongRestFinishedDate = new Date(this.currentDate);
  }

  setCurrentDate(newDate: NgbDateStruct, newTime: NgbTimeStruct) {
    //TODO: backend call
    this.currentDate = new Date(
      // month-1 because NgbDateStruct counts months from 1 while Date counts months from 0
      newDate.year, newDate.month - 1, newDate.day,
      newTime.hour, newTime.minute, newTime.second
    );
  }

  getCurrentDate(): Date {
    return this.currentDate;
  }

  getLastLongRestDate(): Date {
    return this.lastLongRestFinishedDate;
  }

  setLastLongRestDate(lastLongRestFinishedDate: Date) {
    this.lastLongRestFinishedDate = lastLongRestFinishedDate
  }

  addSeconds(secondsToAdd: number) {
    this.currentDate.setSeconds(this.currentDate.getSeconds() + secondsToAdd);
  }

  addTime(timeStructure: TimeStructure) {
    //TODO: backend call
    let months = timeStructure.months ? timeStructure.months : 0;
    let days = timeStructure.days ? timeStructure.days : 0;
    let hours = timeStructure.hours ? timeStructure.hours : 0;
    let minutes = timeStructure.minutes ? timeStructure.minutes : 0;
    let seconds = timeStructure.seconds ? timeStructure.seconds : 0;

    this.currentDate.setMonth(this.currentDate.getMonth() + months);
    this.currentDate.setDate(this.currentDate.getDate() + days);
    this.currentDate.setHours(
      this.currentDate.getHours() + hours,
      this.currentDate.getMinutes() + minutes,
      this.currentDate.getSeconds() + seconds
    );
  }

  subtractTime(timeStructure: TimeStructure) {
    let months = timeStructure.months ? timeStructure.months : 0;
    let days = timeStructure.days ? timeStructure.days : 0;
    let hours = timeStructure.hours ? timeStructure.hours : 0;
    let minutes = timeStructure.minutes ? timeStructure.minutes : 0;
    let seconds = timeStructure.seconds ? timeStructure.seconds : 0;

    this.currentDate.setMonth(this.currentDate.getMonth() - months);
    this.currentDate.setDate(this.currentDate.getDate() - days);
    this.currentDate.setHours(
      this.currentDate.getHours() - hours,
      this.currentDate.getMinutes() - minutes,
      this.currentDate.getSeconds() - seconds
    );
  }
}
