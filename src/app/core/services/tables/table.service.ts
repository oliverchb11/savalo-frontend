import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTable } from 'src/app/interfaces/table/data.table';
import { ResponseTable, ResponseTableUpdate } from 'src/app/interfaces/table/table-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  public API_PRODUCTION = environment.API_PRODUCTION;
  public API_LOCAL = environment.API_PRODUCTION;
  public token = localStorage.getItem('token');
  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'x-token': this.token
    } )
  };

  public createTable(data: DataTable): Observable<ResponseTable>{
    return this.http.post<ResponseTable>(`${this.API_PRODUCTION}tables/create`, data, this.httpOptions);
  }

  public allTables(): Observable<ResponseTable>{
    return this.http.get<ResponseTable>(`${this.API_PRODUCTION}tables/all-tables`, this.httpOptions)
  }
  public tablesById(id: string): Observable<ResponseTableUpdate>{
    return this.http.get<ResponseTableUpdate>(`${this.API_PRODUCTION}tables/${id}`, this.httpOptions)
  }

  public updateTable(data: DataTable, id: string): Observable<ResponseTableUpdate>{
    return this.http.put<ResponseTableUpdate>(`${this.API_PRODUCTION}tables/update/${id}`,data , this.httpOptions);
  }
}
