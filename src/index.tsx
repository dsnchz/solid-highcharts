import { createChartComponent, type HighchartsComponent } from "./createChartComponent";
import type {
  HighchartsCoreModule,
  HighchartsGanttModule,
  HighchartsMapModule,
  HighchartsStockModule,
} from "./types";

export type { HighchartsComponent, HighchartsComponentProps } from "./createChartComponent";

/**
 * Creates a SolidJS component for rendering standard Highcharts charts.
 *
 * This is a convenience function that pre-configures `createChartComponent`
 * with the "chart" constructor for standard chart types.
 *
 * @param HighchartsModule - The core Highcharts module
 * @returns A SolidJS component for rendering standard charts
 *
 * @example
 * ```tsx
 * import Highcharts from 'highcharts';
 * import { createChart } from '@dschz/solid-highcharts';
 *
 * const Chart = createChart(Highcharts);
 *
 * function App() {
 *   return (
 *     <Chart
 *       title={{ text: 'Sales Data' }}
 *       series={[{
 *         type: 'line',
 *         name: 'Sales',
 *         data: [29.9, 71.5, 106.4, 129.2]
 *       }]}
 *     />
 *   );
 * }
 * ```
 */
export const createChart = (HighchartsModule: HighchartsCoreModule): HighchartsComponent =>
  createChartComponent(HighchartsModule, "chart");

/**
 * Creates a SolidJS component for rendering Highcharts Stock charts.
 *
 * This is a convenience function that pre-configures `createChartComponent`
 * with the "stockChart" constructor for financial and time-series data visualization.
 *
 * @param HighchartsModule - The Highcharts Stock module
 * @returns A SolidJS component for rendering stock charts
 *
 * @example
 * ```tsx
 * import Highcharts from 'highcharts/highstock';
 * import { createStockChart } from '@dschz/solid-highcharts';
 *
 * const StockChart = createStockChart(Highcharts);
 *
 * function StockApp() {
 *   return (
 *     <StockChart
 *       title={{ text: 'AAPL Stock Price' }}
 *       series={[{
 *         type: 'candlestick',
 *         name: 'AAPL',
 *         data: ohlcData // [timestamp, open, high, low, close]
 *       }]}
 *       navigator={{ enabled: true }}
 *       scrollbar={{ enabled: true }}
 *     />
 *   );
 * }
 * ```
 */
export const createStockChart = (HighchartsModule: HighchartsStockModule): HighchartsComponent =>
  createChartComponent(HighchartsModule, "stockChart");

/**
 * Creates a SolidJS component for rendering Highcharts Maps.
 *
 * This is a convenience function that pre-configures `createChartComponent`
 * with the "mapChart" constructor for geographical data visualization.
 *
 * @param HighchartsModule - The Highcharts Maps module
 * @returns A SolidJS component for rendering map charts
 *
 * @example
 * ```tsx
 * import Highcharts from 'highcharts/highmaps';
 * import worldMap from '@highcharts/map-collection/custom/world.geo.json';
 * import { createMapChart } from '@dschz/solid-highcharts';
 *
 * const MapChart = createMapChart(Highcharts);
 *
 * function MapApp() {
 *   return (
 *     <MapChart
 *       title={{ text: 'World Population Density' }}
 *       mapNavigation={{ enabled: true }}
 *       series={[{
 *         type: 'map',
 *         name: 'Countries',
 *         mapData: worldMap,
 *         data: populationData
 *       }]}
 *     />
 *   );
 * }
 * ```
 */
export const createMapChart = (HighchartsModule: HighchartsMapModule): HighchartsComponent =>
  createChartComponent(HighchartsModule, "mapChart");

/**
 * Creates a SolidJS component for rendering Highcharts Gantt charts.
 *
 * This is a convenience function that pre-configures `createChartComponent`
 * with the "ganttChart" constructor for project management and timeline visualization.
 *
 * @param HighchartsModule - The Highcharts Gantt module
 * @returns A SolidJS component for rendering Gantt charts
 *
 * @example
 * ```tsx
 * import Highcharts from 'highcharts/highcharts-gantt';
 * import { createGanttChart } from '@dschz/solid-highcharts';
 *
 * const GanttChart = createGanttChart(Highcharts);
 *
 * function ProjectApp() {
 *   return (
 *     <GanttChart
 *       title={{ text: 'Project Timeline' }}
 *       series={[{
 *         name: 'Project Tasks',
 *         data: [{
 *           name: 'Task 1',
 *           start: Date.UTC(2024, 0, 1),
 *           end: Date.UTC(2024, 0, 15),
 *           completed: 0.5
 *         }, {
 *           name: 'Task 2',
 *           start: Date.UTC(2024, 0, 10),
 *           end: Date.UTC(2024, 0, 25),
 *           dependency: 'Task 1'
 *         }]
 *       }]}
 *     />
 *   );
 * }
 * ```
 */
export const createGanttChart = (HighchartsModule: HighchartsGanttModule): HighchartsComponent =>
  createChartComponent(HighchartsModule, "ganttChart");
