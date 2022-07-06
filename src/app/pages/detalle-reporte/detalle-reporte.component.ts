import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/core/services/orders/order.service';
import { DataOrders } from 'src/app/interfaces/orders/data-orders';

@Component({
  selector: 'app-detalle-reporte',
  templateUrl: './detalle-reporte.component.html',
  styleUrls: ['./detalle-reporte.component.scss']
})
export class DetalleReporteComponent implements OnInit {
  public order:DataOrders
  constructor(
    private activedRoute: ActivatedRoute,
    private ordersService: OrderService
  ) { }

  ngOnInit(): void {
    this.pararmsData()
  }

  public pararmsData(): void{
    this.activedRoute.params.subscribe((resp: any)=>{
      this.orderById(resp.id)
    })
  }
  public orderById(id: string): void{
    this.ordersService.getOrderById(id).subscribe((response)=>{
      if(response.success){
        console.log(response);
        
       this.order = response.order
      }
    })
  }

}
