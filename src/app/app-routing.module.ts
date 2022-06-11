import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidTokenSesionGuard } from './guards/valid-token-sesion.guard';
import { LayoutComponent } from './layout/layout.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren : () => import('../app/inicio/inicio.module').then(m => m.InicioModule)
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'pages',
        loadChildren : () => import('../app/pages/pages.module').then(m => m.PagesModule),
        canActivate: [ValidTokenSesionGuard]
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren : () => import('../app/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }, 
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
