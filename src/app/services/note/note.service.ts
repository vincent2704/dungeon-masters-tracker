import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Note} from "../../models/campaign/note";
import {Observable} from "rxjs";
import {Environment} from "../../environment";
import {CampaignService} from "../campaign/campaign.service";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private readonly notesUrl: string = `${Environment.HOST_ADDRESS}/v1/notes`

  constructor(private httpClient: HttpClient, private campaignService: CampaignService) {
  }

  addNote(note: Note): Observable<Note> {
    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getLocalStorageCampaign().id)
    }
    return this.httpClient.post<Note>(this.notesUrl, note, httpOptions);
  }

  getNotes(): Observable<Note[]> {
    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getLocalStorageCampaign().id)
    }
    return this.httpClient.get<Note[]>(
      this.notesUrl,
      httpOptions
    )
  }

  updateNote(note: Note): Observable<Note> {
    const httpOptions = {
      params: new HttpParams().append("campaignId",this.campaignService.getLocalStorageCampaign().id)
    }
    return this.httpClient.put<Note>(this.notesUrl, note, httpOptions)
  }

  deleteNote(id: number): Observable<unknown> {
    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getLocalStorageCampaign().id)
    }
    const url = `${this.notesUrl}/${id}`;
    return this.httpClient.delete(url, httpOptions);
  }
}
