import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableService } from 'src/app/core/services/tables/table.service';
import { DataTable } from 'src/app/interfaces/table/data.table';
import { errorAlert, successAlertGlobal } from 'src/app/utils/global-alerts';
import { CreateTableComponent } from '../create-table/create-table.component';
import { GestionMesaComponent } from '../gestion-mesa/gestion-mesa.component';
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
  public tableInfo: DataTable;
  public avilabledColor = false;
  public stateTuerca = false;
  public subscription: Subscription
  public counter = 0;
  constructor(
    private dialog: MatDialog,
    private tableService: TableService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.allTablesComp()
    this.subscription = this.tableService.refresh$.subscribe(() => {
      this.allTablesComp()
    })
    
  }

  public mesaInfo(info: DataTable): void {

      if(!this.stateTuerca){
        if(info.libre){
          this.router.navigateByUrl(`pages/pedidos-mesa/${info._id}`);
        }else{
          this.router.navigateByUrl(`pages/pedidos-mesa/${info._id}`);
        }
      }else{
  
      }
  }

  public modalAddMesas(n = 0): void{

    const dialogRef = this.dialog.open(CreateTableComponent);
    dialogRef.afterClosed().subscribe((responses) => {
      this.tableService.createTable(responses.data).subscribe((response) => {
        if(response.success){
          successAlertGlobal(response.message);
        }
      }, (error) => {
        errorAlert(error.error.message);
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

  public tuercaConfig(table: DataTable[]): void{
    this.stateTuerca = !this.stateTuerca;
    if(this.stateTuerca){
      this.avilabledColor = true;
    }else{
    this.avilabledColor = false;  
    }
  }

  public gestionarMesa(mesa: DataTable): void{
    if(this.stateTuerca){
      const dialogRef = this.dialog.open(GestionMesaComponent, {
        data: {
          success: true,
          data: mesa
        }
      })
      dialogRef.afterClosed().subscribe((response) => {
        console.log(response);
      })
    }
    
  }

}


