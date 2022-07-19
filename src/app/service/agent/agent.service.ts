import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Agent} from "../../model/agent";

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://open-etp-backend.inlinegroup-c.ru/Open-ETP';
  }

  public find(contractorId: number): Observable<Agent[]> {
    let page = 0;
    let size = 50;

    return this.http.post<Agent[]>(this.baseUrl +
      `/contractor/${contractorId}/agent/filter/?page=${page}&size=${size}`, null);
  }
}
