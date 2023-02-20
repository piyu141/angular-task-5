import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HODDashboardComponent } from './hod-dashboard.component';

describe('HODDashboardComponent', () => {
  let component: HODDashboardComponent;
  let fixture: ComponentFixture<HODDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HODDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HODDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
