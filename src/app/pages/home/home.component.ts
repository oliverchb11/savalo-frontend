import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { SalesService } from 'src/app/core/services/sales/sales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public dataMes: any[] = [];
  public dataSemana: any[] = [];
  public dataDia: any[] = [];
  public months: string[];
  public days: string[];
  public week: string[];
  public loading1 = true;
  public loading2 = true;
  public loading3 = true;
  public totalDay: number = 0;
  constructor(
    private salesService: SalesService
  ){

  }
  ngOnInit(): void {
    this.getDataMesSer();
    this.getDataSemanaSer();
    this.getDataDiaSer();
  }

  
  public getDataMesSer(): void{
    this.salesService.getSalesMonth().subscribe((response)=>{
      if(response.success){
        this.loading1 = false
        this.getDataMes(response.month, response.totalMonth)
      }
    })
  }

  public getDataMes(month: string, totalMonth: number): void{
    this.months = [month];
    this.dataMes = [
      {
        label: 'Ventas por mes',
        data: [ totalMonth]
      }
    ]
  }

  public getDataSemanaSer(): void{
    this.salesService.getSaleWeek().subscribe((response)=>{
      if(response.success){
        this.loading2 = false
        this.getDataSemana(response.de, response.hasta, response.totalWeek)
      }
    })
  }

  public getDataSemana(de, hasta, totalWeek: number): void{
    this.week = [`${de} / ${hasta}`];
    this.dataSemana = [
      {
        label: 'Ventas por semana',
        data: [ totalWeek]
      }
    ]
  }


  public getDataDiaSer(): void{
    this.salesService.getSalesDay().subscribe((response)=>{
      if(response.success){
        console.log(response);
        this.loading3 = false
        this.getDataDia(response.day, response.totalDay)
      }
    })
  }


  public getDataDia(day, totalDay: number): void{
    this.totalDay = totalDay;
    this.days = [day];
    this.dataDia = [
      {
        label: 'Ventas por dia',
        data: [ totalDay]
      }
    ]
  }

}
