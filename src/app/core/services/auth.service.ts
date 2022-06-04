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
    return this.http.get<UserList>(`${environment.api}user/${id}`, {headers:{'x-token': this.token}});
  }

  public loginUser(user: LoginUser): Observable<LoginUserResponse>{
    return this.http.post<LoginUserResponse>(`${environment.api}login`, user);
  }

  public registerUser(user: RegisterUser): Observable<RegisterUserResponse>{
    return this.http.post<RegisterUserResponse>(`${environment.api}register`, user);
  }

  public resetPassword(email: any): Observable<ResetPasswordResponse>{
    return this.http.post<ResetPasswordResponse>(`${environment.api}reset-password`, email);
  }

  public newPassword(password: any, userId: string, token: string): Observable<NewPasswordResponse>{
    return this.http.post<NewPasswordResponse>(`${environment.api}${userId}/${token}`, password);
  }

  public getUploadPhoto(tipo: string, photo: string): Observable<any>{
    return this.http.get<any>(`${environment.api_general}upload/${tipo}/${photo}`, this.httpOptions);
  }

  public updateUploadFile(file: File, tipo: string,idUser: string ): Observable<UploadPhotoResponse>{
    const formData = new FormData();
    formData.append('photo',file)
    return this.http.put<UploadPhotoResponse>(`${environment.api_general}upload/images/${tipo}/${idUser}`, formData , {headers:{'x-token': this.token}})
  }
}
