import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrushAndZoomComponent } from '../brush-and-zoom/brush-and-zoom.component';

@Component({
  selector: 'app-brush-and-zoom-container',
  templateUrl: './brush-and-zoom-container.component.html',
  styleUrls: [ './brush-and-zoom-container.component.scss' ]
})
export class BrushAndZoomContainerComponent implements OnInit, AfterContentInit {

  @ViewChild('brushAndZoom', { static: true }) chart: BrushAndZoomComponent;
  csvData = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.http.get('/assets/data/sp500.csv', { responseType: 'text' }).subscribe(
      data => {
        this.csvData = data;
      }
    );
  }

}
