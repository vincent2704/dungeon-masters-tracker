import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Note} from "../../models/campaign/note";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {Environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private readonly notesUrl: string = `${Environment.HOST_ADDRESS}/v1/notes`
  private readonly httpOptions = {
    params: new HttpParams().append("campaignId", Environment.CAMPAIGN_ID)
  }

  // field for GH Pages demo purpose
  private notes: Observable<Note[]> = new Observable<Note[]>();

  constructor(private httpClient: HttpClient) {
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>(this.notesUrl, note, this.httpOptions);
  }

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(
      this.notesUrl,
      this.httpOptions
    )
  }

  updateNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(this.notesUrl, note, this.httpOptions)
  }

  deleteNote(id: number): Observable<unknown> {
    const url = `${this.notesUrl}/${id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }
}
