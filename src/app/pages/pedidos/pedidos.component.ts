import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/core/services/orders/order.service';
import { DataOrders } from 'src/app/interfaces/orders/data-orders';
import { ResponseOrder } from 'src/app/interfaces/orders/order-response';
import * as moment from 'moment';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  public orders : DataOrders[];
  constructor(
    private router: Router,
    private ordersService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrders();

    
  }

  public addCategory(): void{
    // this.router.navigateByUrl('pages/nueva-categoria')
  }

  public getOrders(): void{
    this.ordersService.allOrders().subscribe((response) =>{
      if(response.success){
        this.orders = response.orders;
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

}
