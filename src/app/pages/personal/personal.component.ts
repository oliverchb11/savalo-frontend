import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { roles } from 'src/app/utils/roles';
import { environment } from 'src/environments/environment';
import { CreatePersonalityComponent } from '../create-personality/create-personality.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PersonalInactivoComponent } from '../personal-inactivo/personal-inactivo.component';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  public users: RegisterUser[];
  public usersInactive: RegisterUser[];
  public baseUrl = environment.API_PRODUCTION;
  public cargo: string;
  public userLogin: any;
  public subscription: Subscription
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsuersAll();
    this.userLogin = JSON.parse(localStorage.getItem('user'));
    this.subscription = this.profileService.refresOrder$.subscribe(() => {
      this.getUsuersAll();
    })
  }

  public getUsuersAll(): void {
    this.profileService.getAllUsers().subscribe((response) => {
      if(response.success){
        console.log(response.users);
        this.users = response.users.filter((user) => user.state === true);
        this.usersInactive = response.users;
      }
    })
  }

  public createPerson(): void {
    this.dialog.open(CreatePersonalityComponent, {
      maxWidth: '100%',
      minWidth: '90%'
    })
  }

  public editPersonality(id: string): void {
      this.router.navigateByUrl(`pages/actualizar-perfil/${id}`)
  }
  public deletePersonality(id: string): void {
    Swal.fire({
      title: `Seguro desea eliminar este Perfil`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
    const data = {
      state: false
    }
    this.profileService.updateProfile(data, id).subscribe((response)=>{
      if (response.success){
          Swal.fire('Perfil eliminado', '', 'success')
          }
      })
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
    })


  }

  public personalInactivo(users: RegisterUser[]): void{
    this.dialog.open(PersonalInactivoComponent,{
      data: this.usersInactive,
      height: '500px'
    })
  }



}
