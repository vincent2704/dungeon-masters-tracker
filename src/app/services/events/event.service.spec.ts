import {TestBed} from '@angular/core/testing';

import {EventService} from './event.service';
import {CampaignService} from "../campaign/campaign.service";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CampaignEvent} from "../../models/campaign/campaignEvent";
import {Campaign} from "../../models/campaign/campaign";

describe('EventService', () => {
  let service: EventService;
  let temporalServiceSpy: jasmine.SpyObj<CampaignService>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const backendUrl = 'http://localhost:8080/v1/events?campaignId=0f29e0da-c69f-44a5-9679-76019f21c8ec';

  beforeEach(() => {
    const temporalSpy = jasmine.createSpyObj('TemporalService', ['getLocalStorageCampaign']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EventService,
        {provide: CampaignService, useValue: temporalSpy},
      ]
    });

    temporalServiceSpy = TestBed.inject(CampaignService) as jasmine.SpyObj<CampaignService>;
    const currentDate = new Date(1524, 6, 16, 18, 30)
    temporalServiceSpy.getLocalStorageCampaign.and.returnValue({
      id: '123',
      name: "Dummy Name",
      campaignDateTimeStart: 0,
      campaignDateTimeCurrent: currentDate.getTime(),
      lastLongRestDateTime: 0,
    } as Campaign)

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get campaign events', () => {
    const responseEvents: CampaignEvent[] = [
      {
        id: 1,
        title: 'First event',
        body: 'Description 1',
        campaignDateTimeOccurredEpoch: -14057304840000,
        realDateTimeCreatedEpoch: 1670766601836
      },
      {
        id: 2,
        title: 'Second event',
        body: 'Description 2',
        campaignDateTimeOccurredEpoch: -14056786440000,
        realDateTimeCreatedEpoch: 1670766601836
      },
    ]

    // making HTTP GET
    httpClient.get<CampaignEvent[]>(backendUrl)
      .subscribe(responseData => {
        // when observable resolves, result should match test data
        expect(responseData).toEqual(responseEvents);
      })

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(backendUrl);

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(responseEvents);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify()
  });

});
