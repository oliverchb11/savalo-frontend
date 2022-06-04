import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosMesaComponent } from './pedidos-mesa.component';

describe('PedidosMesaComponent', () => {
  let component: PedidosMesaComponent;
  let fixture: ComponentFixture<PedidosMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
