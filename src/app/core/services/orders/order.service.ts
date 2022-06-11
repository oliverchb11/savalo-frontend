import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataOrders } from 'src/app/interfaces/orders/data-orders';
import { ResponseOrder, ResponseOrderArray } from 'src/app/interfaces/orders/order-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public API_PRODUCTION = environment.API_PRODUCTION;
  public API_LOCAL = environment.API_PRODUCTION;
  private _refresSubject = new Subject<void>();
  public token = localStorage.getItem('token');
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

  public allOrders(): Observable<ResponseOrderArray>{
    return this.http.get<ResponseOrderArray>(`${this.API_PRODUCTION}orders/all-orders`, this.httpOptions)
  }

  public createOrder(data: any): Observable<ResponseOrder>{
    return this.http.post<ResponseOrder>(`${this.API_PRODUCTION}orders/create`, data, this.httpOptions);
  }
  public updateOrder(data: any, id: string): Observable<ResponseOrder>{
    return this.http.put<ResponseOrder>(`${this.API_PRODUCTION}orders/update/${id}`, data, this.httpOptions).pipe(
      tap(() => {
        this.refresOrder$.next()
      })
    );
  }
  public getOrderById(id: string): Observable<ResponseOrder>{
    return this.http.get<ResponseOrder>(`${this.API_PRODUCTION}orders/${id}`, this.httpOptions);
  }


}
