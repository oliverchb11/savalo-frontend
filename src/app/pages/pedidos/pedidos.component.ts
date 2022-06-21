import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/core/services/orders/order.service';
import { DataOrders } from 'src/app/interfaces/orders/data-orders';
import { ResponseOrder } from 'src/app/interfaces/orders/order-response';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PayComponent } from '../pay/pay.component';
import { CambioEstadoOrdenComponent } from '../cambio-estado-orden/cambio-estado-orden.component';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { successAlertGlobal } from 'src/app/utils/global-alerts';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  public orders : DataOrders[];
  public subscription: Subscription;
  public pedidoCancelado = false;
  public loading = true;
  public ordersNoPay: number;
  public order: any;
  constructor(
    private router: Router,
    private ordersService: OrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getOrders();
    this.subscription = this.ordersService.refresOrder$.subscribe(() => {
      this.getOrders();
    })
    
  }

  public addCategory(): void{
    this.router.navigateByUrl('pages/mesas')
  }

  public getOrders(): void{
    this.ordersService.allOrders().subscribe((response) =>{
      if(response.success){
        this.orders = response.orders;
        this.loading = false;
        let orderPreparation = this.orders.filter((value) => value.preparationState === 'preparacion' || value.preparationState === 'entregado' || value.preparationState === 'reclamo');
        this.ordersNoPay = orderPreparation.length;
      }
    })
  }

  public devolverTable(id: string): void {
    console.log(id);
    
  }

  public tiempoTrascurrido(fecha): string {
    let prueba = moment(fecha).format('HH:mm');
    let horaActual = moment(new Date()).format('HH:mm');
    let hourOld = moment(prueba, 'HH:mm');
    let hourNew = moment(horaActual, 'HH:mm');
    let durations = hourNew.diff(hourOld); 
    let respl = moment.duration(durations, 'milliseconds').asMinutes();
    if(respl < 60){
      return ` ${respl} minutos`
    }else{
       respl = parseInt(moment.duration(durations, 'milliseconds').asHours().toFixed(0));
       return ` ${respl} Horas`
    }
      
  }

  public methodPay(modal):void{
    this.dialog.open(modal);
  }

  public efectivo(): void{
   let dialogRef = this.dialog.open(PayComponent, {
      data: this.order,
    });

    dialogRef.afterClosed().subscribe((response) => {
      console.log('cuando se cierra la modal muestra:', response);
      this.dialog.closeAll()
    })
  }

  public pay(order, modal): void {
    this.methodPay(modal);
    this.order = order;
  }

  public changeState(order): void{
    this.dialog.open(CambioEstadoOrdenComponent, {
      data: order,
      minWidth: '30%',
      maxWidth: '30%'
    })
  }

  public editOrder(order): void{
    this.router.navigateByUrl(`pages/editar-ordenes/${order._id}`)
  }

  public cancelarPedido(order): void{
    Swal.fire({
      title: `Seguro desea cancelar el pedido?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const infoUpdate = {
          pedidoCancelado: true
        }
        this.ordersService.updateOrder(infoUpdate, order._id).subscribe((response) => {
          if (response.success){
            successAlertGlobal(response.message);
            this.dialog.closeAll();
              }
        })
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
    })
  }
}
