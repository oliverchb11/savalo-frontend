import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/core/services/orders/order.service';
import { TableService } from 'src/app/core/services/tables/table.service';
import { successAlertGlobal } from 'src/app/utils/global-alerts';

@Component({
  selector: 'app-tranferencia',
  templateUrl: './tranferencia.component.html',
  styleUrls: ['./tranferencia.component.scss']
})
export class TranferenciaComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    public dialogo: MatDialogRef<TranferenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public order: any,
    private tableService: TableService
  ) { }

  ngOnInit(): void {
    console.log(this.order);
    
  }

  public trasferencia(): void{
      const infoUpdate = {
        preparationState: 'pagado',
        metodoPago: 'transferencia',
      }
      this.praintPay();
      this.orderService.updateOrder(infoUpdate, this.order._id).subscribe((response) => {
        if (response.success){
          successAlertGlobal('Trasfernecia realizada correctamente');
          this.dialogo.close();
          this.updateTable(this.order.table._id)
            }
      })
  }

  public updateTable(id: string): void {
    const data = {
      libre: true,
      numeroClientes: 0
    }
    console.log(id, data);
    
    this.tableService.updateTable(data, id).subscribe((response) => {
      if(response.success){
        console.log('mesa update');
      }
    })
  }

  public praintPay(): void{
    let prueba = document.querySelector('.contenido-resivo2');
    let popupWinindow 
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'); 
    popupWinindow.document.open(); 
    popupWinindow.document.write(prueba.innerHTML);
     popupWinindow.document.close();
  }

  public close(): void{
    this.dialogo.close();
  }

}
