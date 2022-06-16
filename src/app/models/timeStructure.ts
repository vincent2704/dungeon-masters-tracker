export class TimeStructure {

  months?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number

  constructor(
    months?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
  ) {
    this.months = months;
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

}
