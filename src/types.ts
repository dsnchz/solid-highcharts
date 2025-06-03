/**
 * Represents the core Highcharts module type.
 * This is the standard Highcharts library that provides basic chart functionality.
 *
 * @example
 * ```typescript
 * import Highcharts from 'highcharts';
 * const Chart = createChart(Highcharts);
 * ```
 */
export type HighchartsCoreModule = typeof import("highcharts");

/**
 * Represents the Highcharts Stock module type.
 * This module extends Highcharts with advanced financial charting capabilities.
 *
 * @example
 * ```typescript
 * import Highcharts from 'highcharts/highstock';
 * const StockChart = createStockChart(Highcharts);
 * ```
 */
export type HighchartsStockModule = typeof import("highcharts/highstock");

/**
 * Represents the Highcharts Maps module type.
 * This module provides geographical mapping and visualization capabilities.
 *
 * @example
 * ```typescript
 * import Highcharts from 'highcharts/highmaps';
 * const MapChart = createMapChart(Highcharts);
 * ```
 */
export type HighchartsMapModule = typeof import("highcharts/highmaps");

/**
 * Represents the Highcharts Gantt module type.
 * This module provides project management and timeline visualization capabilities.
 *
 * @example
 * ```typescript
 * import Highcharts from 'highcharts/highcharts-gantt';
 * const GanttChart = createGanttChart(Highcharts);
 * ```
 */
export type HighchartsGanttModule = typeof import("highcharts/highcharts-gantt");

/**
 * Union type representing any supported Highcharts module.
 * This includes core Highcharts, Stock, Maps, and Gantt modules.
 *
 * @internal
 */
export type HighchartsModule =
  | HighchartsCoreModule
  | HighchartsStockModule
  | HighchartsMapModule
  | HighchartsGanttModule;
