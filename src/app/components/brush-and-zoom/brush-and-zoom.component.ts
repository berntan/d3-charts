import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-brush-and-zoom',
  template: `
    <svg width="960" height="500"></svg>
  `,
  styleUrls: [ './brush-and-zoom.component.scss' ]
})
export class BrushAndZoomComponent implements OnInit, OnChanges {
  @Input() data: string;

  hostElement; // Native element hosting the SVG container
  svg; // Top level SVG element

  margin;
  margin2;
  width;
  height;
  height2;

  x: d3.ScaleTime<number, number>;
  x2: d3.ScaleTime<number, number>;
  y: d3.ScaleLinear<number, number>;
  y2: d3.ScaleLinear<number, number>;
  xAxis;   // d3.Axis<d3.AxisDomain>;
  xAxis2;  //  d3.Axis<d3.AxisDomain>;
  yAxis;   // d3.Axis<d3.AxisDomain>;
  focus: any;
  area: any;
  brush: d3.BrushBehavior<any>;
  area2: any;
  context: any;
  zoom: d3.ZoomBehavior<d3.ZoomedElementBaseType, unknown>;


  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit(): void {
    // this.updateChart(changes.data.currentValue);
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      if (!this.svg) {
        this.createChart();
      } else {
        this.drawChart(changes.data.currentValue);
      }
    }
  }

  private drawChart(data: any) {
    const parsedData = d3.csvParse(data, this.csvType);

    this.x.domain(d3.extent(parsedData, (d) => d.date));
    this.y.domain([ 0, d3.max(parsedData, (d) => d.price) ]);
    this.x2.domain(this.x.domain());
    this.y2.domain(this.y.domain());

    this.focus.append('path')
      .datum(parsedData)
      .attr('class', 'area')
      .attr('d', this.area);

    this.focus.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.xAxis);

    this.focus.append('g')
      .attr('class', 'axis axis--y')
      .call(this.yAxis);

    this.context.append('path')
      .datum(parsedData)
      .attr('class', 'area')
      .attr('d', this.area2);

    this.context.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height2 + ')')
      .call(this.xAxis2);

    this.context.append('g')
      .attr('class', 'brush')
      .call(this.brush)
      .call(this.brush.move, this.x.range());

    // TODO: This covers up the area ...
    // this.svg.append('rect')
    //   .attr('class', 'zoom')
    //   .attr('width', this.width)
    //   .attr('height', this.height)
    //   .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
    //   .call(this.zoom);
  }

  private createChart() {
    this.svg = d3.select(this.hostElement).select('svg');

    this.margin = { top: 20, right: 20, bottom: 110, left: 40 };
    this.margin2 = { top: 430, right: 20, bottom: 30, left: 40 };
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.height2 = +this.svg.attr('height') - this.margin2.top - this.margin2.bottom;

    this.x = d3.scaleTime().range([ 0, this.width ]);
    this.x2 = d3.scaleTime().range([ 0, this.width ]);
    this.y = d3.scaleLinear().range([ this.height, 0 ]);
    this.y2 = d3.scaleLinear().range([ this.height2, 0 ]);

    this.xAxis = d3.axisBottom(this.x);
    this.xAxis2 = d3.axisBottom(this.x2);
    this.yAxis = d3.axisLeft(this.y);

    this.brush = d3.brushX()
      .extent([ [ 0, 0 ], [ this.width, this.height2 ] ])
      .on('brush end', this.brushed.bind(this));

    this.zoom = d3.zoom()
      .scaleExtent([ 1, Infinity ])
      .translateExtent([ [ 0, 0 ], [ this.width, this.height ] ])
      .extent([ [ 0, 0 ], [ this.width, this.height ] ])
      .on('zoom', this.zoomed.bind(this));

    this.area = d3.area()
      .curve(d3.curveMonotoneX)
      .x((d: any) => this.x(d.date))
      .y0(this.height)
      .y1((d: any) => this.y(d.price));

    this.area2 = d3.area()
      .curve(d3.curveMonotoneX)
      .x((d: any) => this.x2(d.date))
      .y0(this.height2)
      .y1((d: any) => this.y2(d.price));

    this.svg.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height);


    this.focus = this.svg.append('g')
      .attr('class', 'focus')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.context = this.svg.append('g')
      .attr('class', 'context')
      .attr('transform', 'translate(' + this.margin2.left + ',' + this.margin2.top + ')');
  }

  brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') { return; } // ignore brush-by-zoom
    const s = d3.event.selection || this.x2.range();
    this.x.domain(s.map(this.x2.invert, this.x2));
    this.focus.select('.area').attr('d', this.area);
    this.focus.select('.axis--x').call(this.xAxis);
    this.svg.select('.zoom').call(this.zoom.transform, d3.zoomIdentity
      .scale(this.width / (s[1] - s[0]))
      .translate(-s[0], 0));

  }

  zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') {
      return;
    } // ignore zoom-by-brush
    const t = d3.event.transform;
    this.x.domain(t.rescaleX(this.x2).domain());
    this.focus.select('.area').attr('d', this.area);
    this.focus.select('.axis--x').call(this.xAxis);
    this.context.select('.brush').call(this.brush.move, this.x.range().map(t.invertX, t));
  }

  csvType(d) {
    d.date = parseDate(d.date);
    d.price = +d.price;
    return d;
  }

}

const parseDate = d3.timeParse('%b %Y');
