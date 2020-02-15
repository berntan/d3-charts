import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { OrderDeliveryComponent } from './components/order-delivery/order-delivery.component';
import { BrushAndZoomComponent } from './components/brush-and-zoom/brush-and-zoom.component';
import { BrushAndZoomContainerComponent } from './components/brush-and-zoom-container/brush-and-zoom-container.component';
import { MoviesContainerComponent } from './components/movies-container/movies-container.component';

@NgModule({
  declarations: [
    AppComponent,
    AreaChartComponent,
    OrderDeliveryComponent,
    BrushAndZoomComponent,
    BrushAndZoomContainerComponent,
    MoviesContainerComponent
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
