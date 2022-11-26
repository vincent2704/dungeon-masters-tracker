import { TestBed } from '@angular/core/testing';

import { NoteBackendService } from './note-backend.service';

describe('NoteBackendService', () => {
  let service: NoteBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
