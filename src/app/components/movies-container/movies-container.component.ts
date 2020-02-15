import { AfterContentInit, Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line
type Movie = {
  budget: number,
  genre: string,
  genres: string[],
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_countries: object[],
  release_date: Date | null,
  release_year: number,
  revenue: number,
  runtime: number,
  status: string,
  tagline: string | undefined,
  title: string,
  video: string,
  vote_average: number,
  vote_count: number,
};

const filterData = (data: Movie[]) => data.filter(d => {
  return d.release_year > 1999 &&
    d.release_year < 2010 &&
    d.revenue > 0 &&
    d.budget > 0 &&
    d.genre &&
    d.title;
});

const prepareBarChartData = (data: Movie[]): any => {
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


const parseNA = (str: string): string => str === 'NA' ? undefined : str;
const parseDate = d3.timeParse('%Y-%m-%d');


@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: [ './movies-container.component.scss' ]
})
export class MoviesContainerComponent implements OnInit, AfterContentInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.http.get('/assets/data/movies.csv', { responseType: 'text' }).subscribe(
      data => {
        const csv = d3.csvParse(data, this.typeConversion.bind(this));
        this.ready(csv as Movie[]);
      }
    );
  }

  private ready(movies: Movie[]) {
    const moviesClean = filterData(movies);
    const barChartData = prepareBarChartData(moviesClean).sort((a, b) => {
      return d3.descending(a.revenue, b.revenue);
    });
    console.log(barChartData);
  }

  typeConversion(d) {
    const date = parseDate(d.release_date);
    return {
      budget: +d.budget,
      genre: parseNA(d.genre),
      genres: JSON.parse(d.genres).map(g => g.name),
      homepage: parseNA(d.homepage),
      id: +d.id,
      imdb_id: parseNA(d.imdb_id),
      original_language: parseNA(d.original_language),
      overview: parseNA(d.overview),
      popularity: +d.popularity,
      poster_path: parseNA(d.poster_path),
      production_countries: JSON.parse(d.production_countries),
      release_date: date,
      release_year: date.getFullYear(),
      revenue: +d.revenue,
      runtime: +d.runtime,
      status: d.status,
      tagline: parseNA(d.tagline),
      title: parseNA(d.title),
      video: d.video,
      vote_average: +d.vote_average,
      vote_count: +d.vote_count
    };
  }

}
