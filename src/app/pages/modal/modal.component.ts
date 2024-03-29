import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableService } from 'src/app/core/services/tables/table.service';
import { successAlertGlobal } from 'src/app/utils/global-alerts';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {
  color: ThemePalette = 'accent';
  public stateTable = true;
  public isAdd = false;
  checked = false;
  disabled = false;
  public formulario: FormGroup;
  constructor(
    public dialogo: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tableService: TableService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.dataBuilder();
    console.log(this.data, 'importante');
    
  }
  ngAfterViewInit(): void {
    if(this.data.data.numeroClientes !== 0){
      this.formulario.get('numeroClientes').setValue(this.data.data.numeroClientes)
    }
    // if(this.stateTable && this.data.data.numeroClientes !== 0){
      
    //   this.formulario.get('numeroClientes').setValue(0)
    // }
  }
  private dataBuilder(): void{
    this.formulario = this.fb.group({
      numeroClientes: ['', [Validators.required , Validators.pattern('[1-9]')]],
      libre: [true]
    })
  }

  confirmado(): void {
    this.dialogo.close({
      success: true
    });
  }

  public updateTable(data): void {
    this.tableService.updateTable(data, this.data.data._id).subscribe((response) => {
      if(response.success){
        console.log(response);
        this.isAdd = true;
      }
    })
  }
  public changeState(data): void {
    this.stateTable = data.checked;
    this.data.data.libre = this.stateTable;
  }

  public orderRedirection(id): void{
    this.router.navigateByUrl(`pages/pedidos-mesa/${id}`);
    this.dialogo.close()
  }
  public orderRedirection2(id): void{
    this.router.navigateByUrl(`pages/pedidos-mesa/${id}`);
    this.dialogo.close()
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
        this.tableService.tablesDelete(id).subscribe((response) => {
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

}
