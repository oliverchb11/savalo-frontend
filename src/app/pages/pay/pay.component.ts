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
  public servicioState = false;
  public propinaState = false;
  public propinaVal: number = 0;
  public servicioVal: number = 0;
  public subTotal: number = 0;
  public total: number = 0;
  constructor(
    public dialogo: MatDialogRef<PayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
    private tableService: TableService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.total = this.data.total;
  }

  public payOrder(order , total): void {
    const infoUpdate = {
      preparationState: 'pagado',
      metodoPago: 'efectivo',
      total
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

  public servicio(event, subTotal): void {
    this.servicioState = !this.servicioState;
    if(this.servicioState){
      let valorServicio = parseInt(event.target.value);
      console.log(valorServicio);
      this.servicioVal = (parseInt(subTotal) * valorServicio) / 100;
      if(this.propinaState){
        this.total =  this.total + this.servicioVal;
      }else{
        this.total = parseInt(subTotal) + this.servicioVal;
      }
    }else{
      this.total = this.total - this.servicioVal;
    }
    
    
  }
  public propina(event, subTotal): void {
    this.propinaState = !this.propinaState;
    if(this.propinaState){
      let valorPropina = parseInt(event.target.value);
      this.propinaVal = (parseInt(subTotal) * valorPropina) / 100;
      if(this.servicioState){
        
        this.total =  this.total + this.propinaVal;
      }else{
        this.total =  parseInt(subTotal) + this.propinaVal;
      }
    }else{
      this.total = this.total - this.propinaVal;
    }
  }

}
