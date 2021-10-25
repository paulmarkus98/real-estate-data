import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricsApiClientService {

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/dev/fetch-data`,  {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
