import { Injectable } from '@angular/core';
import {CampaignEvent} from "../../models/campaign-events/campaignEvent";
import {TemporalService} from "../temporal/temporal.service";
import {Environment} from "../../environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly eventsUrl: string = `${Environment.HOST_ADDRESS}/v1/events`
  private readonly httpOptions = {
    params: new HttpParams().append("campaignId", Environment.CAMPAIGN_ID)
  }

  private campaignEvents: Observable<CampaignEvent[]> = new Observable<CampaignEvent[]>();

  constructor(private temporalService: TemporalService, private httpClient: HttpClient) {
  }

  getCampaignEvents(): Observable<CampaignEvent[]> {
    if(environment.environmentName == Environment.GHPAGES) {
      return this.campaignEvents;
    }
    return this.httpClient.get<CampaignEvent[]>(this.eventsUrl, this.httpOptions);
  }

  addCampaignEvent(newEvent: CampaignEvent,
                   campaignDate: Date = this.temporalService.getCurrentDate()): Observable<CampaignEvent> {

    newEvent.campaignDateTimeOccurredEpoch = campaignDate.getMilliseconds();

    return this.httpClient.post<CampaignEvent>(this.eventsUrl, newEvent);
    // this.campaignEvents.push(new CampaignEvent(eventTitle, eventDescription, campaignDate, new Date(Date.now())));
  }

  deleteEvent(eventId: number): Observable<unknown> {
    if(environment.environmentName == Environment.GHPAGES) {
      return of(eventId);
    }

    return this.httpClient.delete(`${this.eventsUrl}/${eventId}`)
    // this.campaignEvents.splice(this.campaignEvents.indexOf(event), 1);
  }

}
