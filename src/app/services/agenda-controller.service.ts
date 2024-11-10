import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../shared/services/environment.service';
import { UserDataInterface } from '../interfaces/user.interface';
import { AgendaDataInterface } from '../interfaces/agenda.interface';

@Injectable({
  providedIn: 'root',
})
export class AgendaControllerService {
  hostUrl: string = this.environmentService.getApiUrl() + '/calendar';

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly http: HttpClient
  ) { }

  getEventByMonth(dateMonthYearFormatted: string, idUsuario: number): Observable<AgendaDataInterface[]> {
    const params = {
      dateMonthYearFormatted: dateMonthYearFormatted,
    };

    const url = this.hostUrl + '/getEventsByMonth';

    return this.http.get<AgendaDataInterface[]>(url, { params: params });
  }

  getEventsByActualDayAndUsuario(idUsuario: number): Observable<AgendaDataInterface[]> {
    const params = {
      idUsuario: idUsuario
    }

    const url = this.hostUrl + '/getEventsByActualDayAndUsuario';

    return this.http.get<AgendaDataInterface[]>(url, { params: params })
  }

  getNotificationsByUser(userData: UserDataInterface): Observable<AgendaDataInterface[]> {
    const url = this.hostUrl + '/getNotifications';
    return this.http.post<AgendaDataInterface[]>(url, userData);
  }
}
