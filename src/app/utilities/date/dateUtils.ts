export class DateUtils {

  private static readonly MILLISECONDS_IN_DAY = 86_400_000;
  private static readonly MILLISECONDS_IN_HOUR = 3_600_000;
  private static readonly MILLISECONDS_IN_MINUTE = 60_000;
  private static readonly MILLISECONDS_IN_SECOND = 1_000;

  static addDays(date: Date, daysToAdd: number): Date {
    return new Date(date.getTime() + (daysToAdd * this.MILLISECONDS_IN_DAY));
  }

  static addHours(date: Date, hoursToAdd: number) {
    return new Date(date.getTime() + (hoursToAdd * this.MILLISECONDS_IN_HOUR));
  }

  static addMinutes(date: Date, minutesToAdd: number) {
    return new Date(date.getTime() + (minutesToAdd * this.MILLISECONDS_IN_MINUTE));
  }

  static addSeconds(date: Date, secondsToAdd: number) {
    return new Date(date.getTime() + (secondsToAdd * this.MILLISECONDS_IN_SECOND));
  }

  static getDifferenceMillis(first: Date, second: Date) {
    return first.getTime() - second.getTime();
  }
}
