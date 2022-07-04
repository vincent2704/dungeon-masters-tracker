import { Injectable } from '@angular/core';
import {CampaignEvent} from "../../models/campaign-events/campaignEvent";
import {TemporalService} from "../temporal/temporal.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private campaignEvents: CampaignEvent[];

  constructor(private temporalService: TemporalService) {
    // TODO: backend call
    this.campaignEvents = []
  }

  getCampaignEvents() {
    return this.campaignEvents;
  }

  addCampaignEvent(eventTitle: string, eventDescription: string,
                   campaignDate: Date = this.temporalService.getCurrentDate()) {

    //TODO: backend call
    this.campaignEvents.push(new CampaignEvent(eventTitle, eventDescription, campaignDate, new Date(Date.now())));
  }

  deleteEvent(event: CampaignEvent) {
    this.campaignEvents.splice(this.campaignEvents.indexOf(event), 1);
  }
}
