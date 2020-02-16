import { moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import * as d3 from 'd3';

import { BrushAndZoomComponent } from '../brush-and-zoom/brush-and-zoom.component';
import { BrushAndZoomContainerComponent } from './brush-and-zoom-container.component';

export default {
  title: 'Brush and Zoom',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [ BrushAndZoomComponent, BrushAndZoomContainerComponent ],
      imports: [ CommonModule, HttpClientModule ]
    })
  ]

};

export const Default = () => ({
  component: BrushAndZoomContainerComponent,
  props: {}
});
