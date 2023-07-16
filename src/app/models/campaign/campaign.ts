import { CampaignDateTime } from "./campaignDateTime";

export enum CalendarSystem {
  GREGORIAN, HARPTOS
}

export interface Campaign {
  id: string;
  name: string;
  campaignDateTimeStart: CampaignDateTime;
  campaignDateTimeCurrent: CampaignDateTime;
  lastLongRestDateTime: CampaignDateTime;
  realDateStart: Date;
  realDateLastPlayed: Date;
  calendarSystem: CalendarSystem;
}
