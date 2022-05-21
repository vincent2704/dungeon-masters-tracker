import {Injectable} from '@angular/core';
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";

/*
  Service that manages time progress in the campaign
 */
@Injectable({
  providedIn: 'root'
})
export class TemporalService {

  private currentDate: Date;

  constructor() {
    //TODO: backend call
    this.currentDate = new Date(
      1524, 6, 17,
      18, 30, 0
    );
  }

  setCurrentDate(newDate: NgbDateStruct, newTime: NgbTimeStruct) {
    //TODO: backend call
    this.currentDate = new Date(
      // month-1 because NgbDateStruct counts months from 1 while Date counts months from 0
      newDate.year, newDate.month-1, newDate.day,
      newTime.hour, newTime.minute, newTime.second
    );
  }

  getCurrentDate(): Date {
    return this.currentDate;
  }
}
