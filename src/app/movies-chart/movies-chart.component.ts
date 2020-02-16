import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RevenueByGenre } from '../movies-container/movies-container.component';
import * as d3 from 'd3';
import { formatTicks } from '../utils/movie.functions';


@Component({
  selector: 'app-movies-chart',
  template: `
    <div class="bar-chart-container"></div>
  `,
  styleUrls: [ './movies-chart.component.scss' ]
})
export class MoviesChartComponent implements OnInit, OnChanges {
  @Input() data: RevenueByGenre[];

  readonly margin = { top: 80, right: 40, bottom: 40, left: 80 };
  readonly width = 400 - this.margin.left - this.margin.right;
  readonly height = 500 - this.margin.top - this.margin.bottom;
  private readonly hostElement; // TODO: find what type this should be
  private svg;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit(): void {
  }

  private createDrawingArea() {
    const margin = this.margin;
    this.svg = d3
      .select(this.hostElement)
      .append('svg')
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  }

  private drawChart(data: RevenueByGenre[]) {
    // Draw header
    const header = this.svg
      .append('g')
      .attr('class', 'bar-header')
      .attr('transform', `translate(0, ${-this.margin.top * 0.6})`)
      .append('text');

    header.append('tspan').text('Total revenue by genre in $US');

    header
      .append('tspan')
      .attr('x', 0) // Move left
      .attr('dy', '1.5em') // move down with a little margin
      .style('font-size', '0.8em') // smaller text
      .style('fill', '#555')
      .text('Films w/ budget and revenue figures, 2000-2009');

    // scales
    const xMax = d3.max(data, d => d.revenue);

    const xScale = d3
      .scaleLinear()
      .domain([ 0, xMax ])
      .range([ 0, this.width ]);

    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.genre))
      .rangeRound([ 0, this.height ])
      .paddingInner(0.25);

    // Draw base
    const bars = this.svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', d => yScale(d.genre))
      .attr('width', d => xScale(d.revenue))
      .attr('height', yScale.bandwidth())
      .style('fill', 'dodgerblue');

    // Draw axes
    const xAxis = d3
      .axisTop(xScale)
      .tickFormat(formatTicks)
      .tickSizeInner(-this.height)
      .tickSizeOuter(0);

    const xAxisDraw = this.svg
      .append('g')
      .attr('class', 'x axis')
      .call(xAxis);

    const yAxis = d3
      .axisLeft(yScale)
      .tickSize(0);

    const yAxisDraw = this.svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .selectAll('text')
      .attr('dx', '-0.6em'); // Move text a little to the left
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      if (!this.svg) {
        this.createDrawingArea();
      } else {
        this.data = changes.data.currentValue;
        this.drawChart(changes.data.currentValue);
      }
    }
  }

}
