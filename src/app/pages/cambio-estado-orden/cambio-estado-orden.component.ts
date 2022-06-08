import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/core/services/orders/order.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cambio-estado-orden',
  templateUrl: './cambio-estado-orden.component.html',
  styleUrls: ['./cambio-estado-orden.component.scss']
})
export class CambioEstadoOrdenComponent implements OnInit {
  public state: string;
  public stateNew: string;
  constructor(
    public dialogo: MatDialogRef<CambioEstadoOrdenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.state = this.data.preparationState;
  }

  public estadoAcutal(event): void{
    this.stateNew = event;
  }

  public changeState(id){

    if(this.stateNew === undefined){
      const data = {
        preparationState: this.state
      }
      Swal.fire({
        title: `Seguro desea cambiar el estado?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Cambiar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.orderService.updateOrder(data, id).subscribe((response) => {
            if (response.success){
              Swal.fire(response.message, '', 'success');
              this.dialogo.close()
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info')
        }
      })
    }else{
      const data = {
        preparationState: this.stateNew
      }
      Swal.fire({
        title: `Seguro desea cambiar el estado?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Cambiar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.orderService.updateOrder(data, id).subscribe((response) => {
            if (response.success){
              Swal.fire(response.message, '', 'success');
              this.dialogo.close()
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info')
        }
      })
    }

    

  }

}
