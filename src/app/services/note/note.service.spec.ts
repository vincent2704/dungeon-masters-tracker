import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';
import { Note } from "../../models/campaign/note";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from "@angular/common/http";

describe('NoteBackendService', () => {
  let service: NoteService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [ HttpClientTestingModule ]
   });
// https://angular.io/guide/http#testing-http-requests
   httpClient = TestBed.inject(HttpClient);
   httpTestingController = TestBed.inject(HttpTestingController);

   service = new NoteService(httpClient);
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

    const req = httpTestingController.expectOne('http://localhost:8080/v1/notes?campaignId=0f29e0da-c69f-44a5-9679-76019f21c8ec');
    expect(req.request.method).toBe("GET");
    req.flush(expectedNotes);
  });

});
