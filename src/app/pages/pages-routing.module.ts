import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartaComponent } from './carta/carta.component';
import { EditarOrdernesComponent } from './editar-ordernes/editar-ordernes.component';
import { GestionArticulosComponent } from './gestion-articulos/gestion-articulos.component';
import { GestionCategoriaComponent } from './gestion-categoria/gestion-categoria.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MesasComponent } from './mesas/mesas.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { PedidosMesaComponent } from './pedidos-mesa/pedidos-mesa.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PersonalComponent } from './personal/personal.component';
import { ReportesComponent } from './reportes/reportes.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'pedidos-mesa/:id',
    component: PedidosMesaComponent
  },
  {
    path: 'mesas',
    component: MesasComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'reportes',
    component: ReportesComponent
  },
  {
    path: 'personal',
    component: PersonalComponent
  },
  {
    path: 'ubicacion',
    component: UbicacionComponent
  },
  {
    path: 'carta',
    component: CartaComponent
  },
  {
    path: 'nueva-categoria',
    component: NewCategoryComponent
  },
  {
    path: 'nuevo-articulo/:id',
    component: NewArticleComponent
  },
  {
    path: 'actualizar-perfil/:id',
    component: UpdateProfileComponent
  },
  {
    path: 'gestion-categoria/:id',
    component: GestionCategoriaComponent
  },
  {
    path: 'gestion-articulo/:id',
    component: GestionArticulosComponent
  },
  {
    path: 'editar-ordenes/:id',
    component: EditarOrdernesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
