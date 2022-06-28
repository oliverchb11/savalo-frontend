import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public baseUrl = environment.API_PRODUCTION;
  public imagen: string = '';
  constructor(
    private authService: AuthService,
    private router: Router
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





  public pageUpdateUser(id:string): void {
    this.router.navigateByUrl(`pages/actualizar-perfil/${id}`)
  }


  public tipoCedula = (valor) =>{
    switch (valor) {
        case '1':
            return 'Cédula Ciudadania';
        case '2':
            return 'Cédula Extranjería';
        case '3':
            return 'Pasaporte';
        case '4':
            return 'NIT';
        case '5':
            return 'Registro Civil';
    
        default:
            return ''
    }
}

}
