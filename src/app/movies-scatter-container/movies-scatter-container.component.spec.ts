import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesScatterContainerComponent } from './movies-scatter-container.component';

describe('MoviesContainerComponent', () => {
  let component: MoviesScatterContainerComponent;
  let fixture: ComponentFixture<MoviesScatterContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesScatterContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesScatterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
