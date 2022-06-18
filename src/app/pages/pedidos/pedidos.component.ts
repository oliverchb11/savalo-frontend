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
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  public orders : DataOrders[];
  public subscription: Subscription;
  public loading = true;
  public ordersNoPay: number;
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
        let orderPreparation = this.orders.filter((value) => value.preparationState === 'preparacion');
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

  public pay(order): void {
    console.log(order);
   let dialogRef = this.dialog.open(PayComponent, {
      data: order,
    });

    dialogRef.afterClosed().subscribe((response) => {
      console.log('cuando se cierra la modal muestra:', response);
      
    })
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

}
