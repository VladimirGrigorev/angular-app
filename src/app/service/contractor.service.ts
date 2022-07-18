import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contractor} from "../model/contractor";
import {Filter} from "../model/filter";

@Injectable({
  providedIn: 'root'
})
export class ContractorService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://open-etp-backend.inlinegroup-c.ru/Open-ETP';
  }

  public find(): Observable<Contractor[]> {
    let page = 0;
    let size = 50;

    return this.http.post<Contractor[]>(this.baseUrl + `/contractor/filter/?page=${page}&size=${size}`, null);
  }

  // public get(): Observable<any> {
  //   let id = 141272590021;
  //
  //   return this.http.get<any>(`https://open-etp-backend.inlinegroup-c.ru/Open-ETP/contractor/${id}`);
  // }

  public filterOneCond(column: string, operator: string, expression: string): Observable<Contractor[]> {
    let page = 0;
    let size = 50;

    return this.http.post<Contractor[]>(this.baseUrl + `/contractor/filter/?page=${page}&size=${size}`,
      {
        "logic": "and",
        "cond": [
          {
            "field": column,
            "operator": operator,
            "value": expression
          }
        ]
      });
  }

  public filter(filter: Filter): Observable<Contractor[]> {
    let page = 0;
    let size = 50;

    return this.http.post<Contractor[]>(this.baseUrl + `/contractor/filter/?page=${page}&size=${size}`, filter);
  }

  public searchAll(queryField: string): Observable<Contractor[]> {
    let page = 0;
    let size = 50;

    return this.http.post<Contractor[]>(this.baseUrl + `/contractor/filter/?page=${page}&size=${size}`,
      {
        "logic": "and",
        "cond": [
          {
            "filter": {
              "logic": "or",
              "cond": [
                {
                  "field": "lbl",
                  "operator": "like",
                  "value": "%"+queryField+"%"
                },
                {
                  "field": "nameFull",
                  "operator": "like",
                  "value": "%"+queryField+"%"
                },
                {
                  "field": "address",
                  "operator": "like",
                  "value": "%"+queryField+"%"
                },
                {
                  "field": "inn",
                  "operator": "like",
                  "value": "%"+queryField+"%"
                },
                {
                  "field": "kpp",
                  "operator": "like",
                  "value": "%"+queryField+"%"
                },
                {
                  "field": "listWork",
                  "operator": "like",
                  "value": "%"+queryField+"%"
                },
                {
                  "field": "oeStartDate",
                  "operator": "like",
                  "value": "%"+queryField+"%"
                },
                {
                  "field": "scntrNum",
                  "operator": "like",
                  "value": "%"+queryField+"%"
                },
                {
                  "field": "creditLimit",
                  "operator": "like",
                  "value": "%"+queryField+"%"
                },
                {
                  "field": "countryName",
                  "operator": "like",
                  "value": "%"+queryField+"%"
                }
              ]
            }
          }
        ]
      });
  }
}
