import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import { TemporalService } from "../temporal/temporal.service";

describe('EventService', () => {
  let service: EventService;
  let temporalServiceSpy: jasmine.SpyObj<TemporalService>;

  beforeEach(() => {
    const temporalSpy = jasmine.createSpyObj('TemporalService', ['getCurrentDate']);

    TestBed.configureTestingModule({
      providers: [
        EventService,
        { provide: TemporalService, useValue: temporalSpy },
      ]
    });

    temporalServiceSpy = TestBed.inject(TemporalService) as jasmine.SpyObj<TemporalService>;
    temporalServiceSpy.getCurrentDate.and.returnValue(new Date(1524, 6, 16, 18, 30));
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add campaign event', () => {
    //given
    const eventTitle = 'Title'
    const eventDescription = 'Description'

    //when
    service.addCampaignEvent(eventTitle, eventDescription);

    //then
    expect(service.getCampaignEvents()[0].getTitle()).toEqual(eventTitle)
    expect(service.getCampaignEvents()[0].getDescription()).toEqual(eventDescription)
    expect(service.getCampaignEvents()[0].getCampaignDateFormatted()).toEqual('16 July 1524, 18:30')
  });

});
