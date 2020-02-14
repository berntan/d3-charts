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

  private hostElement; // Native element hosting the SVG container
  private svg; // Top level SVG element

  margin;
  margin2;
  width;
  height;
  height2;

  private x: d3.ScaleTime<number, number>;
  private x2: d3.ScaleTime<number, number>;
  private y: d3.ScaleLinear<number, number>;
  private y2: d3.ScaleLinear<number, number>;
  private xAxis;   // d3.Axis<d3.AxisDomain>;
  private xAxis2;  //  d3.Axis<d3.AxisDomain>;
  private yAxis;   // d3.Axis<d3.AxisDomain>;
  focus: any;
  private area: any;
  private brush: d3.BrushBehavior<any>;
  private area2: any;
  private context: any;
  private zoom: d3.ZoomBehavior<d3.ZoomedElementBaseType, unknown>;


  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      const parsedArray = d3.csvParse(changes.data.currentValue, this.csvType);
      console.log('parsedArray: ', JSON.stringify(parsedArray));

      /*
      function(error, data) {
        if (error) throw error;

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.price; })]);
        x2.domain(x.domain());
        y2.domain(y.domain());

        focus.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area);

        focus.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        focus.append("g")
          .attr("class", "axis axis--y")
          .call(yAxis);

        context.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area2);

        context.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height2 + ")")
          .call(xAxis2);

        context.append("g")
          .attr("class", "brush")
          .call(brush)
          .call(brush.move, x.range());

        svg.append("rect")
          .attr("class", "zoom")
          .attr("width", width)
          .attr("height", height)
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .call(zoom);
      });
*/
    }
  }

  ngOnInit(): void {
    // this.updateChart(changes.data.currentValue);

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
      .on('brush end', this.brushed);

    this.zoom = d3.zoom()
      .scaleExtent([ 1, Infinity ])
      .translateExtent([ [ 0, 0 ], [ this.width, this.height ] ])
      .extent([ [ 0, 0 ], [ this.width, this.height ] ])
      .on('zoom', this.zoomed);

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
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') {
      return;
    } // ignore brush-by-zoom
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
