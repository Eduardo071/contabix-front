import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataInterface } from '../interfaces/user.interface';
import { EnvironmentService } from '../shared/services/environment.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateUserService {
  hostUrl: string = this.environmentService.getApiUrl() + '/usuarios';

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly http: HttpClient
  ) {}

  authenticateUser(userData: UserDataInterface): Observable<UserDataInterface> {
    const url = this.hostUrl + '/loginOrRegister';
    const cleanedData: UserDataInterface = {} as UserDataInterface;

    for (const key in userData) {
      if (
        userData[key as keyof UserDataInterface] !== null &&
        userData[key as keyof UserDataInterface] !== undefined &&
        userData[key as keyof UserDataInterface] !== ''
      ) {
        (cleanedData as any)[key] =
          userData[key as keyof UserDataInterface];
      }
    }

    return this.http.post<UserDataInterface>(url, cleanedData);
  }
}
