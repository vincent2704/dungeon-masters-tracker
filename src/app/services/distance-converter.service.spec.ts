import { TestBed } from '@angular/core/testing';

import { DistanceConverterService } from './distance-converter.service';

describe('DistanceConverterService', () => {
  let service: DistanceConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistanceConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should properly convert feet to meters', () => {
    //given
    let valueOneInFeet = 5;
    let valueTwoInFeet = 15;

    //when
    let valueOneInMeters = service.convertFeetToMeters(valueOneInFeet);
    let valueTwoInMeters = service.convertFeetToMeters(valueTwoInFeet);

    //then
    expect(valueOneInMeters).toEqual(1.5);
    expect(valueTwoInMeters).toEqual(4.5);
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
