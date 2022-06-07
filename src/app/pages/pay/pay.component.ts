import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/core/services/orders/order.service';
import { TableService } from 'src/app/core/services/tables/table.service';
import { successAlertGlobal } from 'src/app/utils/global-alerts';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<PayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
    private tableService: TableService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    
  }

  public payOrder(order): void {
    const infoUpdate = {
      preparationState: 'pagado'
    }
    this.orderService.updateOrder(infoUpdate, order._id).subscribe((response) => {
      if (response.success){
        successAlertGlobal(response.message);
        this.dialogo.close();
        this.updateTable(order.table._id)
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
