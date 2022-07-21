import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { successAlert, successAlertGlobal } from 'src/app/utils/global-alerts';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-personal-inactivo',
  templateUrl: './personal-inactivo.component.html',
  styleUrls: ['./personal-inactivo.component.scss']
})
export class PersonalInactivoComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<PersonalInactivoComponent>,
    @Inject(MAT_DIALOG_DATA) public users: RegisterUser[],
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
  }

  public close(): void{
    this.dialogo.close()
  }

  public activarUser(id: string): void{
    Swal.fire({
      title: `¿Seguro desea cambiar el estado de este usuario?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Activar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.updateUserState(id);
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
    })
  }
  
  public updateUserState(id: string): void{
    const data = {
      state: true
    }
    this.profileService.updateProfile(data, id).subscribe((response)=> {
      if(response.success){
        successAlertGlobal(response.message);
        this.dialogo.close()
      }
    })
  }

}
