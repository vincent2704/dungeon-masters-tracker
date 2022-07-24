import {DateUtils} from "./dateUtils";

describe('DateUtils', () => {

  it('should return date with added days', () => {
    // given
    let date = new Date(
      1524, 6, 17,
      18, 30, 0
    );

    // when
    let newDate = DateUtils.addDays(date, 2);

    // then
    expect(newDate).toEqual(new Date(
      1524, 6, 19,
      18, 30, 0
    ));
  });

  it('should return date with added hours', () => {
    // given
    let date = new Date(
      1524, 6, 17,
      18, 30, 0
    );

    // when
    let newDate = DateUtils.addHours(date, 2);

    // then
    expect(newDate).toEqual(new Date(
      1524, 6, 17,
      20, 30, 0
    ));
  });

  it('should return date with added minutes', () => {
    // given
    let date = new Date(
      1524, 6, 17,
      18, 30, 0
    );

    // when
    let newDate = DateUtils.addMinutes(date, 2);

    // then
    expect(newDate).toEqual(new Date(
      1524, 6, 17,
      18, 32, 0
    ));
  });

  it('should return date with added seconds', () => {
    // given
    let date = new Date(
      1524, 6, 17,
      18, 30, 0
    );

    // when
    let newDate = DateUtils.addSeconds(date, 2);

    // then
    expect(newDate).toEqual(new Date(
      1524, 6, 17,
      18, 30, 2
    ));
  });

  it('should return time difference in milliseconds', () => {
    // given
    let first = new Date(
      1524, 6, 17,
      18, 30, 0
    );
    let second = new Date(
      1524, 6, 19,
      18, 30, 0
    );

    // when
    let differenceMillis = DateUtils.getDifferenceMillis(first, second);

    // then
    expect(differenceMillis).toEqual(-172_800_000);
  })

});
