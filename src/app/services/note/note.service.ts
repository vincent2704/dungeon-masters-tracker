import { Injectable } from '@angular/core';
import {Note} from "../../models/note/note";

@Injectable({
  providedIn: 'root'
})
// TODO: backend calls
export class NoteService {

  private readonly notes: Note[];

  constructor() {
    this.notes = []
  }

  getNotes(): Note[] {
    return this.notes;
  }

  addNote(eventTitle: string, eventDescription: string) {
    this.notes.push(new Note(eventTitle, eventDescription));
  }

  deleteNote(note: Note) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }

  updateNote(noteToUpdate: Note, newTitle: string, newBody: string) {
    let note = this.notes.find(note => note === noteToUpdate);
    if(note) {
      note.setTitle(newTitle);
      note.setBody(newBody);
    } else {
      console.error(`Update failed for note with title '${noteToUpdate.getTitle()}' - note not found.`);
    }
  }
}
