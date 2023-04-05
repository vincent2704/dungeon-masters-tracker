import {Injectable} from '@angular/core';
import {CampaignEvent} from "../../models/campaign/campaignEvent";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CampaignService} from "../campaign/campaign.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly eventsUrl: string = `${environment.apiUrl}/v1/events`

  constructor(private httpClient: HttpClient, private campaignService: CampaignService) {
  }

  getCampaignEvents(): Observable<CampaignEvent[]> {
    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getLocalStorageCampaign().id)
    }
    return this.httpClient.get<CampaignEvent[]>(this.eventsUrl, httpOptions);
  }

  addCampaignEvent(newEvent: CampaignEvent): Observable<CampaignEvent> {
    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getLocalStorageCampaign().id)
    }
    return this.httpClient.post<CampaignEvent>(this.eventsUrl, newEvent, httpOptions);
  }

  deleteEvent(eventId: number): Observable<unknown> {
    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getLocalStorageCampaign().id)
    }
    return this.httpClient.delete(`${this.eventsUrl}/${eventId}`, httpOptions);
  }

}
