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

  public getReportsDay(date: string, limit?: number, page?: number): Observable<ReportsResponse>{
    return this.http.get<ReportsResponse>(`${this.API_PRODUCTION}reports/days?day=${date}&limit=${limit}&page=${page}`, this.httpOptions)
  }
  public getReportsMoths(date: string, limit?: number, page?: number): Observable<ReportsResponse2>{
    return this.http.get<ReportsResponse2>(`${this.API_PRODUCTION}reports/moths?moth=${date}&limit=${limit}&page=${page}`, this.httpOptions)
  }
  public getReportsWeeks(weekStart: number, weekEnd: number, limit?: number, page?: number): Observable<ReportsResponse3>{
    return this.http.get<ReportsResponse3>(`${this.API_PRODUCTION}reports/weeks?weekStart=${weekStart}&weekEnd=${weekEnd}&limit=${limit}&page=${page}`, this.httpOptions)
  }
  public postReportsRange(rangos: any): Observable<ReportsResponse4>{
    return this.http.post<ReportsResponse4>(`${this.API_PRODUCTION}reports/ranges`, rangos,this.httpOptions)
  }
}
