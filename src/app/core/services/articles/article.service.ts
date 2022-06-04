import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseCreateArticle } from 'src/app/interfaces/article/create-article-response';
import { DataCreateArticle } from 'src/app/interfaces/article/data-create-article';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public token = localStorage.getItem('token');
  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'x-token': this.token
    } )
  };

  public createArticle(data: DataCreateArticle): Observable<ResponseCreateArticle>{
    return this.http.post<ResponseCreateArticle>(`${environment.api_general}articles/create`, data, this.httpOptions);
  }

  public allArticles(): Observable<ResponseCreateArticle>{
    return this.http.get<ResponseCreateArticle>(`${environment.api_general}articles/all-articles`, this.httpOptions);
  }
}
