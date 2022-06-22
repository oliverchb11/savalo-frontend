import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { ReportsService } from 'src/app/core/services/reports/reports.service';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { ResponseOrder } from 'src/app/interfaces/orders/order-response';
import { DataOrders } from 'src/app/interfaces/orders/data-orders';
import { MatDialog } from '@angular/material/dialog';
import { RangoFechasComponent } from 'src/app/pages/rango-fechas/rango-fechas.component';
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
  public search: DataOrders[] = []
  @Input() set isExport(value: boolean){
    if(value){
      this.exportTable()
    }
  }
  @Input() set fechaSearch(value: string){
    this.searchDates(value)
  }
  constructor(
    private reportsService: ReportsService,
    private dialog: MatDialog
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
        title: 'Total'
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
            console.log(response.ordersDay);
            this.search = response.ordersDay;
            this.countOders = this.search.length;
            this.setTableThead()
          }
        })
        break;
      case 'mes':
        let mes = moment().format('MM');
        this.reportsService.getReportsMoths(mes).subscribe((response) => {
          if(response.success){
            this.search = response.ordersMoth;
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
            this.search = response.ordersweek;
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
            console.log('IMPORTANTE', response);
            
            this.search = response.ordersRange;
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
        break;
    
      default:
        break;
    }
  }

}
