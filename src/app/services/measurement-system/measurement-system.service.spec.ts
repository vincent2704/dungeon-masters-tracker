import { TestBed } from '@angular/core/testing';

import { MeasurementSystemService } from './measurement-system.service';

describe('MeasurementSystemService', () => {
  let service: MeasurementSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasurementSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should properly convert feet to meters', () => {
    //given
    let valueOneInFeet = 20; // 6m
    let valueTwoInFeet = 50; // 15m
    let valueThreeInFeet = 10; // 3
    let valueFourInFeet = 40; // 12
    let valueFiveInFeet = 30; // 9
    let valueSixInFeet = 90; // 27
    let valueSevenInFeet = 5;
    let valueEightInFeet = 15;

    //when
    let valueOneInMeters = service.convertFeetToMeters(valueOneInFeet);
    let valueTwoInMeters = service.convertFeetToMeters(valueTwoInFeet);
    let valueThreeInMeters = service.convertFeetToMeters(valueThreeInFeet);
    let valueFourInMeters = service.convertFeetToMeters(valueFourInFeet);
    let valueFiveInMeters = service.convertFeetToMeters(valueFiveInFeet);
    let valueSixInMeters = service.convertFeetToMeters(valueSixInFeet);
    let valueSevenInMeters = service.convertFeetToMeters(valueSevenInFeet);
    let valueEightInMeters = service.convertFeetToMeters(valueEightInFeet);

    //then
    expect(valueOneInMeters).toEqual(6);
    expect(valueTwoInMeters).toEqual(15);
    expect(valueThreeInMeters).toEqual(3);
    expect(valueFourInMeters).toEqual(12);
    expect(valueFiveInMeters).toEqual(9);
    expect(valueSixInMeters).toEqual(27);
    expect(valueSevenInMeters).toEqual(1.5);
    expect(valueEightInMeters).toEqual(4.5);
  });

  it('should properly convert miles to kilometers', () => {
    //given
    let valueOneInMiles = 30;
    let valueTwoInMiles = 24;
    let valueThreeInMiles = 18;

    //when
    let valueOneInKilometers = service.convertMilesToKilometers(valueOneInMiles);
    let valueTwoInKilometers = service.convertMilesToKilometers(valueTwoInMiles);
    let valueThreeInKilometers = service.convertMilesToKilometers(valueThreeInMiles);

    //then
    expect(valueOneInKilometers).toEqual(45);
    expect(valueTwoInKilometers).toEqual(36);
    expect(valueThreeInKilometers).toEqual(27);
  });

});
