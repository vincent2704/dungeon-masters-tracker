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

  it('should return date with subtracted years', () => {
    // given
    let date = new Date(
      1524, 6, 17,
      18, 30, 0
    );

    // when
    let newDate = DateUtils.subtractYears(date, 100);

    // then
    expect(newDate).toEqual(new Date(
      1424, 6, 17,
      18, 30, 0
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

  it('should return time difference in days', () => {
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
    let differenceMillis = DateUtils.getDifferenceInDays(first, second);

    // then
    expect(differenceMillis).toEqual(-2);
  })

  it('should return time difference in hours', () => {
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
    let differenceMillis = DateUtils.getDifferenceInHours(first, second);

    // then
    expect(differenceMillis).toEqual(-48);
  })

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

  it('should check if time passed is longer than X years', () => {
    // given
    let first = new Date(
      1524, 6, 17,
      18, 30, 0
    );
    let second = new Date(
      1424, 6, 17,
      18, 30, 0
    );
    // when
    let shouldBeFalse = DateUtils.isTimePassedLongerThanYears(first, second, 100);
    // then
    expect(shouldBeFalse).toBeFalse()

    // and
    let third = new Date(
      1524, 6, 17,
      18, 30, 1
    );
    let fourth = new Date(
      1424, 6, 17,
      18, 30, 0
    );
    let shouldBeTrue = DateUtils.isTimePassedLongerThanYears(third, fourth, 100);
    // then
    expect(shouldBeTrue).toBeTrue()
  })

});
