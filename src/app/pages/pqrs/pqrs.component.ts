import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/core/services/orders/order.service';
import { TableService } from 'src/app/core/services/tables/table.service';
import { successAlertGlobal } from 'src/app/utils/global-alerts';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.scss']
})
export class PqrsComponent implements OnInit {
  public formulario: FormGroup;
  constructor(
    public dialogo: MatDialogRef<PqrsComponent>,
    @Inject(MAT_DIALOG_DATA) public order: any,
    private fb: FormBuilder,
    private ordersService: OrderService,
    private tableService: TableService
  ) { }

  ngOnInit(): void {
    this.getBuilder();
    console.log(this.order);
    
  }

  public getBuilder(): void{
    this.formulario = this.fb.group({
      pqrs: ['', Validators.required]
    })
  }

  public enviarReclamo(form): void{
      this.ordersService.updateOrder(form, this.order._id).subscribe((response) => {
        if (response.success){
          successAlertGlobal('Reclamo enviado correctamente');
          this.updateTable(this.order.table._id)
          this.dialogo.close();
            }
      })
  }

  public updateTable(id: string): void {
    const data = {
      libre: true,
      numeroClientes: 0
    }
    console.log(id, data);
    
    this.tableService.updateTable(data, id).subscribe((response) => {
      if(response.success){
        console.log('mesa update');
      }
    })
  }

}
