import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ]
})
export class MaterialModule { }
