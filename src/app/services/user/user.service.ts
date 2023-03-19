import { Injectable } from '@angular/core';
import {Environment} from "../../environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user/user";
import {UserCreationRequest} from "../../models/user/userCreationRequest";
import {LogInRequest} from "../../models/user/logInRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl: string = `${Environment.HOST_ADDRESS}/v1/users`

  constructor(private httpClient: HttpClient) {
  }

  createUser(request: UserCreationRequest): Observable<User> {
    return this.httpClient.post<User>(this.usersUrl, request);
  }

  login(loginRequest: LogInRequest): Observable<User> {
    return this.httpClient.post<User>(this.usersUrl + '/login', loginRequest);
  }

}
