import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { Movie } from '../models/movie';
import { formatTicks } from '../utils/movie.functions';

const createDrawingArea = (width, height, margin, hostElement) => {
  return d3
    .select(hostElement)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
};

@Component({
  selector: 'app-movies-scatter',
  template: ``,
  styleUrls: [ './movies-scatter.component.scss' ]
})
export class MoviesScatterComponent implements OnInit, OnChanges {
  @Input() data;

  readonly margin = { top: 80, right: 40, bottom: 40, left: 60 };
  readonly width = 500 - this.margin.left - this.margin.right;
  readonly height = 500 - this.margin.top - this.margin.bottom;
  private readonly hostElement; // TODO: find what type this should be
  private svg;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      if (!this.svg) {
        this.svg = createDrawingArea(
          this.width,
          this.height,
          this.margin,
          this.hostElement
        );
      } else {
        this.data = changes.data.currentValue;
        this.drawChart(changes.data.currentValue);
      }
    }
  }

  private drawChart(data: Movie[]) {
    // Draw header
    const header = this.svg
      .append('g')
      .attr('class', 'bar-header')
      .attr('transform', `translate(0, ${-this.margin.top * 0.6})`)
      .append('text');

    header.append('tspan').text('Budget vs. Revenue in $US');

    header
      .append('tspan')
      .attr('x', 0) // Move left
      .attr('dy', '1.5em') // move down with a little margin
      .style('font-size', '0.8em') // smaller text
      .style('fill', '#555')
      .text('Top 100 Films by budget, 2000-2009');

    // scales
    const xExtent: [ number, number ] = (d3
      .extent(data, d => d.budget));

    xExtent[0] = xExtent[0] * 0.95;
    xExtent[1] = xExtent[1] * 1.05;
    // or this way?
    // const xExtent2: number[] = xExtent.map((v, i) => (i === 0) ? v * 0.95 : v * 1.05);

    const xScale = d3
      .scaleLinear()
      .domain(xExtent)
      .range([ 0, this.width ]);

    const yExtent = d3.extent(data, d => d.revenue);
    yExtent[0] = yExtent[0] * 0.1;
    yExtent[1] = yExtent[1] * 1.1;
    const yScale = d3
      .scaleLinear()
      .domain(yExtent)
      .range([ this.height, 0 ]); // flip axis to plot from bottom and up

    // draw scatter
    const scatter = this.svg
      .append('g')
      .attr('class', 'scatter-points')
      .selectAll('scatter')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'scatter')
      .attr('cx', (d: Movie) => xScale(d.budget))
      .attr('cy', (d: Movie) => yScale(d.revenue))
      .attr('r', 3)
      .style('fill', 'dodgerblue')
      .style('fill-opacity', 0.7);


    // draw x axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat(formatTicks)
      .tickSizeInner(-this.height)
      .tickSizeOuter(0);

    const addLabel = (axis: any, label: string, x: number) => {
      axis
        .selectAll('.tick:last-of-type text')
        .clone()
        .text(label)
        .attr('x', x)
        .style('text-anchor', 'start')
        .style('font-weight', 'bold')
        .style('fill', '#555');
    };

    const xAxisDraw = this.svg
      .append('g')
      .attr('class', 'x axis-scatter')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis)
      .call(addLabel, 'Budget', 25);

    xAxisDraw.selectAll('text').attr('dy', '1em');

    // draw y axis
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat(formatTicks)
      .tickSizeInner(-this.height)
      .tickSizeOuter(0);

    const yAxisDraw = this.svg
      .append('g')
      .attr('class', 'x axis-scatter')
      .call(yAxis)
      .call(addLabel, 'Revenue', 5);

  }

}
