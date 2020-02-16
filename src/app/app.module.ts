import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { OrderDeliveryComponent } from './order-delivery/order-delivery.component';
import { BrushAndZoomComponent } from './brush-and-zoom/brush-and-zoom.component';
import { BrushAndZoomContainerComponent } from './brush-and-zoom-container/brush-and-zoom-container.component';
import { MoviesContainerComponent } from './movies-container/movies-container.component';
import { MoviesChartComponent } from './movies-chart/movies-chart.component';
import { MoviesScatterComponent } from './movies-scatter/movies-scatter.component';
import { MoviesScatterContainerComponent } from './movies-scatter-container/movies-scatter-container.component';

@NgModule({
  declarations: [
    AppComponent,
    AreaChartComponent,
    OrderDeliveryComponent,
    BrushAndZoomComponent,
    BrushAndZoomContainerComponent,
    MoviesContainerComponent,
    MoviesChartComponent,
    MoviesScatterContainerComponent,
    MoviesScatterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
