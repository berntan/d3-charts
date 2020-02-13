import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { OrderDeliveryComponent } from './order-delivery.component';
import { AreaChartComponent } from '../area-chart/area-chart.component';

export default {
  title: 'Order delivery',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [ OrderDeliveryComponent, AreaChartComponent ],
      imports: [ CommonModule, MatCardModule ]
    })
  ]
};

export const Default = () => ({
  component: OrderDeliveryComponent,
  props: {}
});
