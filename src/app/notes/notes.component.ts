import {Component, OnInit} from '@angular/core';
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
  editing: boolean = false;

  notesBackend: NoteBackend[] = [];
  shownBackendNote?: NoteBackend;
  newNote: NoteBackend = {
    title: '',
    body: '',
  }
  noteChanges: NoteBackend = {
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
    if (this.shownBackendNote) {
      let noteTitle = this.shownBackendNote.title;
      let noteBody = this.shownBackendNote.body;

      this.noteChanges = {
        title: noteTitle,
        body: noteBody
      }

      this.editing = true;
    }
  }

  submitEdit() {
    if (this.shownBackendNote) {
      let noteToUpdate: NoteBackend = {
        id: this.shownBackendNote.id,
        title: this.noteChanges.title,
        body: this.noteChanges.body
      }
      this.noteBackendService.updateNote(noteToUpdate)
        .subscribe(updatedNote => {
          let noteToUpdate = this.notesBackend.find(note => note.id == updatedNote.id)!;
          let noteIndex =  this.notesBackend.indexOf(noteToUpdate);
          this.notesBackend[noteIndex] = updatedNote;
          this.shownBackendNote = updatedNote;
        });
      this.editing = false;
    }
  }

  deleteNote(noteToDelete: NoteBackend) {
    this.noteBackendService.deleteNote(noteToDelete.id!)
      .subscribe(() => {
        let noteToRemove = this.notesBackend.find(note => note.id == noteToDelete.id)!;
        this.notesBackend.splice(this.notesBackend.indexOf(noteToRemove), 1);
      });
    this.shownBackendNote = undefined;
  }

  cancelEdit() {
    this.editing = false;
  }
}
