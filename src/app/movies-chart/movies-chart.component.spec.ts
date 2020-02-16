import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesChartComponent } from './movies-chart.component';

describe('MoviesChartComponent', () => {
  let component: MoviesChartComponent;
  let fixture: ComponentFixture<MoviesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
