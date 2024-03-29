import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-chart-ventas',
  templateUrl: './chart-ventas.component.html',
  styleUrls: ['./chart-ventas.component.scss']
})
export class ChartVentasComponent implements OnInit {
  public calendar: string[] = [];
  public barChartLabels: string[] = [];
  @Input() set labelInput(val: any[]) {
    this.barChartData.datasets = val
  }
  @Input() set colorInput(val: string) {
    this.barChartOptions.backgroundColor = val;
    this.barChartOptions.color = val;
    this.barChartOptions.hover = {mode: null}
  }
  @Input() set calendarInput(val: string[]) {
    this.barChartLabels = val;
    this.barChartData.labels = this.barChartLabels
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  constructor(
  ) { }

  ngOnInit(): void {
    
  }

  public barChartOptions: ChartConfiguration['options'] = {

    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: { display: true },  
    }
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: []
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }


}
