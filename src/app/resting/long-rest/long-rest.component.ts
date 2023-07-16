import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestingService } from "../../services/resting/resting.service";
import { PlayerCharacter } from "../../models/actors/playerCharacter";
import { CalendarSystem, Campaign } from "../../models/campaign/campaign";
import { CampaignService } from "../../services/campaign/campaign.service";
import { LongRestRequest } from "../../models/campaign/resting/longRestRequest";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";
import { DateUtils } from "../../utilities/date/dateUtils";
import { CampaignDateTime } from "../../models/campaign/campaignDateTime";

@Component({
  selector: 'app-long-rest',
  templateUrl: './long-rest.component.html',
  styleUrls: ['./long-rest.component.css']
})
export class LongRestComponent implements OnInit {

  playerCharacters: PlayerCharacter[] = [];
  restTimeInHours: number = 0;

  campaign: Campaign;

  @Output()
  playerCharacterEmitter = new EventEmitter<PlayerCharacter[]>();

  constructor(private restingService: RestingService, private campaignService: CampaignService) {
    this.campaign = campaignService.getLocalStorageCampaign();
  }

  ngOnInit(): void {
    this.campaign = this.campaignService.getLocalStorageCampaign();
    this.restTimeInHours = this.getMinimumRestingTime1(this.campaign);
    this.playerCharacters = LocalStorageUtils.getPlayerCharacters();
  }

  performLongRest(): void {
    const longRestRequest = {
      hours: this.restTimeInHours
    } as LongRestRequest
    this.campaignService.performLongRest(longRestRequest)
      .subscribe(response => {
        console.log(response)
        LocalStorageUtils.getCampaign().lastLongRestDateTime = response.longRestDateTimeFinished
        LocalStorageUtils.getCampaign().campaignDateTimeCurrent = response.longRestDateTimeFinished
        this.playerCharacterEmitter.emit(response.playerCharacters);
      })
  }

  getTimeSinceLastRest(): number {
    return this.getTimePassedSinceLastLongRest(this.campaign);
  }

  getMinimumRestingTime(): number {
    return this.getMinimumRestingTime1(this.campaign);
  }

  isRestingEnabled(): boolean {
    return this.restTimeInHours >= this.getMinimumRestingTime1(this.campaign);
  }

  getMinimumRestingTime1(campaign: Campaign) {
    const timeSinceLastLongRestInHours = this.getTimePassedSinceLastLongRest(campaign)
    return timeSinceLastLongRestInHours >= 24 ? 8 : (24 - timeSinceLastLongRestInHours + 8);
  }

  getTimePassedSinceLastLongRest(campaign: Campaign): number {
    return this.getTimeDifferenceInHours(campaign.campaignDateTimeCurrent, campaign.lastLongRestDateTime);
  }

  private getTimeDifferenceInHours(later: CampaignDateTime, earlier: CampaignDateTime): number {
    if(this.campaign.calendarSystem == CalendarSystem.GREGORIAN) {
      const gregorianLater: Date = this.convertToGregorian(later);
      const gregorianEarlier: Date = this.convertToGregorian(earlier);
      return (gregorianLater.getTime() - gregorianEarlier.getTime()) / DateUtils.MILLISECONDS_IN_HOUR;
    }
    return 0;
  }

  private convertToGregorian(campaignDateTime: CampaignDateTime): Date {
    const campaignDate = campaignDateTime.date;
    const campaignTime = campaignDateTime.time;
    return new Date(campaignDate.year, campaignDate.month, campaignDate.day,
      campaignTime.hour, campaignTime.minute, campaignTime.second);
  }
}
