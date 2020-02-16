import { moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MoviesContainerComponent } from './movies-container.component';
import { MoviesChartComponent } from '../movies-chart/movies-chart.component';


export default {
  title: 'Movies',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [ MoviesContainerComponent, MoviesChartComponent ],
      imports: [ CommonModule, HttpClientModule ]
    })
  ]

};


export const Default = () => ({
  component: MoviesContainerComponent,
  props: {}
});
