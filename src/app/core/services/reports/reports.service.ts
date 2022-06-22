import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { ReportsResponse, ReportsResponse2, ReportsResponse3, ReportsResponse4 } from 'src/app/interfaces/reports/reports.response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
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

  public getReportsDay(date: string): Observable<ReportsResponse>{
    return this.http.get<ReportsResponse>(`${this.API_PRODUCTION}reports/days?day=${date}`, this.httpOptions)
  }
  public getReportsMoths(date: string): Observable<ReportsResponse2>{
    return this.http.get<ReportsResponse2>(`${this.API_PRODUCTION}reports/moths?moth=${date}`, this.httpOptions)
  }
  public getReportsWeeks(weekStart: number, weekEnd: number): Observable<ReportsResponse3>{
    return this.http.get<ReportsResponse3>(`${this.API_PRODUCTION}reports/weeks?weekStart=${weekStart}&weekEnd=${weekEnd}`, this.httpOptions)
  }
  public postReportsRange(rangos: any): Observable<ReportsResponse4>{
    return this.http.post<ReportsResponse4>(`${this.API_PRODUCTION}reports/ranges`, rangos,this.httpOptions)
  }
}
