import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class EfemeridesService {
  url: string = 'https://api.api-ninjas.com/v1/historicalevents?';
  constructor(private http: HttpClient) {}

  getEventToday(query:any): Observable<Event[]> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-Api-Key', 'RHiP/ASBB3KpJBZE8ibe3g==vfzvrFP2eLjYuqnK');
    return this.http.get<Event[]>(`${this.url}${query}`, { headers });
  }
}
