import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';
import {Note} from "../../models/note/note";

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add note', () => {
    expect(service.getNotes()).toEqual([]);

    let noteTitle = 'Title 1';
    let noteBody = 'Body 1';
    service.addNote(noteTitle, noteBody);
    expect(service.getNotes()).toEqual([new Note(noteTitle, noteBody)])
  });

  it('should edit note', () => {
    service.addNote('Title 1', 'Body 1');

    service.updateNote(service.getNotes()[0], 'New Title', 'New Body');

    expect(service.getNotes()).toEqual([new Note('New Title', 'New Body')]);
  });

  it('should delete note', () => {
    service.addNote('Title 1', 'Body 1');

    service.deleteNote(service.getNotes()[0]);
    expect(service.getNotes()).toEqual([]);
  });

});
