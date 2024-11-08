import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../shared/services/environment.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaControllerService {

  hostUrl: string = this.environmentService.getApiUrl() + '/calendar';

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly http: HttpClient
  ) {}

  getEventByMonth(dateMonthYearFormatted: string): Observable<any> {
    const params = {
      dateMonthYearFormatted: dateMonthYearFormatted
    }

    const url = this.hostUrl + '/getEventsByMonth';

    return this.http.get(url, { params: params })
  }
}
