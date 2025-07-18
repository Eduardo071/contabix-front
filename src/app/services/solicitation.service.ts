import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../shared/services/environment.service';
import { Observable } from 'rxjs';
import { SolicitacoesDataInterface } from '../interfaces/solicitacoes.interface';
import { UserDataInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitationService {

  hostUrl: string = this.environmentService.getApiUrl() + '/solicitation';

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly http: HttpClient
  ) { }

  getSolicitationsByUser(user: UserDataInterface): Observable<SolicitacoesDataInterface[]> {
    const url = this.hostUrl + '/getSolicitationsByUser';

    return this.http.post<SolicitacoesDataInterface[]>(url, user);
  }


  postNewSolicitation(solicitation: SolicitacoesDataInterface, arquivo: File): Observable<SolicitacoesDataInterface> {
    const formData: FormData = new FormData();
    formData.append('solicitation', new Blob([JSON.stringify(solicitation)], { type: 'application/json' }));
    formData.append('file', arquivo);

    const url = this.hostUrl + '/postNewSolicitation';

    return this.http.post<SolicitacoesDataInterface>(url, formData);
  }
}
