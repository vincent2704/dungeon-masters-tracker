import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NoteService} from "../services/note/note.service";
import {Note} from "../models/campaign/note";
import {Observable, of} from "rxjs";

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  let noteServiceSpy: jasmine.SpyObj<NoteService>;
  let defaultNote: Note = {
    id: 1,
    title: 'Note 1',
    body: 'Description 1'
  }

  beforeEach(async () => {
    const noteService = jasmine.createSpyObj('NoteService',
      ['addNote', 'getNotes', 'updateNote', 'deleteNote'])

    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ NotesComponent, NgbCollapse ],
      providers: [
        { provide: NoteService, useValue: noteService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    noteServiceSpy = TestBed.inject(NoteService) as jasmine.SpyObj<NoteService>;
    noteServiceSpy.getNotes.and.returnValue(of([defaultNote]));

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.notesBackend);
  });

  it('should show note', () => {
    expect(component.shownBackendNote).toBeUndefined();

    component.showBackendNote(defaultNote);
    expect(component.shownBackendNote).toEqual(defaultNote);
  });

  it('should add note', () => {
    const noteToAdd: Note = {
      title: 'Title',
      body: 'Body'
    }
    noteServiceSpy.addNote(noteToAdd);

    expect(noteServiceSpy.addNote).toHaveBeenCalledWith(noteToAdd);
    expect(component.newNote.title).toEqual("");
    expect(component.newNote.body).toEqual("");
  });

  it('should delete note', () => {
    noteServiceSpy.deleteNote.withArgs(defaultNote.id!).and.returnValue(new Observable<unknown>())
    component.deleteNote(defaultNote);

    expect(noteServiceSpy.deleteNote).toHaveBeenCalledWith(defaultNote.id!);
    expect(component.shownBackendNote).toBeUndefined();
  });

  it('should edit note', () => {

    component.showBackendNote(defaultNote);
    component.editNote();

    expect(component.editing).toBeTrue();
    expect(component.noteChanges.title).toEqual(defaultNote.title);
    expect(component.noteChanges.body).toEqual(defaultNote.body);

    let newTitle = 'New Title';
    let newBody = 'New Body';

    component.noteChanges.title = newTitle;
    component.noteChanges.body = newBody;

    noteServiceSpy.updateNote.withArgs({
      id: 1,
      title: newTitle,
      body: newBody
    }).and.returnValue(of({
      id: 1,
      title: newTitle,
      body: newBody
    }))

    component.submitEdit();
    expect(noteServiceSpy.updateNote).toHaveBeenCalledWith(component.shownBackendNote!);
    expect(component.editing).toBeFalse();
  });

  it('should cancel editing note', () => {
    component.showBackendNote(defaultNote);
    component.editNote();

    let newTitle = 'New Title';
    let newBody = 'New Body';

    component.noteChanges.title = newTitle;
    component.noteChanges.body = newBody;

    component.cancelEdit();
    expect(noteServiceSpy.updateNote).not.toHaveBeenCalled();
    expect(component.notesBackend).toEqual([{
      id: defaultNote.id,
      title: defaultNote.title,
      body: defaultNote.body
    }])
  });

});
