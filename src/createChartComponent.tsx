import type { AnimationOptionsObject } from "highcharts";
import { createEffect, type JSX, mergeProps, onCleanup, onMount, splitProps } from "solid-js";

import type { HighchartsModule } from "./types";

const baseClass = "solid-highcharts";

/**
 * Supported Highcharts constructor types.
 * Each constructor type corresponds to a different chart variant.
 */
export type HighchartsConstructor = "chart" | "stockChart" | "mapChart" | "ganttChart";

type HighchartOptions = Highcharts.Options & {
  /**
   * Whether to animate the chart updates.
   * If true, the chart will animate the updates.
   * If false, the chart will not animate the updates.
   * If an object, it will be passed to the Highcharts.Animation constructor.
   */
  readonly animation?: boolean | Partial<AnimationOptionsObject>;
};

/**
 * Props for Highcharts chart components.
 * Extends Highcharts.Options with additional SolidJS-specific properties.
 *
 * @example
 * ```tsx
 * const chartProps: HighchartsComponentProps = {
 *   title: { text: 'My Chart' },
 *   series: [{ type: 'line', data: [1, 2, 3] }],
 *   onCreateChart: (chart) => console.log('Chart created:', chart),
 *   class: 'my-chart-container'
 * };
 * ```
 */
export type HighchartsComponentProps = HighchartOptions & {
  /** CSS class name to apply to the chart container. */
  readonly class?: string;

  /** CSS styles to apply to the chart container. */
  readonly style?: JSX.CSSProperties;

  /**
   * Ref callback to access the chart container div element.
   * Called with the HTMLDivElement that contains the chart.
   */
  readonly ref?: (container: HTMLDivElement) => void;
  /**
   * Callback function called when the chart is successfully created.
   * Receives the Highcharts chart instance as a parameter.
   */
  readonly onCreateChart?: Highcharts.ChartCallbackFunction;
};

/**
 * The Highcharts component.
 *
 * @param props - The props for the chart component.
 * @returns A JSX element that renders the chart.
 */
export type HighchartsComponent = (props: HighchartsComponentProps) => JSX.Element;

/**
 * Creates a SolidJS component for rendering Highcharts charts.
 *
 * This is the core factory function that creates chart components with proper
 * SolidJS integration, including reactive updates and cleanup.
 *
 * @param HighchartsModule - The Highcharts module to use (core, stock, maps, or gantt)
 * @param constructor - The chart constructor type to use (defaults to "chart")
 * @returns A SolidJS component function that renders Highcharts charts
 *
 * @throws {Error} When the specified constructor is not found on the Highcharts module
 *
 * @example
 * ```tsx
 * import Highcharts from 'highcharts';
 * import { createChartComponent } from '@dschz/solid-highcharts';
 *
 * const Chart = createChartComponent(Highcharts, 'chart');
 *
 * function App() {
 *   return (
 *     <Chart
 *       title={{ text: 'My Chart' }}
 *       series={[{ type: 'line', data: [1, 2, 3] }]}
 *       onCreateChart={(chart) => console.log('Chart ready!', chart)}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * Using with Highcharts Stock:
 * ```tsx
 * import Highcharts from 'highcharts/highstock';
 *
 * const StockChart = createChartComponent(Highcharts, 'stockChart');
 *
 * function StockApp() {
 *   return (
 *     <StockChart
 *       title={{ text: 'Stock Price' }}
 *       series={[{ type: 'candlestick', data: stockData }]}
 *     />
 *   );
 * }
 * ```
 */
export const createChartComponent = (
  HighchartsModule: HighchartsModule,
  constructor: HighchartsConstructor = "chart",
): HighchartsComponent => {
  if (typeof HighchartsModule[constructor] !== "function") {
    throw new Error(
      `[solid-highcharts] Constructor "${constructor}" not found on Highcharts module. ` +
        `Did you import the correct variant (e.g., highstock, highmaps)?`,
    );
  }

  return (props: HighchartsComponentProps) => {
    let container!: HTMLDivElement;

    const _props = mergeProps(
      {
        animation: true,
      },
      props,
    );

    const [local, options] = splitProps(_props, [
      "style",
      "class",
      "ref",
      "animation",
      "onCreateChart",
    ]);

    onMount(() => {
      local.ref?.(container);
      const chart = HighchartsModule[constructor](container, options, local.onCreateChart);

      createEffect(() => {
        chart.update(options, true, true, local.animation);
      });

      onCleanup(() => {
        chart.destroy();
      });
    });

    const classes = () => (local.class ? `${baseClass} ${local.class}` : baseClass);

    return <div ref={container} class={classes()} style={local.style} />;
  };
};
