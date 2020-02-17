import { moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MoviesContainerComponent } from './movies-container/movies-container.component';
import { MoviesChartComponent } from './movies-chart/movies-chart.component';
import { MoviesScatterContainerComponent } from './movies-scatter-container/movies-scatter-container.component';
import { MoviesScatterComponent } from './movies-scatter/movies-scatter.component';


export default {
  title: 'Movies',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [ MoviesContainerComponent, MoviesChartComponent,  MoviesScatterContainerComponent, MoviesScatterComponent  ],
      imports: [ CommonModule, HttpClientModule ]
    })
  ]

};


export const Bar = () => ({
  component: MoviesContainerComponent,
  props: {}
});


export const Scatter = () => ({
  component: MoviesScatterContainerComponent,
  props: {}
});
