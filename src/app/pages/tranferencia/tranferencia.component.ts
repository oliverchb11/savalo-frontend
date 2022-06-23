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

}
