import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { NoteService } from "../services/note/note.service";
import { Note } from "../models/note/note";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  let noteServiceSpy: jasmine.SpyObj<NoteService>;
  let defaultNote = new Note('Title 1', 'Body 1')

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
    noteServiceSpy.getNotes.and.returnValue([defaultNote]);

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.notes);
  });

  it('should show note', () => {
    expect(component.shownNote).toBeUndefined();

    component.showNote(defaultNote);
    expect(component.shownNote).toEqual(defaultNote);
  });

  it('should add note', () => {
    noteServiceSpy.addNote('Title 2', 'Body 2');

    expect(noteServiceSpy.addNote).toHaveBeenCalledWith('Title 2', 'Body 2');
    expect(component.newNoteTitle).toEqual("");
    expect(component.newNoteBody).toEqual("");
  });

  it('should delete note', () => {
    component.deleteNote(defaultNote);
    expect(noteServiceSpy.deleteNote).toHaveBeenCalledWith(defaultNote);
    expect(component.shownNote).toBeUndefined();
  });

  it('should edit note', () => {
    component.showNote(defaultNote);
    component.editNote();

    expect(component.editing).toBeTrue();
    expect(component.editedNoteProperties.title).toEqual(defaultNote.getTitle());
    expect(component.editedNoteProperties.body).toEqual(defaultNote.getBody());

    let newTitle = 'New Title';
    let newBody = 'New Body';

    component.editedNoteProperties.title = newTitle;
    component.editedNoteProperties.body = newBody;

    component.submitEdit();
    expect(noteServiceSpy.updateNote).toHaveBeenCalledWith(component.shownNote!, newTitle, newBody);
    expect(component.editing).toBeFalse();
  });

  it('should cancel editing note', () => {
    component.showNote(defaultNote);
    component.editNote();

    let newTitle = 'New Title';
    let newBody = 'New Body';

    component.editedNoteProperties.title = newTitle;
    component.editedNoteProperties.body = newBody;

    component.cancelEdit();
    expect(noteServiceSpy.updateNote).not.toHaveBeenCalled();
    expect(component.notes).toEqual([new Note('Title 1', 'Body 1')])
  });

});
