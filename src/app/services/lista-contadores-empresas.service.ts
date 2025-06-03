import { Injectable } from '@angular/core';
import { EnvironmentService } from '../shared/services/environment.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaContadoresEmpresasService {
  hostUrl: string = this.environmentService.getApiUrl() + '/usuarios';

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly http: HttpClient
  ) { }

  getEmpresas(): Observable<any[]> {
    const url = this.hostUrl + '/getEmpresas';

    return this.http.get<any[]>(url);
  }

  getContadores() {
    const url = this.hostUrl + '/getContadores';

    return this.http.get<any[]>(url);
  }

  avaliar(rate: number, userId: number): Observable<any> {
    const url = `${this.hostUrl}/avaliar`;
    const params = {
      rate: rate,
      userId: userId
    };

    return this.http.post<any>(url, null, { params });
  }
}
