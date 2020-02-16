import { moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MoviesScatterContainerComponent } from './movies-scatter-container.component';
import { MoviesScatterComponent } from '../movies-scatter/movies-scatter.component';


export default {
  title: 'Movie budget x revenue',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [ MoviesScatterContainerComponent, MoviesScatterComponent ],
      imports: [ CommonModule, HttpClientModule ]
    })
  ]

};


export const Default = () => ({
  component: MoviesScatterContainerComponent,
  props: {}
});
