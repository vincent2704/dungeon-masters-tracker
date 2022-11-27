import {Component, OnInit} from '@angular/core';
import {Note} from "../models/note/note";
import {NoteService} from "../services/note/note.service";
import {NoteBackendService} from "../services/note/note-backend.service";
import {NoteBackend} from "../models/note/note-backend";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  collapsed: boolean = true;
  notes: Note[] = [];

  newNoteTitle: string = "";
  newNoteBody: string = "";

  shownNote?: Note;

  editing: boolean = false;
  editedNoteProperties = {
    title: '',
    body: '',
  }

  // backend implementation WIP
  notesBackend: NoteBackend[] = []; // experimental
  shownBackendNote?: NoteBackend;
  newNote: NoteBackend = {
    title: '',
    body: '',
  }
  editedBackendNote: NoteBackend = {
    title: '',
    body: '',
  }

  constructor(private noteService: NoteService, private noteBackendService: NoteBackendService) {
  }

  ngOnInit(): void {
    this.showBackendNotes();
  }

  addNote(newNote: NoteBackend): void {
    this.noteBackendService.addNote(newNote)
      .subscribe(note => this.notesBackend.push(note));
  }

  showBackendNotes() {
    this.noteBackendService.getNotes()
      .subscribe(
        (data: NoteBackend[]) => {
          for(const note of data) {
            this.notesBackend.push(note)
          }
        }
      );
  }

  showBackendNote(note: NoteBackend) {
    this.shownBackendNote = note;
  }

  showNote(note: Note) {
    this.shownNote = note;
  }

  // onSubmit() {
  //   this.noteService.addNote(this.newNoteTitle, this.newNoteBody);
  //   this.newNoteTitle = "";
  //   this.newNoteBody = "";
  //   this.collapsed = true;
  // }

  onSubmit() {
    this.noteBackendService.addNote(this.newNote)
      .subscribe(note => this.notesBackend.push(note));
    this.newNote = {
      title: '',
      body: ''
    }
    this.collapsed = true;
  }

  editNote() {
    if (this.shownNote) {
      let noteTitle = this.shownNote.getTitle();
      let noteBody = this.shownNote.getBody();

      this.editedNoteProperties = {
        title: noteTitle,
        body: noteBody
      }

      this.editing = true;
    }
  }

  submitEdit() {
    if (this.shownNote) {
      this.noteService.updateNote(this.shownNote, this.editedNoteProperties.title, this.editedNoteProperties.body);
      this.editing = false;
    }
  }

  deleteNote(note: Note) {
    this.noteService.deleteNote(note);
    this.shownNote = undefined;
  }

  cancelEdit() {
    this.editing = false;
  }
}
