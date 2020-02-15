import { moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import * as d3 from 'd3';

import { MoviesContainerComponent } from './movies-container.component';


export default {
  title: 'Movies',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [ MoviesContainerComponent ],
      imports: [ CommonModule, HttpClientModule ]
    })
  ]

};


export const Default = () => ({
  component: MoviesContainerComponent,
  props: {}
});
