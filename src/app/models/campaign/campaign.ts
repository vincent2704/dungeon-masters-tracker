enum CalendarSystem {
  GREGORIAN, HARPTOS
}

export interface Campaign {
  id: string;
  name: string;
  campaignDateTimeStartEpoch: number;
  campaignDateTimeCurrentEpoch: number;
  lastLongRestTimeEpoch: number;
  realDateLastPlayed: Date;
  calendarSystem: CalendarSystem;
}
