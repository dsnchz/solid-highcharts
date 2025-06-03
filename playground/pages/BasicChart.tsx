// eslint-disable-next-line simple-import-sort/imports
import Highcharts from "highcharts/esm/highcharts";
import "highcharts/esm/modules/accessibility";
import "highcharts/esm/modules/exporting";
import "highcharts/esm/modules/export-data";

import { createSignal, For } from "solid-js";

import { createChart } from "../../src/index";

const Chart = createChart(Highcharts);

type ChartType = "line" | "column" | "area" | "pie";

export const BasicChart = () => {
  const [chartType, setChartType] = createSignal<ChartType>("line");
  const [data, setData] = createSignal([
    { name: "Jan", y: 29.9 },
    { name: "Feb", y: 71.5 },
    { name: "Mar", y: 106.4 },
    { name: "Apr", y: 129.2 },
    { name: "May", y: 144.0 },
    { name: "Jun", y: 176.0 },
  ]);

  const [isAnimating, setIsAnimating] = createSignal(false);

  const animateData = () => {
    if (isAnimating()) return;

    setIsAnimating(true);
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          y: Math.round(Math.random() * 200),
        })),
      );
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setIsAnimating(false);
    }, 3000);
  };

  const chartTypes: ChartType[] = ["line", "column", "area", "pie"];

  // Create properly typed series objects for each chart type
  const getSeriesConfig = (): Highcharts.SeriesOptionsType[] => {
    const currentData = data();

    switch (chartType()) {
      case "line":
        return [
          {
            type: "line",
            name: "Sample Data",
            data: currentData,
          },
        ];

      case "column":
        return [
          {
            type: "column",
            name: "Sample Data",
            data: currentData,
          },
        ];

      case "area":
        return [
          {
            type: "area",
            name: "Sample Data",
            data: currentData,
          },
        ];

      case "pie":
        return [
          {
            type: "pie",
            name: "Sample Data",
            data: currentData.map((item) => ({ name: item.name, y: item.y })),
          },
        ];

      default:
        return [
          {
            type: "line",
            name: "Sample Data",
            data: currentData,
          },
        ];
    }
  };

  return (
    <div class="p-6 space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 class="text-3xl font-bold text-gray-900">Basic Charts</h1>
        <div class="flex gap-2">
          <button
            onClick={animateData}
            disabled={isAnimating()}
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnimating() ? "Animating..." : "Animate Data"}
          </button>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div class="bg-white p-4 rounded-lg shadow">
        <label class="block text-sm font-medium text-gray-700 mb-2">Chart Type:</label>
        <div class="flex gap-2 flex-wrap">
          <For each={chartTypes}>
            {(type) => (
              <button
                onClick={() => setChartType(type)}
                class={`px-3 py-2 rounded ${
                  chartType() === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Chart Container */}
      <div class="bg-white p-6 rounded-lg shadow">
        <Chart
          accessibility={{
            enabled: true,
          }}
          exporting={{
            enabled: true,
          }}
          chart={{ type: chartType() }}
          title={{
            text: `${chartType().charAt(0).toUpperCase() + chartType().slice(1)} Chart Example`,
          }}
          xAxis={chartType() === "pie" ? undefined : { type: "category" }}
          yAxis={
            chartType() === "pie"
              ? undefined
              : {
                  title: { text: "Values" },
                  min: 0,
                }
          }
          series={getSeriesConfig()}
          plotOptions={{
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              },
            },
          }}
          tooltip={
            chartType() === "pie"
              ? {
                  pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
                }
              : {
                  valueSuffix: " units",
                }
          }
          onCreateChart={(chart) => {
            console.log("Basic chart created:", chart);
          }}
          class="w-full"
          style={{ height: "400px" }}
        />
      </div>

      {/* Chart Info */}
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Chart Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Type:</strong> {chartType()}
          </div>
          <div>
            <strong>Data Points:</strong> {data().length}
          </div>
          <div>
            <strong>Animation:</strong> {isAnimating() ? "Active" : "Inactive"}
          </div>
          <div>
            <strong>Library:</strong> Highcharts Core
          </div>
        </div>
      </div>
    </div>
  );
};
