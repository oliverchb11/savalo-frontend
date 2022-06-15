import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonalityComponent } from './create-personality.component';

describe('CreatePersonalityComponent', () => {
  let component: CreatePersonalityComponent;
  let fixture: ComponentFixture<CreatePersonalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePersonalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePersonalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
