import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/interfaces/login-user';
import { LoginUserResponse } from 'src/app/interfaces/login-user-response';
import { NewPasswordResponse } from 'src/app/interfaces/new-password-response';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { RegisterUserResponse } from 'src/app/interfaces/register-user-response';
import { ResetPasswordResponse } from 'src/app/interfaces/reset-password-response';
import { UploadPhotoResponse } from 'src/app/interfaces/update-photo.response';
import { UserList } from 'src/app/interfaces/user-list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token = localStorage.getItem('token');
  public API_PRODUCTION = environment.API_PRODUCTION;
  public API_LOCAL = environment.API_PRODUCTION;
  constructor(
    private http: HttpClient,
  ) {
    
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
      
    } )
  };



  public listUserById(id: string): Observable<UserList>{
    return this.http.get<UserList>(`${this.API_PRODUCTION}auth/user/${id}`, {headers:{'x-token': this.token}});
  }

  public loginUser(user: LoginUser): Observable<LoginUserResponse>{
    return this.http.post<LoginUserResponse>(`${this.API_PRODUCTION}auth/login`, user);
  }

  public registerUser(user: RegisterUser): Observable<RegisterUserResponse>{
    return this.http.post<RegisterUserResponse>(`${this.API_PRODUCTION}auth/register`, user);
  }

  public resetPassword(email: any): Observable<ResetPasswordResponse>{
    return this.http.post<ResetPasswordResponse>(`${this.API_PRODUCTION}auth/reset-password`, email);
  }

  public newPassword(password: any, userId: string, token: string): Observable<NewPasswordResponse>{
    return this.http.post<NewPasswordResponse>(`${this.API_PRODUCTION}auth/${userId}/${token}`, password);
  }

  public getUploadPhoto(tipo: string, photo: string): Observable<any>{
    return this.http.get<any>(`${this.API_PRODUCTION}upload/${tipo}/${photo}`, this.httpOptions);
  }

  public updateUploadFile(file: File, tipo: string,idUser: string ): Observable<UploadPhotoResponse>{
    const formData = new FormData();
    formData.append('photo',file)
    return this.http.put<UploadPhotoResponse>(`${this.API_PRODUCTION}upload/images/${tipo}/${idUser}`, formData , {headers:{'x-token': this.token}})
  }
}
