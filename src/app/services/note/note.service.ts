import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Note} from "../../models/note/note";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {Environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private readonly notesUrl: string = 'http://localhost:8080/v1/notes'
  private readonly campaignId: string = '0f29e0da-c69f-44a5-9679-76019f21c8ec'
  private readonly httpOptions = {
    params: new HttpParams().append("campaignId", this.campaignId)
  }

  // field for GH Pages demo purpose
  private notes: Observable<Note[]> = new Observable<Note[]>();

  constructor(private httpClient: HttpClient) {
  }

  addNote(note: Note): Observable<Note> {
    if(environment.environmentName == Environment.GHPAGES) {
      return of(note);
    }
    return this.httpClient.post<Note>(this.notesUrl, note, this.httpOptions);
  }

  getNotes(): Observable<Note[]> {
    if(environment.environmentName == Environment.GHPAGES) {
      return this.notes;
    }
    return this.httpClient.get<Note[]>(
      this.notesUrl,
      this.httpOptions
    )
  }

  updateNote(note: Note): Observable<Note> {
    if(environment.environmentName == Environment.GHPAGES) {
      return of(note);
    }
    return this.httpClient.put<Note>(this.notesUrl, note, this.httpOptions)
  }

  deleteNote(id: number): Observable<unknown> {
    if(environment.environmentName == Environment.GHPAGES) {
      return of(id);
    }

    const url = `${this.notesUrl}/${id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }
}
