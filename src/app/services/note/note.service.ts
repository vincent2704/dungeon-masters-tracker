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

  deleteNote(event: Note) {
    this.notes.splice(this.notes.indexOf(event), 1);
  }

}
