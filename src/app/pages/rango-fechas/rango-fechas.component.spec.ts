import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangoFechasComponent } from './rango-fechas.component';

describe('RangoFechasComponent', () => {
  let component: RangoFechasComponent;
  let fixture: ComponentFixture<RangoFechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangoFechasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangoFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
