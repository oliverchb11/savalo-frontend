import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})
export class CartaComponent implements OnInit {
  public carta: any[] = [];
  constructor() { }

  ngOnInit(): void {

    this.getCarta(8);
  }

  public getCarta(numero) {

      this.carta = [
        {
          id: 1,
          img: `assets/carta/Carta Savalo-01.png`
        },
        {
          id: 2,
          img: `assets/carta/Carta Savalo-02.png`
        },
        {
          id: 3,
          img: `assets/carta/Carta Savalo-03.png`
        },
        {
          id: 4,
          img: `assets/carta/Carta Savalo-04.png`
        },
        {
          id: 5,
          img: `assets/carta/Carta Savalo-05.png`
        },
        {
          id: 6,
          img: `assets/carta/Carta Savalo-06.png`
        },
        {
          id: 7,
          img: `assets/carta/Carta Savalo-07.png`
        },
        {
          id: 8,
          img: `assets/carta/Carta Savalo-08.png`
        },
      ]
    
    
  }

}
