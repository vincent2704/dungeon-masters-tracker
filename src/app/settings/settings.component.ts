import { Component, OnInit } from '@angular/core';
import {Settings} from "../services/settings/settings";
import {CampaignService} from "../services/campaign/campaign.service";
import {Campaign} from "../models/campaign/campaign";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  campaignId : string;
  campaigns: Campaign[] = [];

  constructor(private campaignService: CampaignService, private userService: UserService) {
    this.campaignId = this.campaignService.getLocalStorageCampaign().id;
  }

  ngOnInit(): void {
    this.campaignId = this.campaignService.getLocalStorageCampaign().id;
    this.campaigns = this.userService.getLocalStorageCampaigns();
  }

  onUseSISystemChange(): void {
    Settings.changeUsedMeasurementSystem();
  }

  onAutoLoadProtagonistsChange(): void {
    Settings.changeAutoLoadProtagonists();
  }

  onAutoLoadMonsterActionsChange(): void {
    Settings.changeAutoLoadMonsterActions();
  }

  isUsingSISystem(): boolean {
    return Settings.isUsingSISystem();
  }

  isAutoLoadProtagonists(): boolean {
    return Settings.isAutoLoadProtagonists();
  }

  isAutoLoadMonsterActions(): boolean {
    return Settings.isAutoLoadMonsterActions();
  }

  loadCampaign(campaign: Campaign): void {
    this.campaignService.getCampaign(campaign)
      .subscribe(response => {
        localStorage.setItem('current_campaign', JSON.stringify(response));
      })
  }
}
