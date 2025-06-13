import { render } from "@solidjs/testing-library";
import type * as Highcharts from "highcharts";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { createChartComponent, type HighchartsConstructor } from "../createChartComponent";
import type { HighchartsModule } from "../types";

// Mock Highcharts
const mockChart = {
  update: vi.fn(),
  destroy: vi.fn(),
  container: {} as HTMLElement,
  options: {} as Highcharts.Options,
  series: [],
  addSeries: vi.fn(),
  removeSeries: vi.fn(),
  redraw: vi.fn(),
  reflow: vi.fn(),
  exportChart: vi.fn(),
  print: vi.fn(),
  getSVG: vi.fn(),
  getCSV: vi.fn(),
  getTable: vi.fn(),
  setTitle: vi.fn(),
  setSize: vi.fn(),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
} as Partial<Highcharts.Chart> as Highcharts.Chart;

const MockHighchartsModule = {
  chart: vi.fn((_container, _options, _onCreateChart) => {
    _onCreateChart?.(mockChart);
    return mockChart;
  }),
  stockChart: vi.fn(() => mockChart),
  mapChart: vi.fn(() => mockChart),
  ganttChart: vi.fn(() => mockChart),
  Chart: vi.fn(() => mockChart),
  SVGRenderer: vi.fn(),
  VMLRenderer: vi.fn(),
  color: vi.fn(),
  dateFormat: vi.fn(),
  numberFormat: vi.fn(),
  merge: vi.fn(),
  extend: vi.fn(),
  each: vi.fn(),
  pick: vi.fn(),
  wrap: vi.fn(),
  addEvent: vi.fn(),
  removeEvent: vi.fn(),
  fireEvent: vi.fn(),
  animate: vi.fn(),
  stop: vi.fn(),
  getOptions: vi.fn(),
  setOptions: vi.fn(),
  // Add version to satisfy type requirements
  version: "12.0.0",
} as unknown as HighchartsModule;

describe("createChartComponent", () => {
  let defaultOptions: Highcharts.Options;
  let ref: HTMLDivElement | undefined;

  beforeEach(() => {
    vi.resetAllMocks();
    ref = undefined;
    defaultOptions = {
      title: { text: "Test Chart" },
      series: [{ type: "line", data: [1, 2, 3] }],
    };
  });

  test("throws when passing invalid constructor", () => {
    expect(() =>
      createChartComponent(MockHighchartsModule, "invalidConstructor" as HighchartsConstructor),
    ).toThrow();
  });

  test("can render using chart constructor", () => {
    const Chart = createChartComponent(MockHighchartsModule);

    const { container } = render(() => <Chart {...defaultOptions} ref={(c) => (ref = c)} />);

    expect(container).toBeInTheDocument();
    expect(MockHighchartsModule.chart).toHaveBeenCalledWith(ref, defaultOptions, undefined);
  });

  test("can render using stockChart constructor", () => {
    const StockChart = createChartComponent(MockHighchartsModule, "stockChart");

    const { container } = render(() => <StockChart {...defaultOptions} ref={(c) => (ref = c)} />);

    expect(container).toBeInTheDocument();
    expect(MockHighchartsModule.stockChart).toHaveBeenCalledWith(ref, defaultOptions, undefined);
  });

  test("can render using mapChart constructor", () => {
    const MapChart = createChartComponent(MockHighchartsModule, "mapChart");

    const { container } = render(() => <MapChart {...defaultOptions} ref={(c) => (ref = c)} />);

    expect(container).toBeInTheDocument();
    expect(MockHighchartsModule.mapChart).toHaveBeenCalledWith(ref, defaultOptions, undefined);
  });

  test("can render using ganttChart constructor", () => {
    const GanttChart = createChartComponent(MockHighchartsModule, "ganttChart");

    const { container } = render(() => <GanttChart {...defaultOptions} ref={(c) => (ref = c)} />);

    expect(container).toBeInTheDocument();
    expect(MockHighchartsModule.ganttChart).toHaveBeenCalledWith(ref, defaultOptions, undefined);
  });

  test("destroys the chart when unmounting", () => {
    const Chart = createChartComponent(MockHighchartsModule, "chart");
    let chartInstance!: Highcharts.Chart;
    const onCreateChart = vi.fn((c) => {
      chartInstance = c;
    });

    const { container, unmount } = render(() => (
      <Chart {...defaultOptions} ref={(c) => (ref = c)} onCreateChart={onCreateChart} />
    ));

    expect(container).toBeInTheDocument();
    expect(MockHighchartsModule.chart).toHaveBeenCalledWith(ref, defaultOptions, onCreateChart);

    expect(chartInstance).toBeDefined();

    unmount();

    expect(chartInstance.destroy).toHaveBeenCalledTimes(1);
  });
});
