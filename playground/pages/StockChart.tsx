// eslint-disable-next-line simple-import-sort/imports
import Highcharts from "highcharts/esm/highstock";
// import "highcharts/esm/modules/accessibility";

import { createSignal, onMount } from "solid-js";

import { createStockChart } from "../../src/index";

const StockChart = createStockChart(Highcharts);

export const StockChartPage = () => {
  const [stockData, setStockData] = createSignal<number[][]>([]);
  const [volumeData, setVolumeData] = createSignal<number[][]>([]);
  const [isLoading, setIsLoading] = createSignal(true);

  // Generate sample stock data
  const generateStockData = () => {
    const data: number[][] = [];
    const volume: number[][] = [];
    const startTime = Date.UTC(2024, 0, 1);
    let price = 100;

    for (let i = 0; i < 365; i++) {
      const time = startTime + i * 24 * 60 * 60 * 1000;

      // Random walk for price
      const change = (Math.random() - 0.5) * 4;
      price = Math.max(price + change, 10);

      // OHLC data
      const open = price;
      const high = price + Math.random() * 3;
      const low = price - Math.random() * 3;
      const close = price + (Math.random() - 0.5) * 2;

      data.push([time, open, high, low, close]);
      volume.push([time, Math.floor(Math.random() * 1000000) + 100000]);

      price = close;
    }

    setStockData(data);
    setVolumeData(volume);
    setIsLoading(false);
  };

  onMount(() => {
    generateStockData();
  });

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      generateStockData();
    }, 500);
  };

  return (
    <div class="p-6 space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 class="text-3xl font-bold text-gray-900">Stock Charts</h1>
        <div class="flex gap-2">
          <button
            onClick={refreshData}
            disabled={isLoading()}
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading() ? "Loading..." : "Refresh Data"}
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div class="bg-white p-6 rounded-lg shadow">
        {isLoading() ? (
          <div class="flex items-center justify-center h-96">
            <div class="text-lg text-gray-500">Loading stock data...</div>
          </div>
        ) : (
          <StockChart
            accessibility={{
              enabled: true,
            }}
            title={{ text: "Sample Stock Price (OHLC)" }}
            subtitle={{ text: "Generated sample data with candlestick chart" }}
            rangeSelector={{
              selected: 1,
              buttons: [
                {
                  count: 1,
                  type: "month",
                  text: "1M",
                },
                {
                  count: 3,
                  type: "month",
                  text: "3M",
                },
                {
                  count: 6,
                  type: "month",
                  text: "6M",
                },
                {
                  type: "all",
                  text: "All",
                },
              ],
            }}
            yAxis={[
              {
                labels: {
                  align: "right",
                  x: -3,
                },
                title: {
                  text: "OHLC",
                },
                height: "60%",
                lineWidth: 2,
                resize: {
                  enabled: true,
                },
              },
              {
                labels: {
                  align: "right",
                  x: -3,
                },
                title: {
                  text: "Volume",
                },
                top: "65%",
                height: "35%",
                offset: 0,
                lineWidth: 2,
              },
            ]}
            tooltip={{
              split: true,
            }}
            series={[
              {
                type: "candlestick",
                name: "Stock Price",
                data: stockData(),
                dataGrouping: {
                  units: [
                    ["week", [1]],
                    ["month", [1, 2, 3, 4, 6]],
                  ],
                },
              },
              {
                type: "column",
                name: "Volume",
                data: volumeData(),
                yAxis: 1,
                dataGrouping: {
                  units: [
                    ["week", [1]],
                    ["month", [1, 2, 3, 4, 6]],
                  ],
                },
              },
            ]}
            onCreateChart={(chart) => {
              console.log("Stock chart created:", chart);
            }}
            class="w-full"
            style={{ height: "500px" }}
          />
        )}
      </div>

      {/* Chart Info */}
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Chart Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <strong>Chart Type:</strong> Candlestick + Volume
          </div>
          <div>
            <strong>Data Points:</strong> {stockData().length}
          </div>
          <div>
            <strong>Time Range:</strong> 1 Year
          </div>
          <div>
            <strong>Library:</strong> Highcharts Stock
          </div>
        </div>
        <div class="mt-4 p-3 bg-blue-50 rounded text-sm">
          <strong>Features:</strong> Range selector, data grouping, dual y-axis, scrollbar,
          navigator, split tooltips
        </div>
      </div>
    </div>
  );
};
