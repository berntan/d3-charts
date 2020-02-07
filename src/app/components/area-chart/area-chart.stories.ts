import { AreaChartComponent} from './area-chart.component';
import * as d3 from 'd3';

export default {
  title: 'Area Chart',
  excludeStories: /.*Data$/,
};

class DeliveryMetric {
  state: string;
  stateDisplayValue: string;
  mean: number;
  stdDev: number;

  constructor(stateIn, stateDisplayValueIn, meanIn, stdDevIn) {
    this.state = stateIn;
    this.stateDisplayValue = stateDisplayValueIn;
    this.mean = meanIn;
    this.stdDev = stdDevIn;
  }
}

const generateData = () => {
  const localChartData = [];
  const deliveryMetrics = [];
  const meanPrepTime = randomInt(10, 11);
  const meanWaitTime = randomInt(8, 9);
  const meanTransitTime = randomInt(9, 10);

  const meanTotalTime = meanPrepTime + meanWaitTime + meanTransitTime;

  const sigmaPrepTime = randomInt(1, 1);
  const sigmaWaitTime = randomInt(2, 3);
  const sigmaTransitTime = randomInt(1, 2);

  const sigmaTotalTime = Math.floor(
    Math.sqrt(Math.pow(sigmaPrepTime, 2) +
      Math.pow(sigmaWaitTime, 2) +
      Math.pow(sigmaTransitTime, 2))
  );

  deliveryMetrics.push(new DeliveryMetric(
    'preparing',
    'Preparation',
    meanPrepTime,
    sigmaPrepTime
  ));
  deliveryMetrics.push(new DeliveryMetric(
    'ready',
    'Waiting',
    meanWaitTime,
    sigmaWaitTime
  ));
  deliveryMetrics.push(new DeliveryMetric(
    'inTransit',
    'In Transit',
    meanTransitTime,
    sigmaTransitTime
  ));
  deliveryMetrics.push(new DeliveryMetric(
    'delivered',
    'Total delivery',
    meanTotalTime,
    sigmaTotalTime
  ));


  const prandomizer = d3.randomNormal(meanPrepTime, sigmaPrepTime);
  const wrandomizer = d3.randomNormal(meanWaitTime, sigmaWaitTime);
  const trandomizer = d3.randomNormal(meanTransitTime, sigmaTransitTime);

  const ptimes = [];
  const wtimes = [];
  const ttimes = [];
  const totaltimes = [];
  for (let i = 0; i < 500; i++) {
    const p = Math.floor(prandomizer());
    const w = Math.floor(wrandomizer());
    const t = Math.floor(trandomizer());
    const total = p + w + t;
    ptimes.push(p);
    wtimes.push(w);
    ttimes.push(t);
    totaltimes.push(total);
  }
  localChartData.push(ptimes);
  localChartData.push(wtimes);
  localChartData.push(ttimes);
  localChartData.push(totaltimes);
  return localChartData;
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export const chartData = generateData();

export const Default = () => ({
  component: AreaChartComponent,
  props: {
    data: chartData
  },
});
