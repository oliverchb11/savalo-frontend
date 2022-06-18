import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseArticleDelete, ResponseArticleId, ResponseCreateArticle, ResponseCreateArticle2, ResponseUpdateArticle } from 'src/app/interfaces/article/create-article-response';
import { DataCreateArticle } from 'src/app/interfaces/article/data-create-article';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public API_PRODUCTION = environment.API_PRODUCTION;
  public API_LOCAL = environment.API_PRODUCTION;
  public token = localStorage.getItem('token');
  private _refresSubject = new Subject<void>();
  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'x-token': this.token
    } )
  };
  get refresOrder$(){
    return this._refresSubject;
  }


  public createArticle(data: DataCreateArticle): Observable<ResponseCreateArticle2>{
    return this.http.post<ResponseCreateArticle2>(`${this.API_PRODUCTION}articles/create`, data, this.httpOptions).pipe(
      tap(()=>{
        this.refresOrder$.next()
      })
    )
  }
  public updateArticle(data: any, id: string): Observable<ResponseUpdateArticle>{
    return this.http.put<ResponseUpdateArticle>(`${this.API_PRODUCTION}articles/update/${id}`, data, this.httpOptions);
  }

  public allArticles(): Observable<ResponseCreateArticle>{
    return this.http.get<ResponseCreateArticle>(`${this.API_PRODUCTION}articles/all-articles`, this.httpOptions);
  }
  public articlesById(id: string): Observable<ResponseArticleId>{
    return this.http.get<ResponseArticleId>(`${this.API_PRODUCTION}articles/${id}`, this.httpOptions);
  }
  public deletearticles(id: string): Observable<ResponseArticleDelete>{
    return this.http.delete<ResponseArticleDelete>(`${this.API_PRODUCTION}articles/delete/${id}`, this.httpOptions);
  }
}
