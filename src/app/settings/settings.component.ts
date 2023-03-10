import { Component, OnInit } from '@angular/core';
import {Settings} from "../services/settings/settings";
import {CampaignService} from "../services/campaign/campaign.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  // campaignId?: string;
  campaignId : string = '0f29e0da-c69f-44a5-9679-76019f21c8ec';

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.campaignId = Settings.getCampaignIdTextFieldValue();
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

  onChangeCampaignId() {
    Settings.setCampaignIdTextFieldValue(this.campaignId!);
    this.campaignService.reloadCampaign();
  }
}
