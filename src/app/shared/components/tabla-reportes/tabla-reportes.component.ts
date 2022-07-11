import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { ReportsService } from 'src/app/core/services/reports/reports.service';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { ResponseOrder } from 'src/app/interfaces/orders/order-response';
import { DataOrders } from 'src/app/interfaces/orders/data-orders';
import { MatDialog } from '@angular/material/dialog';
import { RangoFechasComponent } from 'src/app/pages/rango-fechas/rango-fechas.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabla-reportes',
  templateUrl: './tabla-reportes.component.html',
  styleUrls: ['./tabla-reportes.component.scss']
})
export class TablaReportesComponent implements OnInit {
  public thead: any[] = [];
  public reporteNow = moment().format('YYYY-MM-DD');
  public export = false;
  public fecha : string;
  public countOders: number = 0;
  public initialValue: number = 0;
  public initialValueEfectivo: number = 0;
  public initialValueTrasferencia: number = 0;
  public totalOrders: number = 0;
  public totalOrdersEfectivo: number = 0;
  public totalOrdersTransferencia: number = 0;
  public search: DataOrders[] = [];
  public pageSize: number;
  public pageSizeOptions: number;
  public lengthPage: number;
  

  @Input() set isExport(value: boolean){
    if(value){
      this.exportTable()
    }
  }
  @Input() set fechaSearch(value: string){
    this.fecha = value;
    this.searchDates(value)
    this.valorPesos(0)
  }
  constructor(
    private reportsService: ReportsService,
    private dialog: MatDialog,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.setTableThead();
    console.log(this.reporteNow);
  }

  public setTableThead(): void{
    this.thead = [
      {
        id: 1,
        title: `(${this.countOders}) Pedidos`
      },
      {
        id: 2,
        title: 'Servicios'
      },
      {
        id: 3,
        title: 'Cancelado'
      },
      {
        id: 4,
        title: 'Pagado'
      },
      {
        id: 5,
        title: 'Metodo de pago'
      },
      {
        id: 6,
        title: 'Cajero'
      },
      {
        id: 7,
        title: `Total (${this.valorPesos(this.totalOrders)}) `
      },
    ]
  }

  public exportTable(): void{
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, `reportes-${this.reporteNow}.xlsx`);
  }

  public searchDates(fecha: string): void{

    console.log(fecha);
    switch (fecha) {
      case 'hoy':
        let hoy = moment().format('YYYY-MM-DD');
        this.reportsService.getReportsDay(hoy).subscribe((response) => {
          if(response.success){
            console.log(response);
            this.pageSize = response.pageSize;
            this.lengthPage = response.count;
            this.search = response.ordersDay;
            this.totalOrders = this.priceTotalOrders(this.search);
            this.totalOrdersTransferencia= this.priceTotalTrasferencia(this.search);
            this.totalOrdersEfectivo = this.priceTotalEfectivo(this.search);
            this.countOders = this.search.length;
            this.setTableThead()
          }
        })
        break;
      case 'mes':
        let mes = moment().format('MM');
        this.reportsService.getReportsMoths(mes).subscribe((response) => {
          if(response.success){
            console.log(response);
            this.pageSize = response.pageSize;
            this.lengthPage = response.count;
            this.search = response.ordersMoth;
            this.totalOrders = this.priceTotalOrders(this.search);
            this.totalOrdersEfectivo = this.priceTotalEfectivo(this.search);
            this.totalOrdersTransferencia= this.priceTotalTrasferencia(this.search);
            this.countOders = this.search?.length;
            this.setTableThead()
          }
        })
        break;
      case 'semana':
        let weekStart = parseInt(moment().startOf('week').format('DD')) + 1;
        let weekEnd = parseInt(moment().endOf('week').format('DD')) + 1;
        this.reportsService.getReportsWeeks(weekStart,weekEnd).subscribe((response) => {
          if(response.success){
            this.pageSize = response.pageSize;
            this.lengthPage = response.count;
            this.search = response.ordersweek;
            this.totalOrders = this.priceTotalOrders(this.search)
            this.totalOrdersEfectivo = this.priceTotalEfectivo(this.search);
            this.totalOrdersTransferencia= this.priceTotalTrasferencia(this.search);
            this.countOders = this.search?.length;
            this.setTableThead()
          }
        })
        break;
      case 'rango':
       let dialog = this.dialog.open(RangoFechasComponent);
       dialog.afterClosed().subscribe((data) => {
        let start = new Date(data?.start).toISOString();
        let end = new Date(data?.end).toISOString();
        let ranges = {
          rangeStart: start,
          rangeEnd: end
        }
        this.reportsService.postReportsRange(ranges).subscribe((response) =>{
          if(response.success){
            this.pageSize = response.pageSize;
            this.lengthPage = response.count;
            this.search = response.ordersRange;
            this.totalOrders = this.priceTotalOrders(this.search)
            this.totalOrdersEfectivo = this.priceTotalEfectivo(this.search);
            this.totalOrdersTransferencia= this.priceTotalTrasferencia(this.search);
            this.countOders = this.search?.length;
            this.setTableThead()
          }
        })
       })
        break;
      case '':
        this.search = [];
        this.countOders = 0;
        this.setTableThead();
        this.pageSize = 0;
        this.lengthPage = 0;
        this.totalOrders = 0
        this.initialValue = 0
        this.valorPesos(this.totalOrders)
        break;
    
      default:
        break;
    }
  }

  public page(event): void{
    switch (this.fecha) {
      case 'hoy':
        let hoy = moment().format('YYYY-MM-DD');
        if(parseInt(event.pageIndex) > 0){
          this.reportsService.getReportsDay(hoy, event.pageSize, parseInt(event.pageIndex) + 1).subscribe((response) => {
            if(response.success){
              console.log(response);
              this.pageSize = response.pageSize;
              this.lengthPage = response.count;
              this.search = response.ordersDay;
              this.countOders = this.search?.length;
              this.setTableThead()
            }
          })
        }else{
          this.reportsService.getReportsDay(hoy, event.pageSize, parseInt(event.previousPageIndex)).subscribe((response) => {
            if(response.success){
              console.log(response);
              this.pageSize = response.pageSize;
              this.lengthPage = response.count;
              this.search = response.ordersDay;
              this.countOders = this.search?.length;
              this.setTableThead()
            }
          })
        }
        break;
      case 'semana':
        let weekStart = parseInt(moment().startOf('week').format('DD')) + 1;
        let weekEnd = parseInt(moment().endOf('week').format('DD')) + 1;
        if(parseInt(event.pageIndex) > 0){
          this.reportsService.getReportsWeeks(weekStart, weekEnd,event.pageSize, parseInt(event.pageIndex) + 1).subscribe((response) => {
            if(response.success){
              console.log(response);
              this.pageSize = response.pageSize;
              this.lengthPage = response.count;
              this.search = response.ordersweek;
              this.countOders = this.search?.length;
              this.setTableThead()
            }
          })
        }else{
          this.reportsService.getReportsWeeks(weekStart,weekEnd ,event.pageSize, parseInt(event.previousPageIndex)).subscribe((response) => {
            if(response.success){
              console.log(response);
              this.pageSize = response.pageSize;
              this.lengthPage = response.count;
              this.search = response.ordersweek;
              this.countOders = this.search?.length;
              this.setTableThead()
            }
          })
        }
        break;
      case 'mes':
        let mes = moment().format('MM');
        if(parseInt(event.pageIndex) > 0){
          this.reportsService.getReportsMoths(mes, event.pageSize, parseInt(event.pageIndex) + 1).subscribe((response) => {
            if(response.success){
              console.log(response);
              this.pageSize = response.pageSize;
              this.lengthPage = response.count;
              this.search = response.ordersMoth;
              this.countOders = this.search?.length;
              this.setTableThead()
            }
          })
        }else{
          this.reportsService.getReportsMoths(mes, event.pageSize, parseInt(event.previousPageIndex)).subscribe((response) => {
            if(response.success){
              console.log(response);
              this.pageSize = response.pageSize;
              this.lengthPage = response.count;
              this.search = response.ordersMoth;
              this.countOders = this.search?.length;
              this.setTableThead()
            }
          })
        }
        break;
        case 'rango':

          break;
      default:
        break;
    }
    console.log(event);
  }

// precio total de los productos
  public priceTotalOrders(order: DataOrders[]): number{
    this.initialValue = 0
     let totales = order.map((value)=> value.total);
  
      for (let index = 0; index < totales.length; index++) {
        this.initialValue += parseInt(totales[index].toString());
        console.log( totales[index]);
        
      }
     return this.initialValue;
  }

  //precios total en efectivo
  public priceTotalEfectivo(order: DataOrders[]): number{
    this.initialValueEfectivo = 0;
    let total = order.map((value)=> {
      if(value.metodoPago === 'efectivo'){
        this.initialValueEfectivo = value.total
      }
      return this.initialValueEfectivo
    });
    let all = total.reduce((pre,curren)=> {
      return pre + parseInt(curren.toString())
    } ,0)
  
    return all
  }
  //precios total en transferencia
  public priceTotalTrasferencia(order: DataOrders[]): number{
    this.initialValueTrasferencia = 0;
    let total = order.map((value)=> {
      if(value.metodoPago === 'transferencia'){
        this.initialValueTrasferencia = value.total

      }else{
        this.initialValueTrasferencia = 0
      }
      return this.initialValueTrasferencia
      
    });
    console.log(total);
    let all = total.reduce((pre,curren)=> {
      return pre + parseInt(curren.toString())
    } ,0)
  
    return all
  }

  //valor en pesos COP
  public valorPesos(valor): any{
    const formatterPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
    return formatterPeso.format(valor)
  }

  public detailReport(item: DataOrders): void{
    console.log(item);
    this.router.navigateByUrl(`pages/detalle-reporte/${item._id}`)    
  }

}
