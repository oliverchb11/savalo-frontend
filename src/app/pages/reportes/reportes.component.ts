import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  public state = false;
  public fecha: string;
  constructor() { }

  ngOnInit(): void {
  }

  public exportExcel(): void{
    Swal.fire({
      title: `Seguro desea exportar esta tabla?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Exportar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.state = true;
        
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
    })
  }
public print(): void{
  window.print()
}

public searchDate(event):void{
  this.fecha = event.target.value
}
}
