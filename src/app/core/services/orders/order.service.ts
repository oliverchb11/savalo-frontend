import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataOrders } from 'src/app/interfaces/orders/data-orders';
import { ResponseOrder, ResponseOrderArray } from 'src/app/interfaces/orders/order-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public token = localStorage.getItem('token');
  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'x-token': this.token
    } )
  };

  public allOrders(): Observable<ResponseOrderArray>{
    return this.http.get<ResponseOrderArray>(`${environment.api_general}orders/all-orders`, this.httpOptions)
  }

  public createOrder(data: any): Observable<ResponseOrder>{
    return this.http.post<ResponseOrder>(`${environment.api_general}orders/create`, data, this.httpOptions);
  }

}
