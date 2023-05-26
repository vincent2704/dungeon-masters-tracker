import { CampaignDateTime } from "./campaignDateTime";

export interface CampaignUpdateRequest {
  name?: string;
  campaignCurrentDateTime?: CampaignDateTime;
  lastLongRestDateTime?: CampaignDateTime;
}
