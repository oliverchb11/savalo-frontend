import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TableService } from 'src/app/core/services/tables/table.service';
import { DataTable } from 'src/app/interfaces/table/data.table';
import { successAlertGlobal } from 'src/app/utils/global-alerts';
import { CreateTableComponent } from '../create-table/create-table.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {
  public cantidadMesas = 6;
  public mesasArray1 = [];
  public tables: DataTable[];
  public subscription: Subscription
  public counter = 0;
  constructor(
    private dialog: MatDialog,
    private tableService: TableService
  ) { }

  ngOnInit(): void {
    this.allTablesComp()
    this.subscription = this.tableService.refresh$.subscribe(() => {
      this.allTablesComp()
    })
    
  }

  public mesaInfo(info): void {
    console.log(info);
    
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        success: true,
        data: info
      }
    })
    dialogRef.afterClosed().subscribe((response) => {
      console.log(response);
    })
  }

  public modalAddMesas(n = 0): void{

    const dialogRef = this.dialog.open(CreateTableComponent);
    dialogRef.afterClosed().subscribe((responses) => {
      this.tableService.createTable(responses.data).subscribe((response) => {
        if(response.success){
          successAlertGlobal(response.message);
        }
      })
    })
    
    
    
  }

  public allTablesComp(): void {
    this.tableService.allTables().subscribe((response) => {
      if(response.success){
        console.log(response);
        this.tables = response.tables;
        
      }
    })
  }

}


