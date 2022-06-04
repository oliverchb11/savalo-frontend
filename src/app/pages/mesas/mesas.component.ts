import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableService } from 'src/app/core/services/tables/table.service';
import { DataTable } from 'src/app/interfaces/table/data.table';
import { successAlertGlobal } from 'src/app/utils/global-alerts';
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
  public counter = 0;
  constructor(
    private dialog: MatDialog,
    private tableService: TableService
  ) { }

  ngOnInit(): void {
    this.allTablesComp()
  }

  public mesaInfo(info): void {
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
     this.counter++;
    if(this.counter <= this.tables?.length){
      this.counter = this.tables.length;
      this.counter++;
    }
    if(this.counter <= 10 ){
      let table = [
        {
          name: `mesa ${this.counter}`,
          position: this.counter,
          img: 'assets/img/mesa-restaurante.jpg',
          libre: true,
          numeroClientes: 0
        }
      ]
      this.tableService.createTable(table[0]).subscribe((response) => {
        if(response.success){
          this.tables.push(table[0]);
          successAlertGlobal(response.message);
        }
      })
    }
    
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


