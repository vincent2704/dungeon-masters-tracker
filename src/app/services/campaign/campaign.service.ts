import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Campaign} from "../../models/campaign/campaign";
import {Environment} from "../../environment";
import {CampaignUpdateRequest} from "../../models/campaign/campaignUpdateRequest";

/*
  Service that manages time progress in the campaign
 */
@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private readonly campaignUrl: string = `${Environment.HOST_ADDRESS}/v1/campaigns/${Environment.CAMPAIGN_ID}`
  private readonly CAMPAIGN_STORAGE_KEY = 'campaign'

  constructor(private httpClient: HttpClient) {
   this.getCampaign()
     .subscribe(response => {
       let campaign = {
         name: response.name,
         campaignDateTimeStartEpoch: response.campaignDateTimeStartEpoch,
         campaignDateTimeCurrentEpoch: response.campaignDateTimeCurrentEpoch,
         lastLongRestTimeEpoch: response.lastLongRestTimeEpoch
       } as Campaign;
       sessionStorage.setItem('campaign', JSON.stringify(campaign));
     })
  }

  getCampaign(): Observable<Campaign> {
    return this.httpClient.get<Campaign>(this.campaignUrl);
  }

  getSessionStorageCurrentDate(): Date {
    const campaign = this.getSessionStorageCampaign()
    if(campaign.campaignDateTimeCurrentEpoch) {
      return new Date(campaign.campaignDateTimeCurrentEpoch);
    }

    console.error(`Failed to retrieve current date for campaign: ${Environment.CAMPAIGN_ID}`)
    return new Date();
  }

  updateCampaign(request: CampaignUpdateRequest): Observable<Campaign> {
    return this.httpClient.put<Campaign>(this.campaignUrl, request);
  }

  setCurrentDate(newDate: Date): Observable<Campaign> {
    const updateRequest: CampaignUpdateRequest = {
      campaignDateTimeCurrentEpoch: newDate.getTime()
    }

    return this.httpClient.put<Campaign>(this.campaignUrl, updateRequest);
  }

  setLastLongRestDate(lastLongRestFinishedDate: Date): Observable<Campaign> {
    const updateRequest: CampaignUpdateRequest = {
      lastLongRestTimeEpoch: lastLongRestFinishedDate.getTime()
    }
    return this.httpClient.put<Campaign>(this.campaignUrl, updateRequest);
  }

  addSeconds(secondsToAdd: number): Observable<Campaign> {
    const newDateTime = this.getSessionStorageCampaign().campaignDateTimeCurrentEpoch + secondsToAdd * 1000
    const updateRequest: CampaignUpdateRequest = {
      campaignDateTimeCurrentEpoch: newDateTime
    }
    return this.httpClient.put<Campaign>(this.campaignUrl, updateRequest);
  }

  updateSessionStorageCampaign(campaign: Campaign): void {
    sessionStorage.setItem('campaign', JSON.stringify(campaign));
  }

  getSessionStorageCampaign(): Campaign {
    return JSON.parse(sessionStorage.getItem(this.CAMPAIGN_STORAGE_KEY) || "");
  }
}
