import {Component, OnInit} from '@angular/core';
import {Note} from "../models/note/note";
import {NoteService} from "../services/note/note.service";

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

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
  }

  showNote(note: Note) {
    this.shownNote = note;
  }

  onSubmit() {
    this.noteService.addNote(this.newNoteTitle, this.newNoteBody);
    this.newNoteTitle = "";
    this.newNoteBody = "";
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

}
