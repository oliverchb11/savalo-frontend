import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rango-fechas',
  templateUrl: './rango-fechas.component.html',
  styleUrls: ['./rango-fechas.component.scss']
})
export class RangoFechasComponent implements OnInit {
   public formulario: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getFormBuilder()
  }

  public getFormBuilder(): void{
    this.formulario = this.fb.group({
      start: [''],
      end: [''],
    })
  }

  public buscarRango(formulario): void{
    console.log(formulario);
  }

}
