import {CalendarSystem} from "./campaign";

export interface CampaignCreationRequest {
  name: string,
  calendarSystem: CalendarSystem,
  campaignDateTimeStartEpoch: number
}
