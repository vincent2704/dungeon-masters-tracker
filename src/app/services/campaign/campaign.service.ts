import {Injectable} from '@angular/core';
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {TimeStructure} from "../../models/timeStructure";
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
   this.httpClient.get<Campaign>(this.campaignUrl)
     .subscribe(response => {
       let campaign = {
         name: response.name,
         campaignDateTimeStartEpoch: response.campaignDateTimeStartEpoch,
         campaignDateTimeCurrentEpoch: response.campaignDateTimeCurrentEpoch,
         realDateStartEpoch: response.realDateStartEpoch,
         realDateLastPlayedEpoch: response.realDateLastPlayedEpoch,
         lastLongRestTimeEpoch: response.lastLongRestTimeEpoch
       } as Campaign;

       sessionStorage.setItem('campaign', JSON.stringify(campaign));
     })
  }

  getCurrentDate(): Date {
    const campaign = this.getSessionStorageCampaign()
    if(campaign.campaignDateTimeCurrentEpoch) {
      return new Date(campaign.campaignDateTimeCurrentEpoch);
    }

    console.error(`Failed to retrieve current date for campaign: ${Environment.CAMPAIGN_ID}`)
    return new Date();
  }

  getLastLongRestDate(): Date {
    const lastLongRestTimeEpoch = this.getSessionStorageCampaign().lastLongRestTimeEpoch
    return new Date(lastLongRestTimeEpoch);
  }

  setCurrentDate(newDate: NgbDateStruct, newTime: NgbTimeStruct): Observable<Campaign> {
    const updatedTime = new Date(
      // month-1 because NgbDateStruct counts months from 1 while Date counts months from 0
      newDate.year, newDate.month - 1, newDate.day,
      newTime.hour, newTime.minute, newTime.second
    ).getTime();

    const updateRequest: CampaignUpdateRequest = {
      campaignDateTimeCurrentEpoch: updatedTime
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

  addTime(timeStructure: TimeStructure): Observable<Campaign> {
    let currentCampaignDate = new Date(this.getSessionStorageCampaign().campaignDateTimeCurrentEpoch)

    let months = timeStructure.months ? timeStructure.months : 0;
    let days = timeStructure.days ? timeStructure.days : 0;
    let hours = timeStructure.hours ? timeStructure.hours : 0;
    let minutes = timeStructure.minutes ? timeStructure.minutes : 0;
    let seconds = timeStructure.seconds ? timeStructure.seconds : 0;

    currentCampaignDate.setMonth(currentCampaignDate.getMonth() + months);
    currentCampaignDate.setDate(currentCampaignDate.getDate() + days);
    currentCampaignDate.setHours(
      currentCampaignDate.getHours() + hours,
      currentCampaignDate.getMinutes() + minutes,
      currentCampaignDate.getSeconds() + seconds
    );

    const campaignUpdateRequest: CampaignUpdateRequest = {
      campaignDateTimeCurrentEpoch: currentCampaignDate.getTime()
    }

    return this.httpClient.put<Campaign>(this.campaignUrl, campaignUpdateRequest);
  }

  subtractTime(timeStructure: TimeStructure): Observable<Campaign> {
    let currentCampaignDate = new Date(this.getSessionStorageCampaign().campaignDateTimeCurrentEpoch)

    let months = timeStructure.months ? timeStructure.months : 0;
    let days = timeStructure.days ? timeStructure.days : 0;
    let hours = timeStructure.hours ? timeStructure.hours : 0;
    let minutes = timeStructure.minutes ? timeStructure.minutes : 0;
    let seconds = timeStructure.seconds ? timeStructure.seconds : 0;

    currentCampaignDate.setMonth(currentCampaignDate.getMonth() - months);
    currentCampaignDate.setDate(currentCampaignDate.getDate() - days);
    currentCampaignDate.setHours(
      currentCampaignDate.getHours() - hours,
      currentCampaignDate.getMinutes() - minutes,
      currentCampaignDate.getSeconds() - seconds
    );

    const campaignUpdateRequest: CampaignUpdateRequest = {
      campaignDateTimeCurrentEpoch: currentCampaignDate.getTime()
    }

    return this.httpClient.put<Campaign>(this.campaignUrl, campaignUpdateRequest);
  }

  updateSessionStorageCampaign(campaign: Campaign): void {
    sessionStorage.setItem('campaign', JSON.stringify(campaign));
  }

  private getSessionStorageCampaign(): Campaign {
    return JSON.parse(sessionStorage.getItem(this.CAMPAIGN_STORAGE_KEY) || "");
  }
}
