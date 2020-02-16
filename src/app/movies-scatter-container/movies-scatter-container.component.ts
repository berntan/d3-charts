import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as d3 from 'd3';

import { MoviesChartComponent } from '../movies-chart/movies-chart.component';
import { Movie } from '../models/movie';
import { filterData, typeConversion } from '../utils/movie.functions';

// tslint:disable-next-line
export type RevenueByGenre = { revenue: number; genre: string };

const prepareScatterData: (x: Movie[]) => Movie[] = (data: Movie[]) =>
  data.sort((a, b) => b.budget - a.budget).slice(0, 100);


@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-scatter-container.component.html',
  styleUrls: [ './movies-scatter-container.component.scss' ]
})
export class MoviesScatterContainerComponent implements OnInit, AfterContentInit {

  @ViewChild('scatterPlot', { static: true }) chart: MoviesChartComponent;

  scatterData: Movie[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.http.get('assets/data/movies.csv', { responseType: 'text' }).subscribe(
      data => {
        const csv = d3.csvParse(data, typeConversion);
        this.ready(csv as Movie[]);
      }
    );
  }

  private ready(movies: Movie[]) {
    const moviesClean = filterData(movies);
    this.scatterData = prepareScatterData(moviesClean);
  }

}
