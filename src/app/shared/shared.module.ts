import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    NavbarComponent,
    CarouselComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], 
  exports: [
    NavbarComponent,
    CarouselComponent,
    FooterComponent
  ]
})
export class SharedModule { }
