import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { roles } from 'src/app/utils/roles';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: RegisterUser;
  public baseUrl = environment.api_general;
  public imagen: string = '';
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userInfoStorage();
  }

  public userInfoStorage(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.user = user;
    console.log(this.user);
    this.listUserId(user._id);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }
  
  public perfil(): void {
    this.router.navigateByUrl('pages/perfil');

  }



  public listUserId(id: string): void {
    this.authService.listUserById(id).subscribe((response) => {
      if(response.success){
        this.user = response.user;
        this.imagen = `${this.baseUrl}upload/usuarios/${this.user.photo}`;
        console.log(this.user);
        
      }
    })
  }

  public home(): void {
    this.router.navigateByUrl('pages/home');
  }

}
