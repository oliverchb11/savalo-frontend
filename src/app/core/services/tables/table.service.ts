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
    return this.http.post<ResponseTable>(`${environment.api_general}tables/create`, data, this.httpOptions);
  }

  public allTables(): Observable<ResponseTable>{
    return this.http.get<ResponseTable>(`${environment.api_general}tables/all-tables`, this.httpOptions)
  }
  public tablesById(id: string): Observable<ResponseTableUpdate>{
    return this.http.get<ResponseTableUpdate>(`${environment.api_general}tables/${id}`, this.httpOptions)
  }

  public updateTable(data: DataTable, id: string): Observable<ResponseTableUpdate>{
    return this.http.put<ResponseTableUpdate>(`${environment.api_general}tables/update/${id}`,data , this.httpOptions);
  }
}
