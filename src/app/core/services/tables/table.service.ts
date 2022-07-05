import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataTable } from 'src/app/interfaces/table/data.table';
import { ResponseTable, ResponseTableDelete, ResponseTableUpdate } from 'src/app/interfaces/table/table-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
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

  get refresh$(){
    return this._tableSubject$;
  }

  public createTable(data: DataTable): Observable<ResponseTable>{
    return this.http.post<ResponseTable>(`${this.API_PRODUCTION}tables/create`, data, this.httpOptions).pipe(
      tap(() => {
        this.refresh$.next()
      })
    );
  }

  public allTables(): Observable<ResponseTable>{
    return this.http.get<ResponseTable>(`${this.API_PRODUCTION}tables/all-tables`, this.httpOptions)
  }
  public tablesById(id: string): Observable<ResponseTableUpdate>{
    return this.http.get<ResponseTableUpdate>(`${this.API_PRODUCTION}tables/${id}`, this.httpOptions)
  }
  public tablesDelete(id: string): Observable<ResponseTableDelete>{
    return this.http.delete<ResponseTableDelete>(`${this.API_PRODUCTION}tables/delete/${id}`, this.httpOptions).pipe(
      tap(() => {
        this.refresh$.next()
      })
    )
  }

  public updateTable(data: any, id: string): Observable<ResponseTableUpdate>{
    return this.http.put<ResponseTableUpdate>(`${this.API_PRODUCTION}tables/update/${id}`,data , this.httpOptions).pipe(
      tap(() => {
        this.refresh$.next()
      })
    )
  }
}
