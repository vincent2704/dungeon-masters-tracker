import {TestBed} from '@angular/core/testing';

import {CampaignService} from './campaign.service';
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {TimeStructure} from "../../models/timeStructure";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CampaignService', () => {
  let service: CampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule]
    });
    service = TestBed.inject(CampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly set the new date', () => {
    //given
    let newDate: NgbDateStruct = {day: 17, month: 12, year: 1524};
    let newTime: NgbTimeStruct = {hour: 18, minute: 30, second: 0}

    //when
    service.setCurrentDate(newDate, newTime);

    //then
    expect(service.getCurrentDate().getDate()).toEqual(17);
    expect(service.getCurrentDate().toLocaleString('en-US', {month: 'long'})).toEqual('December');
    expect(service.getCurrentDate().getFullYear()).toEqual(1524);
  });

  it('should add progressed time', () => {
    //given
    let newDate: NgbDateStruct = {day: 17, month: 12, year: 2020};
    let newTime: NgbTimeStruct = {hour: 18, minute: 30, second: 0}
    service.setCurrentDate(newDate, newTime);

    //when
    service.addSeconds(60);

    //then
    expect(service.getCurrentDate()).toEqual(new Date(2020, 11, 17, 18, 31, 0));
  });

  it('should properly add time using time structure', () => {
    //given
    let newDate: NgbDateStruct = {day: 17, month: 12, year: 2020};
    let newTime: NgbTimeStruct = {hour: 18, minute: 30, second: 0}
    service.setCurrentDate(newDate, newTime);

    let timeStructure = new TimeStructure(1, 15, 6, 31, 61);

    //when
    service.addTime(timeStructure);

    //then
    expect(service.getCurrentDate()).toEqual(new Date(2021, 1, 2, 1, 2,1));
  });

  it('should properly add one month', () => {
    //given
    let newDate: NgbDateStruct = {day: 17, month: 7, year: 1524};
    let newTime: NgbTimeStruct = {hour: 18, minute: 30, second: 0}
    service.setCurrentDate(newDate, newTime);

    let timeStructure = new TimeStructure(1, 0, 0, 0, 0);

    //when
    service.addTime(timeStructure);

    //then
    expect(service.getCurrentDate()).toEqual(new Date(1524, 7, 17, 18, 30,0));
  });

  it('should properly subtract time using time structure', () => {
    //given
    let newDate: NgbDateStruct = {day: 17, month: 12, year: 2020};
    let newTime: NgbTimeStruct = {hour: 18, minute: 30, second: 0}
    service.setCurrentDate(newDate, newTime);

    let timeStructure = new TimeStructure(12, 15, 6, 31, 61);

    //when
    service.subtractTime(timeStructure);

    //then
    expect(service.getCurrentDate()).toEqual(new Date(2019, 11, 2, 11, 57,59));
  });

});
