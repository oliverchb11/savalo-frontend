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

  public createCategory(data: DataCreateCategory): Observable<ResponseCreateCategory>{
    return this.http.post<ResponseCreateCategory>(`${this.API_PRODUCTION}category/create`, data, this.httpOptions);
  }
  public updateCategory(data: any, id: string): Observable<ResponseCreateCategory>{
    return this.http.put<ResponseCreateCategory>(`${this.API_PRODUCTION}category/update/${id}`, data, this.httpOptions);
  }

  public allCategorys(): Observable<ResponseCreateCategory>{
    return this.http.get<ResponseCreateCategory>(`${this.API_PRODUCTION}category/all-categorys`, this.httpOptions);
  }

  public categoryById(id: string): Observable<ResponseCreateCategoryId>{
    return this.http.get<ResponseCreateCategoryId>(`${this.API_PRODUCTION}category/${id}`, this.httpOptions);
  }
  public deleteCategoryById(id: string): Observable<ResponseCreateCategoryId>{
    return this.http.delete<ResponseCreateCategoryId>(`${this.API_PRODUCTION}category/delete/${id}`, this.httpOptions);
  }
}
