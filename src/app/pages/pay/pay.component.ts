import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { OrderService } from 'src/app/core/services/orders/order.service';
import { TableService } from 'src/app/core/services/tables/table.service';
import { DataOrders } from 'src/app/interfaces/orders/data-orders';
import { successAlertGlobal } from 'src/app/utils/global-alerts';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  public mostrarRecibo = false;
  constructor(
    public dialogo: MatDialogRef<PayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
    private tableService: TableService
  ) { }
  @ViewChild('innerHtmlNgTemplate', {static: true}) public innerHtmlNgTemplate;
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
    // this.praintPay(order, total);
      this.orderService.updateOrder(infoUpdate, order._id).subscribe((response) => {
        if (response.success){
          this.alertPay('Orden pagada correctamente');
          this.dialogo.close();
          this.updateTable(order.table._id)
            }
      })
  }
  
  public alertPay(message): void{
    Swal.fire({
      title: message,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Imprimir Recibo',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.praintPay();
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
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


  public praintPay(): void{
    const printContent = document.getElementById("print");
    const WindowPrt = window.open('', '', 'left=0,top=50,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(this.innerHtmlNgTemplate.nativeElement.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

public close(): void{
  this.dialogo.close()
}


}
