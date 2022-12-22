import {Component, OnInit} from '@angular/core';
import {CampaignEvent} from "../../models/campaign/campaignEvent";
import {EventService} from "../../services/events/event.service";
import {CampaignService} from "../../services/campaign/campaign.service";

@Component({
  selector: 'app-campaign-events',
  templateUrl: './campaign-events.component.html',
  styleUrls: ['./campaign-events.component.css']
})
export class CampaignEventsComponent implements OnInit {

  isCollapsed: boolean = true;
  events: CampaignEvent[] = [];

  newEvent: CampaignEvent = {
    title: '',
    body: ''
  }

  constructor(private eventService: EventService, private temporalService: CampaignService) {
  }

  ngOnInit(): void {
    this.eventService.getCampaignEvents()
      .subscribe((data: CampaignEvent[]) => {
        for(const event of data) {
          this.events.push(event)
        }
      })
  }

  onSubmit() {
    this.newEvent.campaignDateTimeOccurredEpoch = this.temporalService.getSessionStorageCurrentDate().getTime();
    this.eventService.addCampaignEvent(this.newEvent)
      .subscribe((event) => {
        this.events.push(event);
        this.newEvent = {
          title: '',
          body: ''
        }
      });
  }

  deleteEvent(eventToDelete: CampaignEvent) {
    this.eventService.deleteEvent(eventToDelete.id!)
      .subscribe(() => {
        let eventToRemove = this.events.find(event => event.id == eventToDelete.id)!;
        this.events.splice(this.events.indexOf(eventToRemove), 1)
      })
  }

  formatCampaignDate(campaignEvent: CampaignEvent): string {
    let dateTimeOccurred = new Date(campaignEvent.campaignDateTimeOccurredEpoch!)
    return `${dateTimeOccurred.getDate()}` +
      ` ${dateTimeOccurred.toLocaleString('en-US', {month: 'long'})}` +
      ` ${dateTimeOccurred.getFullYear()}, ${dateTimeOccurred.getHours()}:${dateTimeOccurred.getMinutes()}`;
  }

  formatRealWorldDate(campaignEvent: CampaignEvent): string {
    let realDateTimeCreated = new Date(campaignEvent.realDateTimeCreatedEpoch!)
    return `
    ${realDateTimeCreated.getDate()},
    ${realDateTimeCreated.toLocaleString('en-US', {month: 'long'})},
    ${realDateTimeCreated.getFullYear()},
    ${realDateTimeCreated.getHours()}:${realDateTimeCreated.getMinutes()}`
  }
}
