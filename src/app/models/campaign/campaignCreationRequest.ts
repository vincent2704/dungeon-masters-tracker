import {CalendarSystem} from "./campaign";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export interface CampaignCreationRequest {
  name: string,
  calendarSystem: CalendarSystem,
  // it's Date for now, but might be changed in the future as other calendar's like fictional ones can possibly have
  // a different format than this
  campaignStartDate: Date,
  campaignStartTime: NgbTimeStruct
}
