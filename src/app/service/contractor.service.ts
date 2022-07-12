import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contractor} from "../model/contractor";

@Injectable({
  providedIn: 'root'
})
export class ContractorService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://open-etp-backend.inlinegroup-c.ru/Open-ETP';
  }

  public findAll(): Observable<Contractor[]> {
    let page = 0;
    let size = 50;

    return this.http.post<Contractor[]>(this.baseUrl + `/contractor/filter/?page=${page}&size=${size}`, null);
  }

  public get(): Observable<any> {
    let id = 141272590021;

    return this.http.get<any>(`https://open-etp-backend.inlinegroup-c.ru/Open-ETP/contractor/${id}`);
  }
}
