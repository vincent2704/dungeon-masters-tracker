import {Injectable} from '@angular/core';
import {CampaignEvent} from "../../models/campaign/campaignEvent";
import {Environment} from "../../environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {Settings} from "../settings/settings";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly eventsUrl: string = `${Environment.HOST_ADDRESS}/v1/events`

  constructor(private httpClient: HttpClient) {
  }

  getCampaignEvents(): Observable<CampaignEvent[]> {
    const httpOptions = {
      params: new HttpParams().append("campaignId", Settings.getCampaignId())
    }
    return this.httpClient.get<CampaignEvent[]>(this.eventsUrl, httpOptions);
  }

  addCampaignEvent(newEvent: CampaignEvent): Observable<CampaignEvent> {
    const httpOptions = {
      params: new HttpParams().append("campaignId", Settings.getCampaignId())
    }
    return this.httpClient.post<CampaignEvent>(this.eventsUrl, newEvent, httpOptions);
  }

  deleteEvent(eventId: number): Observable<unknown> {
    const httpOptions = {
      params: new HttpParams().append("campaignId", Settings.getCampaignId())
    }
    return this.httpClient.delete(`${this.eventsUrl}/${eventId}`, httpOptions);
  }

}
