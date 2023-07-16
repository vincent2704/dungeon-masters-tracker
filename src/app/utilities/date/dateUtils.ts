import { CampaignDateTime } from "../../models/campaign/campaignDateTime";
import { Campaign } from "../../models/campaign/campaign";
import { CampaignDate } from "../../models/campaign/campaignDate";
import { CampaignTime } from "../../models/campaign/campaignTime";

export class DateUtils {

  static readonly MILLISECONDS_IN_DAY = 86_400_000;
  static readonly MILLISECONDS_IN_HOUR = 3_600_000;
  static readonly MILLISECONDS_IN_MINUTE = 60_000;
  static readonly MILLISECONDS_IN_SECOND = 1_000;

  static readonly MILLISECONDS_IN_ROUND = 6_000;

  static addDays(date: Date, daysToAdd: number): Date {
    return new Date(date.getTime() + (daysToAdd * this.MILLISECONDS_IN_DAY));
  }

  static subtractDays(date: Date, daysToSubtract: number): Date {
    return new Date(date.getTime() - (daysToSubtract * this.MILLISECONDS_IN_DAY));
  }

  static subtractYears(date: Date, yearsToSubtract: number): Date {
    // not using milliseconds here because we want leap years to be counted properly as well
    return new Date(date.getFullYear() - yearsToSubtract, date.getMonth(), date.getDate(), date.getHours(),
      date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  }

  static addHours(date: Date, hoursToAdd: number): Date {
    return new Date(date.getTime() + (hoursToAdd * this.MILLISECONDS_IN_HOUR));
  }

  static addMinutes(date: Date, minutesToAdd: number): Date {
    return new Date(date.getTime() + (minutesToAdd * this.MILLISECONDS_IN_MINUTE));
  }

  static addSeconds(date: Date, secondsToAdd: number): Date {
    return new Date(date.getTime() + (secondsToAdd * this.MILLISECONDS_IN_SECOND));
  }

  static addRounds(date: Date, roundsToAdd: number): Date {
    return new Date(date.getTime() + (roundsToAdd * DateUtils.MILLISECONDS_IN_ROUND));
  }

  static isTimePassedLongerThanYears(currentDate: Date, dateInPast: Date, yearsToCheck: number): boolean {
    let currentDateMinusYears = this.subtractYears(currentDate, yearsToCheck);
    return dateInPast < currentDateMinusYears;
  }

  static getDifferenceInDays(first: Date, second: Date): number {
    return this.getDifferenceMillis(first, second) / this.MILLISECONDS_IN_DAY;
  }

  static getDifferenceInHours(first: Date, second: Date): number {
    return this.getDifferenceMillis(first, second) / this.MILLISECONDS_IN_HOUR;
  }

  static getDifferenceInMinutes(first: Date, second: Date): number {
    return this.getDifferenceMillis(first, second) / this.MILLISECONDS_IN_MINUTE;
  }

  static getDifferenceInSeconds(first: Date, second: Date): number {
    return this.getDifferenceMillis(first, second) / this.MILLISECONDS_IN_SECOND;
  }

  static getDifferenceMillis(first: Date, second: Date): number {
    return first.getTime() - second.getTime();
  }

  // TODO: it works for Gregorian Calendar now only
  //  will need to be changed when Harptos calendar is added
  static addCampaignDateTimeHours(hoursToAdd: number, campaignDateTime: CampaignDateTime): CampaignDateTime {
    // const newHourValue = campaignDateTime.time.hour += hoursToAdd;
    // const fullDays = Math.floor(newHourValue / 24);
    // const hours = newHourValue % 24;
    // return {
    //   date: {
    //
    //   }
    // } as CampaignDateTime
    const campaignDate = campaignDateTime.date
    const campaignTime = campaignDateTime.time
    let date = new Date(campaignDate.year, campaignDate.month, campaignDate.day,
      campaignTime.hour, campaignTime.minute, campaignTime.second)
    const dateWithHoursAdded = new Date(date.getTime() + hoursToAdd * 3_600_000);
    return {
      date: {
        year: dateWithHoursAdded.getFullYear(),
        month: dateWithHoursAdded.getMonth(),
        day: dateWithHoursAdded.getDate()
      },
      time: {
        hour: dateWithHoursAdded.getHours(),
        minute: dateWithHoursAdded.getMinutes(),
        second: dateWithHoursAdded.getSeconds()
      }
    } as CampaignDateTime
  }

  static extractCurrentCampaignDate(campaign: Campaign): Date {
    const currentCampaignDate: CampaignDate = campaign.campaignDateTimeCurrent.date;
    const currentCampaignTime: CampaignTime = campaign.campaignDateTimeCurrent.time;

    return new Date(
      currentCampaignDate.year,
      currentCampaignDate.month,
      currentCampaignDate.day,
      currentCampaignTime.hour,
      currentCampaignTime.minute,
      currentCampaignTime.second
    );
  }

  static mapToCampaignDateTime(date: Date): CampaignDateTime {
    return {
      date: {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
      } as CampaignDate,
      time: {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
      } as CampaignTime
    }
  }

}
