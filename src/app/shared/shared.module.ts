import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChartVentasComponent } from './components/chart-ventas/chart-ventas.component';
import { ChartPedidosComponent } from './components/chart-pedidos/chart-pedidos.component';
import { NgChartsModule } from 'ng2-charts';
import { LoaderComponent } from './components/loader/loader.component';
import { TablaReportesComponent } from './components/tabla-reportes/tabla-reportes.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    ChartVentasComponent,
    ChartPedidosComponent,
    LoaderComponent,
    TablaReportesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgChartsModule,
    MaterialModule
  ], 
  exports: [
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    ChartVentasComponent,
    ChartPedidosComponent,
    LoaderComponent,
    TablaReportesComponent
  ]
})
export class SharedModule { }
