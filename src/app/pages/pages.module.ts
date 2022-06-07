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
    PayComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PagesModule { }
