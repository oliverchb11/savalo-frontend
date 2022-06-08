import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCategoriaComponent } from './gestion-categoria.component';

describe('GestionCategoriaComponent', () => {
  let component: GestionCategoriaComponent;
  let fixture: ComponentFixture<GestionCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
