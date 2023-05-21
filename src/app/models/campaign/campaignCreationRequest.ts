import {CalendarSystem} from "./campaign";
import { CampaignDateTime } from "./campaignDateTime";

export interface CampaignCreationRequest {
  campaignName: string,
  calendarSystem: CalendarSystem,
  campaignStartDateTime: CampaignDateTime
}
