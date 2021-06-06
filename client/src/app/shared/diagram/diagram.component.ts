import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { StockChart } from 'angular-highcharts';
import { SeriesAreaOptions } from 'highcharts';
import { takeUntil } from 'rxjs/operators';
import { fullAreaChartOptions } from 'src/app/helpers/fullAreaChartOptions';
import { CoinMarketCupService } from 'src/app/services/coinmarketcup/coinmarketcup.service';
import { AbstractPageDirective } from '../abstract-page/abstract-page.directive';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent extends AbstractPageDirective implements OnChanges {
  @Input() height: string;
  @Input() currencyName: string;
  stockChart: StockChart;

  constructor(private coinMarketCupService: CoinMarketCupService) {
    super();
  }

  ngOnChanges(): void {
    if (this.height) {
      fullAreaChartOptions.chart.height = this.height;
      fullAreaChartOptions.rangeSelector = {
        enabled: false,
      };
    }
    this.chooseServiceByCurrencyName();
  }

  private chooseServiceByCurrencyName(): void {
    switch (this.currencyName) {
      case 'BTC':
        this.getCoinHistoryBTC();
        break;
      case 'ETH':
        this.getCoinHistoryETH();
        break;
      case 'XRP':
        this.getCoinHistoryXRP();
        break;
      default:
        this.getCoinHistoryBTC();
    }
  }

  private getCoinHistoryBTC(): void {
    this.coinMarketCupService
      .getCoinHistoryBTC()
      .pipe(takeUntil(this.destroy$))
      .subscribe((coinHistory) => {
        let data = [];

        coinHistory[0].priceData.forEach((item) => {
          data.push([Date.parse(item.date), item.high]);
        });

        Object.assign(
          (fullAreaChartOptions.series[0] as SeriesAreaOptions).data,
          data
        );

        this.stockChart = new StockChart(fullAreaChartOptions);
      });
  }

  private getCoinHistoryETH(): void {
    this.coinMarketCupService
      .getCoinHistoryETH()
      .pipe(takeUntil(this.destroy$))
      .subscribe((coinHistory) => {
        let data = [];

        coinHistory[0].priceData.forEach((item) => {
          data.push([Date.parse(item.date), item.high]);
        });

        Object.assign(
          (fullAreaChartOptions.series[0] as SeriesAreaOptions).data,
          data
        );

        this.stockChart = new StockChart(fullAreaChartOptions);
      });
  }

  private getCoinHistoryXRP(): void {
    this.coinMarketCupService
      .getCoinHistoryXRP()
      .pipe(takeUntil(this.destroy$))
      .subscribe((coinHistory) => {
        let data = [];

        coinHistory[0].priceData.forEach((item) => {
          data.push([Date.parse(item.date), item.high]);
        });

        Object.assign(
          (fullAreaChartOptions.series[0] as SeriesAreaOptions).data,
          data
        );

        this.stockChart = new StockChart(fullAreaChartOptions);
      });
  }
}
