import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MesasComponent } from './mesas/mesas.component';
import { MenuComponent } from './menu/menu.component';
import { ReportesComponent } from './reportes/reportes.component';
import { PersonalComponent } from './personal/personal.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewArticleComponent } from './new-article/new-article.component';
import { MaterialModule } from '../material/material.module';
import { ModalComponent } from './modal/modal.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { CartaComponent } from './carta/carta.component';
import { PedidosMesaComponent } from './pedidos-mesa/pedidos-mesa.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { PayComponent } from './pay/pay.component';
import { GestionCategoriaComponent } from './gestion-categoria/gestion-categoria.component';
import { GestionArticulosComponent } from './gestion-articulos/gestion-articulos.component';
import { CambioEstadoOrdenComponent } from './cambio-estado-orden/cambio-estado-orden.component';
import { EditarOrdernesComponent } from './editar-ordernes/editar-ordernes.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { CreatePersonalityComponent } from './create-personality/create-personality.component';
import { PqrsComponent } from './pqrs/pqrs.component';
import { RangoFechasComponent } from './rango-fechas/rango-fechas.component';
import { TranferenciaComponent } from './tranferencia/tranferencia.component';
import { GestionMesaComponent } from './gestion-mesa/gestion-mesa.component';


@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    PedidosComponent,
    MesasComponent,
    MenuComponent,
    ReportesComponent,
    PersonalComponent,
    NewCategoryComponent,
    NewArticleComponent,
    ModalComponent,
    UbicacionComponent,
    CartaComponent,
    PedidosMesaComponent,
    UpdateProfileComponent,
    PayComponent,
    GestionCategoriaComponent,
    GestionArticulosComponent,
    CambioEstadoOrdenComponent,
    EditarOrdernesComponent,
    CreateTableComponent,
    CreatePersonalityComponent,
    PqrsComponent,
    RangoFechasComponent,
    TranferenciaComponent,
    GestionMesaComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class PagesModule { }
