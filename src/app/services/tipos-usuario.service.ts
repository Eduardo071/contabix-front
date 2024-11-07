import { Injectable } from '@angular/core';
import { EnvironmentService } from '../shared/services/environment.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserTypesInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposUsuarioService {
  hostUrl: string = this.environmentService.getApiUrl() + '/tiposUsuario';

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly http: HttpClient
  ) {}

  getTiposUsuario(): Observable<UserTypesInterface[]>{
    const url = this.hostUrl + '/getAll';

    return this.http.get<UserTypesInterface[]>(url);
  }
}
