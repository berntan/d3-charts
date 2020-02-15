import { AfterContentInit, Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';


const filterData = (data: any[]) => data.filter(d => {
  return d.release_year > 1999 &&
    d.release_year < 2010 &&
    d.revenue > 0 &&
    d.budget > 0 &&
    d.genre &&
    d.title;
});

const parseNA = (str: string): string => str === 'NA' ? undefined : str;
const parseDate = d3.timeParse('%Y-%m-%d');


@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss']
})
export class MoviesContainerComponent implements OnInit, AfterContentInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.http.get('/assets/data/movies.csv', { responseType: 'text' }).subscribe(
      data => {
        const csv = d3.csvParse(data, this.typeConversion.bind(this));
        this.ready(csv);
      }
    );
  }

  private ready(movies: d3.DSVParsedArray<object>) {
    const moviesClean = filterData(movies);
    console.log(moviesClean);
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
