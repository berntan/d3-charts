import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushAndZoomContainerComponent } from './brush-and-zoom-container.component';

describe('BrushAndZoomContainerComponent', () => {
  let component: BrushAndZoomContainerComponent;
  let fixture: ComponentFixture<BrushAndZoomContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrushAndZoomContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushAndZoomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
