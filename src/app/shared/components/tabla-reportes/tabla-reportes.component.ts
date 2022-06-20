import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { ReportsService } from 'src/app/core/services/reports/reports.service';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { ResponseOrder } from 'src/app/interfaces/orders/order-response';
import { DataOrders } from 'src/app/interfaces/orders/data-orders';
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
    private reportsService: ReportsService
  ) { }


  ngOnInit(): void {
    this.setTableThead()
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
    
      default:
        break;
    }
  }

}
