import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOrdernesComponent } from './editar-ordernes.component';

describe('EditarOrdernesComponent', () => {
  let component: EditarOrdernesComponent;
  let fixture: ComponentFixture<EditarOrdernesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarOrdernesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarOrdernesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
