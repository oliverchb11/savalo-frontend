import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SalesDay } from 'src/app/interfaces/sales/sales-days';
import { SalesMonth } from 'src/app/interfaces/sales/sales-month';
import { SalesWeek } from 'src/app/interfaces/sales/sales-week';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  public API_PRODUCTION = environment.API_PRODUCTION;
  public API_LOCAL = environment.API_PRODUCTION;
  private _tableSubject$ = new Subject<void>();
  public token = localStorage.getItem('token');
  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'x-token': this.token
    } )
  };


  public getSalesMonth(): Observable<SalesMonth>{
    return this.http.get<SalesMonth>(`${this.API_PRODUCTION}sales/month`, this.httpOptions)
  }
  public getSaleWeek(): Observable<SalesWeek>{
    return this.http.get<SalesWeek>(`${this.API_PRODUCTION}sales/week`, this.httpOptions)
  }
  public getSalesDay(): Observable<SalesDay>{
    return this.http.get<SalesDay>(`${this.API_PRODUCTION}sales/days`, this.httpOptions)
  }

}
