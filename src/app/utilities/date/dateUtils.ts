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
}
