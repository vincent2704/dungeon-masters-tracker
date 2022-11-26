import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {NoteBackend} from "../../models/note/note-backend";

@Injectable({
  providedIn: 'root'
})
export class NoteBackendService {

  backendNoteTest: any;

  constructor(private httpClient: HttpClient) {
  }

  getNotes(campaignId: string) {
    campaignId = '0f29e0da-c69f-44a5-9679-76019f21c8ec'
    let queryParams = new HttpParams().append("campaignId", campaignId)


    return this.httpClient.get<NoteBackend[]>(
      `http://localhost:8080/v1/notes`, {
        params: queryParams
      }
    ).subscribe(
      (response) => {
        console.log(response);
        this.backendNoteTest = response;
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
