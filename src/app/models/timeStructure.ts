export class TimeStructure {

  readonly months: number
  readonly days: number
  readonly hours: number
  readonly minutes: number
  readonly seconds: number

  constructor(
    months: number = 0,
    days: number = 0,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
  ) {
    this.months = months;
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

}
