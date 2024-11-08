import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaControllerService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getEventByMonth(dateMonthYearFormatted: string): Observable<any> {
    const params = {
      dateMonthYearFormatted: dateMonthYearFormatted
    }

    const url = 'https://contabix-api.onrender.com/contabix/calendar/getEventsByMonth';

    return this.http.get(url, { params: params })
  }
}
