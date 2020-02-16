import { Movie } from '../models/movie';

import * as d3 from 'd3';

const parseDate = d3.timeParse('%Y-%m-%d');
const parseNA = (str: string): string => str === 'NA' ? undefined : str;

export const filterData = (data: Movie[]) => data.filter(d => {
  return d.release_year > 1999 &&
    d.release_year < 2010 &&
    d.revenue > 0 &&
    d.budget > 0 &&
    d.genre &&
    d.title;
});

export const typeConversion = (d: any): Movie => {
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
};

export const formatTicks: (d: number) => string = (d) => {
  return d3.format('~s')(d)
    .replace('M', ' mil')
    .replace('G', ' bil')
    .replace('T', ' tril');
}
