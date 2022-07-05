import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMesaComponent } from './gestion-mesa.component';

describe('GestionMesaComponent', () => {
  let component: GestionMesaComponent;
  let fixture: ComponentFixture<GestionMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
