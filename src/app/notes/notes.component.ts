import { Component, OnInit } from '@angular/core';
import {Note} from "../models/note/note";
import {NoteService} from "../services/note/note.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  isCollapsed: boolean = true;
  notes: Note[] = [];

  newNoteTitle: string = "";
  newNoteBody: string = "";

  constructor(private noteService: NoteService) {
    this.notes = noteService.getNotes();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.noteService.addNote(this.newNoteTitle, this.newNoteBody);
    this.newNoteTitle = "";
    this.newNoteBody = "";
  }

  deleteNote(note: Note) {
    this.noteService.deleteNote(note);
  }

}
