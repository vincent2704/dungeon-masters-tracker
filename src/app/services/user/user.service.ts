import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user/user";
import {UserCreationRequest} from "../../models/user/userCreationRequest";
import {LogInRequest} from "../../models/user/logInRequest";
import {Campaign} from "../../models/campaign/campaign";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl: string = `${environment.apiUrl}/v1/users`
  private readonly LOCAL_STORAGE_USER_KEY: string = 'current_user';

  constructor(private httpClient: HttpClient) {
  }

  createUser(request: UserCreationRequest): Observable<User> {
    return this.httpClient.post<User>(this.usersUrl, request);
  }

  login(loginRequest: LogInRequest): Observable<User> {
    return this.httpClient.post<User>(this.usersUrl + '/login', loginRequest);
  }

  getLocalStorageCampaigns(): Campaign[] {
    const user: User = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_USER_KEY)!);
    return user.campaigns;
  }

}
