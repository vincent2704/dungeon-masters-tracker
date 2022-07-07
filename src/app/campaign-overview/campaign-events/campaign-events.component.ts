import {Component, OnInit} from '@angular/core';
import {CampaignEvent} from "../../models/campaign-events/campaignEvent";
import {EventService} from "../../services/events/event.service";

@Component({
  selector: 'app-campaign-events',
  templateUrl: './campaign-events.component.html',
  styleUrls: ['./campaign-events.component.css']
})
export class CampaignEventsComponent implements OnInit {

  isCollapsed: boolean = true;
  events: CampaignEvent[] = [];

  newEventTitle: string = "";
  newEventDescription: string = "";

  constructor(private eventService: EventService) {
    this.events = eventService.getCampaignEvents();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.eventService.addCampaignEvent(this.newEventTitle, this.newEventDescription);
    this.newEventTitle = "";
    this.newEventDescription = "";
  }

  deleteEvent(event: CampaignEvent) {
    this.eventService.deleteEvent(event);
  }
}
