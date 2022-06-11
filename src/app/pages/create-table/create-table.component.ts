import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent implements OnInit {
  public formulario: FormGroup;
  constructor(
    public dialogo: MatDialogRef<CreateTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.dataBuilder();
  }

  private dataBuilder(): void{
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      numeroSillas: ['', Validators.required],
    })
  }

  public createTable(data): void {
    this.dialogo.close({
      data: data
    })
  }

}
