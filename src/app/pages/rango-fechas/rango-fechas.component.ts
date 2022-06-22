import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rango-fechas',
  templateUrl: './rango-fechas.component.html',
  styleUrls: ['./rango-fechas.component.scss']
})
export class RangoFechasComponent implements OnInit {
   public formulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogo: MatDialogRef<RangoFechasComponent>,
  ) { }

  ngOnInit(): void {
    this.getFormBuilder()
  }

  public getFormBuilder(): void{
    this.formulario = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    })
  }

  public buscarRango(formulario): void{
    this.dialogo.close(formulario)
  }

}
