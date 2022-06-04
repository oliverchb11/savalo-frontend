import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { roles } from 'src/app/utils/roles';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public user: RegisterUser;
  public previewImg: string | ArrayBuffer = '';
  public rol: string | string[];
  public baseUrl = environment.api_general;
  public imagen: string = '';
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userInfoStorage();

  }

  public userInfoStorage(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.listUserId(user._id);
  }

  public listUserId(id: string): void {
    this.authService.listUserById(id).subscribe((response) => {
      if(response.success){
        this.user = response.user;
        this.rol = roles(this.user.rol[0]);
        this.imagen = `${this.baseUrl}upload/usuarios/${this.user.photo}`;
        console.log(this.user);
        
      }
    })
  }



  public fileUpload(event): void {
    let file = event.target.files[0];
    let render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () =>{
      this.previewImg = render.result;
      this.imagen = '';
    }
    this.updatePhoto(file);
  }

  public updatePhoto(file: File): void {
    console.log(file);
    this.authService.updateUploadFile(file,'usuarios', this.user?._id).subscribe((response) => {
      if(response.success){
        console.log(response);
      }
    })
  }

}
