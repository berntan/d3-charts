import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as d3 from 'd3';

import { MoviesChartComponent } from '../movies-chart/movies-chart.component';
import { Movie } from '../models/movie';
import { filterData, typeConversion } from '../utils/movie.functions';

// tslint:disable-next-line
export type RevenueByGenre = { revenue: number; genre: string };

const prepareBarChartData: (data: Movie[]) => RevenueByGenre[] = (data: Movie[]) => {
  /*
  d3.rollup(data, reducer, key)
  data: what we want to aggregate
  reducer: reduce function that we use to aggregate or data with
  key: what variable we group or data by
   */

  // const rolledUp = d3.rollup(
  //   data,
  //   v => d3.sum(v, leaf => leaf.revenue),
  //   d => d.genre
  // );

  const dataMap = d3.nest<Movie, number>()
    .key((d: Movie) => d.genre)
    .rollup((v: Movie[]) => d3.sum(v, (leaf: Movie) => leaf.revenue))
    .entries(data);

  const dataArray = Array.from(dataMap, d => ({ genre: d.key, revenue: d.value }));

  return dataArray;
};


@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-scatter-container.component.html',
  styleUrls: [ './movies-scatter-container.component.scss' ]
})
export class MoviesScatterContainerComponent implements OnInit, AfterContentInit {

  @ViewChild('revenueChart', { static: true }) chart: MoviesChartComponent;

  scatterData = [];

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
    this.scatterData = prepareBarChartData(moviesClean).sort((a, b) => {
      return d3.descending(a.revenue, b.revenue);
    });
  }

}
