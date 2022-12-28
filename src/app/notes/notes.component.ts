import {Component, OnInit} from '@angular/core';
import {NoteService} from "../services/note/note.service";
import {Note} from "../models/campaign/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  collapsed: boolean = true;
  editing: boolean = false;

  notesBackend: Note[] = [];
  shownBackendNote?: Note;
  newNote: Note = {
    title: '',
    body: '',
  }
  noteChanges: Note = {
    title: '',
    body: '',
  }

  constructor( private noteBackendService: NoteService) {
  }

  ngOnInit(): void {
    this.noteBackendService.getNotes()
      .subscribe(
        (data: Note[]) => {
          for(const note of data) {
            this.notesBackend.push(note)
          }
        }
      );
  }

  addNote(newNote: Note): void {
    this.noteBackendService.addNote(newNote)
      .subscribe(note => this.notesBackend.push(note));
  }

  showBackendNote(note: Note) {
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
      let noteToUpdate: Note = {
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

  deleteNote(noteToDelete: Note) {
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
