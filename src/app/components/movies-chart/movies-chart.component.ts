import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { RevenueByGenre } from '../movies-container/movies-container.component';
import * as d3 from 'd3';


@Component({
  selector: 'app-movies-chart',
  template: `
    <div class="bar-chart-container"></div>
  `,
  styleUrls: [ './movies-chart.component.scss' ]
})
export class MoviesChartComponent implements OnInit {
  @Input() data: RevenueByGenre[];

  readonly margin = { top: 40, right: 40, bottom: 40, left: 40 };
  readonly width = 400 - this.margin.left - this.margin.right;
  readonly height = 500 - this.margin.top - this.margin.bottom;
  private readonly hostElement; // TODO: find what type this should be
  private svg;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit(): void {
    const margin = this.margin;
    this.svg = d3.select(this.hostElement)
      .append('svg')
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  }

}
