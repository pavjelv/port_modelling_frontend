import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModellingDescriptionComponent } from './modelling-description.component';

describe('ModellingDescriptionComponent', () => {
  let component: ModellingDescriptionComponent;
  let fixture: ComponentFixture<ModellingDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModellingDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModellingDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
