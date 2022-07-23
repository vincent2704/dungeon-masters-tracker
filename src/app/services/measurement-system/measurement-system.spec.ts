import { MeasurementSystem } from './measurement.system';

describe('MeasurementSystemService', () => {

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
    let valueOneInMeters = MeasurementSystem.convertFeetToMeters(valueOneInFeet);
    let valueTwoInMeters = MeasurementSystem.convertFeetToMeters(valueTwoInFeet);
    let valueThreeInMeters = MeasurementSystem.convertFeetToMeters(valueThreeInFeet);
    let valueFourInMeters = MeasurementSystem.convertFeetToMeters(valueFourInFeet);
    let valueFiveInMeters = MeasurementSystem.convertFeetToMeters(valueFiveInFeet);
    let valueSixInMeters = MeasurementSystem.convertFeetToMeters(valueSixInFeet);
    let valueSevenInMeters = MeasurementSystem.convertFeetToMeters(valueSevenInFeet);
    let valueEightInMeters = MeasurementSystem.convertFeetToMeters(valueEightInFeet);

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
    let valueOneInKilometers = MeasurementSystem.convertMilesToKilometers(valueOneInMiles);
    let valueTwoInKilometers = MeasurementSystem.convertMilesToKilometers(valueTwoInMiles);
    let valueThreeInKilometers = MeasurementSystem.convertMilesToKilometers(valueThreeInMiles);

    //then
    expect(valueOneInKilometers).toEqual(45);
    expect(valueTwoInKilometers).toEqual(36);
    expect(valueThreeInKilometers).toEqual(27);
  });

});
