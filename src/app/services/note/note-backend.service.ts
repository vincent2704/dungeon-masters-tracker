import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {NoteBackend} from "../../models/note/note-backend";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class NoteBackendService {

  private readonly notesUrl: string = 'http://localhost:8080/v1/notes'
  private readonly campaignId: string = '0f29e0da-c69f-44a5-9679-76019f21c8ec'
  private readonly httpOptions = {
    params: new HttpParams().append("campaignId", this.campaignId)
  }

  constructor(private httpClient: HttpClient) {
  }

  addNote(note: NoteBackend): Observable<NoteBackend> {
    return this.httpClient.post<NoteBackend>(this.notesUrl, note, this.httpOptions);
  }

  getNotes() {
    if(environment.environmentName == Environment.GHPAGES) {
      console.log('Gh pages environment!')
    }
    return this.httpClient.get<NoteBackend[]>(
      this.notesUrl,
      this.httpOptions
    )
  }

  updateNote(note: NoteBackend): Observable<NoteBackend> {
    return this.httpClient.put<NoteBackend>(this.notesUrl, note, this.httpOptions)
  }

  deleteNote(id: number): Observable<unknown> {
    const url = `${this.notesUrl}/${id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }
}
