import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInactivoComponent } from './personal-inactivo.component';

describe('PersonalInactivoComponent', () => {
  let component: PersonalInactivoComponent;
  let fixture: ComponentFixture<PersonalInactivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInactivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
