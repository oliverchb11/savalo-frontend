import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableService } from 'src/app/core/services/tables/table.service';
import { successAlertGlobal } from 'src/app/utils/global-alerts';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestion-mesa',
  templateUrl: './gestion-mesa.component.html',
  styleUrls: ['./gestion-mesa.component.scss']
})
export class GestionMesaComponent implements OnInit {
  public newNames: string;
  public newSilla: number;
  constructor(
    public dialogo: MatDialogRef<GestionMesaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tableService: TableService,
  ) { }

  ngOnInit(): void {
  }

  public deleteTable(id): void {
    Swal.fire({
      title: `Seguro desea eliminar la mesa seleccionada?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const data = {
          ocultar: true
        }
        this.tableService.updateTable(data, id).subscribe((response) => {
          if(response.success){
            successAlertGlobal(response.message);
            this.dialogo.close();
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
    })
  }

  public newName(event): void{
    this.newNames = event;
  }
  public newSillas(event): void{
    this.newSilla = event;
  }

  public updateTable(id): void{
    const data = {
      name: (this.newNames === undefined)? this.data.data.name : this.newNames,
      numeroSillas: (this.newSilla === undefined)? this.data.data.numeroSillas : this.newSilla
    }
      this.tableService.updateTable(data, id).subscribe((response)=>{
        if(response.success){
          successAlertGlobal('Mesa actualizada correctamente');
          this.dialogo.close()
        }
      })
  }


}
