import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

const createDrawingArea = (width, height, margin, hostElement) => {
  const svg = d3
    .select(hostElement)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  return svg;
};

@Component({
  selector: 'app-movies-scatter',
  templateUrl: './movies-scatter.component.html',
  styleUrls: [ './movies-scatter.component.scss' ]
})
export class MoviesScatterComponent implements OnInit, OnChanges {
  @Input() data;

  readonly margin = { top: 80, right: 40, bottom: 40, left: 80 };
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
        this.svg = createDrawingArea(this.width, this.height, this.margin, this.hostElement);

      } else {
        this.data = changes.data.currentValue;
        this.drawChart(changes.data.currentValue);
      }
    }
  }

  private drawChart(data: any) {
  }

}
