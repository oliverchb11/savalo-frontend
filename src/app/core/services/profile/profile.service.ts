import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAllUsers, ResponseProfile } from 'src/app/interfaces/profile/profile-response';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public token = localStorage.getItem('token');
  public API_PRODUCTION = environment.API_PRODUCTION;
  public API_LOCAL = environment.API_PRODUCTION;
  constructor(
    private http: HttpClient,
  ) {
    
  }

  httpOptions = {
    headers: new HttpHeaders({
      'x-token': this.token
    } )
  };

  public updateProfile(data: RegisterUser, id: string): Observable<ResponseProfile>{
    return this.http.put<ResponseProfile>(`${this.API_PRODUCTION}profile/update/${id}`,data, this.httpOptions)
  }
  public getAllUsers(): Observable<ResponseAllUsers>{
    return this.http.get<ResponseAllUsers>(`${this.API_PRODUCTION}profile/all-users`, this.httpOptions)
  }

}
