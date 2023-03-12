import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';
import { Note } from "../../models/campaign/note";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from "@angular/common/http";
import {CampaignService} from "../campaign/campaign.service";
import {Campaign} from "../../models/campaign/campaign";

describe('NoteService', () => {
  let service: NoteService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let campaignServiceSpy: jasmine.SpyObj<CampaignService>;
  const campaignId: string = 'some-campaign-uuid'

  beforeEach(() => {
    const campaignService = jasmine.createSpyObj('CampaignService', ['getLocalStorageCampaign'])
   TestBed.configureTestingModule({
     imports: [ HttpClientTestingModule ],
     providers: [
       { provide: CampaignService, useValue: campaignService }
     ]
   });
// https://angular.io/guide/http#testing-http-requests
   httpClient = TestBed.inject(HttpClient);
   httpTestingController = TestBed.inject(HttpTestingController);

   campaignServiceSpy = TestBed.inject(CampaignService) as jasmine.SpyObj<CampaignService>;
   campaignServiceSpy.getLocalStorageCampaign.and.returnValue({
     id: campaignId
   } as Campaign);

   service = new NoteService(httpClient, campaignServiceSpy);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should get notes', () => {
    const expectedNotes: Note[] = [{
      title: 'Title',
      body: 'Body',
      id: 1
    }]

    service.getNotes()
      .subscribe(notes => {
        expect(notes).toEqual(expectedNotes);
      })

    const req = httpTestingController.expectOne(`http://localhost:8080/v1/notes?campaignId=${campaignId}`);
    expect(req.request.method).toBe("GET");
    req.flush(expectedNotes);
  });

});
