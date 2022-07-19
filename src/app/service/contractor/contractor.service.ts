import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contractor} from "../../model/contractor";
import {Filter} from "../../model/filter";
import {Agent} from "../../model/agent";

@Injectable({
  providedIn: 'root'
})
export class ContractorService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://open-etp-backend.inlinegroup-c.ru/Open-ETP';
  }

  public find(isJPA: boolean): Observable<Contractor[]> {
    let page = 0;
    let size = 50;

    if (isJPA)
      return this.http.post<Contractor[]>(this.baseUrl + `/contractor/filter/?page=${page}&size=${size}`, null);
    else
      return this.http.post<Contractor[]>(this.baseUrl + `/jooq/contractor/filter/?page=${page}&size=${size}`, null);
  }

  public save(contractor: Contractor): Observable<Contractor> {
    return this.http.put<Contractor>(this.baseUrl + `/contractor`, contractor);
  }

  public getContractor(id: number): Observable<Contractor> {
    return this.http.get<Contractor>(this.baseUrl +`/contractor/${id}`);
  }

  public filterOneCond(column: string,
                       operator: string,
                       expression: string,
                       isJPA: boolean): Observable<Contractor[]> {
    let page = 0;
    let size = 50;
    let body = {
      "logic": "and",
      "cond": [
        {
          "field": column,
          "operator": operator,
          "value": expression
        }
      ]
    }

    if (isJPA)
      return this.http.post<Contractor[]>(this.baseUrl + `/contractor/filter/?page=${page}&size=${size}`, body);
    else
      return this.http.post<Contractor[]>(this.baseUrl + `/jooq/contractor/filter/?page=${page}&size=${size}`, body);
  }

  public filter(filter: Filter, isJPA: boolean): Observable<Contractor[]> {
    let page = 0;
    let size = 50;

    if (isJPA)
      return this.http.post<Contractor[]>(this.baseUrl + `/contractor/filter/?page=${page}&size=${size}`, filter);
    else
      return this.http.post<Contractor[]>(this.baseUrl + `/jooq/contractor/filter/?page=${page}&size=${size}`, filter);
  }

  public searchAll(queryField: string, isJPA: boolean): Observable<Contractor[]> {
    let page = 0;
    let size = 50;
    let body = {
      "logic": "and",
      "cond": [
        {
          "filter": {
            "logic": "or",
            "cond": [
              {
                "field": "lbl",
                "operator": "like",
                "value": "%" + queryField + "%"
              },
              {
                "field": "nameFull",
                "operator": "like",
                "value": "%" + queryField + "%"
              },
              {
                "field": "address",
                "operator": "like",
                "value": "%" + queryField + "%"
              },
              {
                "field": "inn",
                "operator": "like",
                "value": "%" + queryField + "%"
              },
              {
                "field": "kpp",
                "operator": "like",
                "value": "%" + queryField + "%"
              },
              {
                "field": "listWork",
                "operator": "like",
                "value": "%" + queryField + "%"
              },
              {
                "field": "oeStartDate",
                "operator": "like",
                "value": "%" + queryField + "%"
              },
              {
                "field": "scntrNum",
                "operator": "like",
                "value": "%" + queryField + "%"
              },
              {
                "field": "creditLimit",
                "operator": "like",
                "value": "%" + queryField + "%"
              },
              {
                "field": "countryName",
                "operator": "like",
                "value": "%" + queryField + "%"
              }
            ]
          }
        }
      ]
    }

    if (isJPA)
      return this.http.post<Contractor[]>(this.baseUrl + `/contractor/filter/?page=${page}&size=${size}`, body);
    else
      return this.http.post<Contractor[]>(this.baseUrl + `/jooq/contractor/filter/?page=${page}&size=${size}`, body);
  }
}
