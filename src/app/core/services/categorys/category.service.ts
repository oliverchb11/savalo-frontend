import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseCreateCategory, ResponseCreateCategoryId } from 'src/app/interfaces/category/create-category-response';
import { DataCreateCategory } from 'src/app/interfaces/category/data-create-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public token = localStorage.getItem('token');
  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'x-token': this.token
    } )
  };

  public createCategory(data: DataCreateCategory): Observable<ResponseCreateCategory>{
    return this.http.post<ResponseCreateCategory>(`${environment.api_general}category/create`, data, this.httpOptions);
  }

  public allCategorys(): Observable<ResponseCreateCategory>{
    return this.http.get<ResponseCreateCategory>(`${environment.api_general}category/all-categorys`, this.httpOptions);
  }

  public categoryById(id: string): Observable<ResponseCreateCategoryId>{
    return this.http.get<ResponseCreateCategoryId>(`${environment.api_general}category/${id}`, this.httpOptions);
  }
}
