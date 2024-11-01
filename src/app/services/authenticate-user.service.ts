import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataInterface } from '../interfaces/user.interface';
import { EnvironmentService } from '../shared/services/environment.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateUserService {
  hostUrl: string = this.environmentService.getApiUrl();

  constructor(private readonly environmentService: EnvironmentService, private readonly http: HttpClient) {}

  authenticateUser(userData: UserDataInterface): Observable<UserDataInterface> {
    const url = this.hostUrl + '/auth-user';
    return this.http.post<UserDataInterface>(url, userData);
  }
}
