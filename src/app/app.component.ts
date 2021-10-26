import {Component, OnInit} from '@angular/core';
import {ColorHelper, ScaleType} from '@swimlane/ngx-charts';
import {MetricsApiClientService} from './metrics-api-client/metrics-api-client.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public xAxisTickFormattingFn = this.xAxisTickFormatting.bind(this);
  public yAxisTickFormattingFn = this.yAxisTickFormatting.bind(this);

  faSpinner = faSpinner;

  public activeEntries: any[] = [];
  public chartNames: string[];
  public colors: ColorHelper;
  dataRequired: any = [];
  view: any[];
  estimatedPrices: any;
  timeSeriesIValuation: any = [];
  timeSeriesIValuationLow: any = [];
  timeSeriesIValuationHigh: any = [];
  timeSeriesEstatedLow: any = [];
  timeSeriesEstatedHigh: any = [];
  timeSeriesEstatedAverage: any = [];
  timeSeriesAttomLow: any = [];
  timeSeriesAttomHigh: any = [];
  timeSeriesAttomAverage: any = [];

  // options
  legend = true;
  showLabels = true;
  xAxis = true;
  yAxis = true;
  rangeFillOpacity = 0.1;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  yAxisLabel = 'Price';
  timeline = true;
  maxXAxisTickLength = 10;

  public colorScheme: any = {
    domain: ['#FF0000', '#F1948A', '#CB4335', '#00FF00', '#58D68D', '#1D8348', '#0000FF', '#3498DB', '#1F618D']
  };

  constructor(private metricsApiClientService: MetricsApiClientService) {
    this.view = [innerWidth / 1.3, 500];
  }

  ngOnInit(): void {
    this.metricsApiClientService.getData().subscribe(data => {
      this.estimatedPrices = data;
      this.loadTimeSeries();
      this.chartNames = this.dataRequired.map((d: any) => d.name);
      this.colors = new ColorHelper(this.colorScheme, ScaleType.Ordinal, this.chartNames, this.colorScheme);
    });
  }

  public legendLabelActivate(item: any): void {
    this.activeEntries = [item];
  }

  public legendLabelDeactivate(item: any): void {
    this.activeEntries = [];
  }

  loadTimeSeries() {
    this.estimatedPrices.iValuation.forEach(iValuation => {
      this.timeSeriesIValuation.push({
        name: iValuation.name,
        value: iValuation.value
      });
    });
    this.dataRequired.push({
      name: 'iValuation',
      series: this.timeSeriesIValuation
    });

    this.estimatedPrices.iValuationLow.forEach(iValuationLow => {
      this.timeSeriesIValuationLow.push({
        name: iValuationLow.name,
        value: iValuationLow.value
      });
    });
    this.dataRequired.push({
      name: 'iValuationLow',
      series: this.timeSeriesIValuationLow
    });

    this.estimatedPrices.iValuationHigh.forEach(iValuationHigh => {
      this.timeSeriesIValuationHigh.push({
        name: iValuationHigh.name,
        value: iValuationHigh.value
      });
    });
    this.dataRequired.push({
      name: 'iValuationHigh',
      series: this.timeSeriesIValuationHigh
    });

    this.estimatedPrices.estatedAverage.forEach(estatedAverage => {
      this.timeSeriesEstatedAverage.push({
        name: estatedAverage.name,
        value: estatedAverage.value
      });
    });
    this.dataRequired.push({
      name: 'estated',
      series: this.timeSeriesEstatedAverage
    });

    this.estimatedPrices.estatedLow.forEach(estatedLow => {
      this.timeSeriesEstatedLow.push({
        name: estatedLow.name,
        value: estatedLow.value
      });
    });
    this.dataRequired.push({
      name: 'estatedLow',
      series: this.timeSeriesEstatedLow
    });

    this.estimatedPrices.estatedHigh.forEach(estatedHigh => {
      this.timeSeriesEstatedHigh.push({
        name: estatedHigh.name,
        value: estatedHigh.value
      });
    });
    this.dataRequired.push({
      name: 'estatedHigh',
      series: this.timeSeriesEstatedHigh
    });

    this.estimatedPrices.attomAverage.forEach(attomAverage => {
      this.timeSeriesAttomAverage.push({
        name: attomAverage.name,
        value: attomAverage.value
      });
    });
    this.dataRequired.push({
      name: 'attom',
      series: this.timeSeriesAttomAverage
    });

    this.estimatedPrices.attomLow.forEach(attomLow => {
      this.timeSeriesAttomLow.push({
        name: attomLow.name,
        value: attomLow.value
      });
    });
    this.dataRequired.push({
      name: 'attomLow',
      series: this.timeSeriesAttomLow
    });

    this.estimatedPrices.attomHigh.forEach(attomHigh => {
      this.timeSeriesAttomHigh.push({
        name: attomHigh.name,
        value: attomHigh.value
      });
    });
    this.dataRequired.push({
      name: 'attomHigh',
      series: this.timeSeriesAttomHigh
    });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  yAxisTickFormatting(value){
    return this.currencyFormatting(value);
  }

  currencyFormatting(val: any) {
    return val.toLocaleString() + ' $';
  }

  xAxisTickFormatting(value){
    return this.dateFormatting(value);
  }

  dateFormatting(val: any) {
    const date = new Date(val);
    const hours = date.getUTCHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return date.toDateString() + ', ' + hours + ':' + minutes;
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }
}
