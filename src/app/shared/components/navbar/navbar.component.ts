import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  public baseUrl = environment.API_PRODUCTION;
  public imagen: string = '';
  public subscription: Subscription
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userInfoStorage();
    //   this.listUserId(this.userInfoStorage());
    // this.subscription = this.authService.refresOrder$.subscribe(() => {
    // })
  }

  public userInfoStorage(): string {
    let user = JSON.parse(localStorage.getItem('user'));
    this.user = user;
    this.listUserId(user._id);
    return user._id
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
        
      }
    })
  }

  public home(): void {
    this.router.navigateByUrl('pages/home');
  }

}
