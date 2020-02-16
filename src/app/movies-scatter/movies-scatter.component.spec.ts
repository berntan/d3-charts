import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesScatterComponent } from './movies-scatter.component';

describe('MoviesScatterComponent', () => {
  let component: MoviesScatterComponent;
  let fixture: ComponentFixture<MoviesScatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesScatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
