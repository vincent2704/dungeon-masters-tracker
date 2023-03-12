import { Component, OnInit } from '@angular/core';
import {Settings} from "../services/settings/settings";
import {CampaignService} from "../services/campaign/campaign.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  campaignId : string;

  constructor(private campaignService: CampaignService) {
    this.campaignId = this.campaignService.getLocalStorageCampaign().id;
  }

  ngOnInit(): void {
    this.campaignId = this.campaignService.getLocalStorageCampaign().id;
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

  onChangeCampaign() {
    this.campaignService.reloadCampaign(this.campaignId);
  }
}
