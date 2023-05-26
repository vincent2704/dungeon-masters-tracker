import {DateUtils} from "./dateUtils";
import { CampaignDateTime } from "../../models/campaign/campaignDateTime";

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
    const campaignDateTime = {
      date: {
        year: 1524,
        month: 6,
        day: 17
      },
      time: {
        hour: 18,
        minute: 30,
        second: 0
      }
    } as CampaignDateTime
    // when
    let newDate = DateUtils.addCampaignDateTimeHours(2, campaignDateTime);

    // then
    const expectedCampaignDateTime = {
      date: {
        year: 1524,
        month: 6,
        day: 17
      },
      time: {
        hour: 20,
        minute: 30,
        second: 0
      }
    } as CampaignDateTime
    expect(newDate).toEqual(expectedCampaignDateTime);
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
