// eslint-disable-next-line simple-import-sort/imports
import Highcharts from "highcharts/esm/highmaps";
import "highcharts/esm/modules/accessibility";

import { createSignal, For, onMount } from "solid-js";

import { createMapChart } from "../../src/index";

const MapChart = createMapChart(Highcharts);

type MapOption = {
  name: string;
  key: string;
  description: string;
};

const availableMaps: [MapOption, ...MapOption[]] = [
  {
    name: "World",
    key: "custom/world",
    description: "World map with all countries",
  },
  {
    name: "Europe",
    key: "custom/europe",
    description: "European countries",
  },
  {
    name: "North America",
    key: "custom/north-america",
    description: "North American countries",
  },
  {
    name: "United States",
    key: "countries/us/us-all",
    description: "US states",
  },
  {
    name: "United Kingdom",
    key: "countries/gb/gb-all",
    description: "UK regions",
  },
];

export const MapChartPage = () => {
  const [selectedMap, setSelectedMap] = createSignal<MapOption>(availableMaps[0]);
  const [mapData, setMapData] = createSignal<object | null>(null);
  const [chartData, setChartData] = createSignal<
    Array<{ "hc-key": string; name: string; value: number }>
  >([]);
  const [isLoading, setIsLoading] = createSignal(false);
  const [dataLabelsEnabled, setDataLabelsEnabled] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const loadMapData = async (mapOption: MapOption) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://code.highcharts.com/mapdata/${mapOption.key}.topo.json`,
      );

      if (!response.ok) {
        throw new Error(`Failed to load map: ${response.statusText}`);
      }

      const topology = await response.json();

      // Generate sample data for the map
      const data = topology.objects.default.geometries.map((g: unknown, _index: number) => ({
        "hc-key": (g as { properties: { "hc-key": string; name?: string } }).properties["hc-key"],
        name:
          (g as { properties: { name?: string; "hc-key": string } }).properties.name ||
          (g as { properties: { "hc-key": string } }).properties["hc-key"],
        value: Math.floor(Math.random() * 100) + 1, // Random sample data
      }));

      setMapData(topology);
      setChartData(data);
    } catch (err) {
      console.error("Error loading map:", err);
      setError(err instanceof Error ? err.message : "Failed to load map data");
    } finally {
      setIsLoading(false);
    }
  };

  const changeMap = (mapOption: MapOption) => {
    setSelectedMap(mapOption);
    loadMapData(mapOption);
  };

  const getCurrentMapIndex = () => {
    return availableMaps.findIndex((map) => map.key === selectedMap().key);
  };

  const goToPreviousMap = () => {
    const currentIndex = getCurrentMapIndex();
    const prevIndex = currentIndex === 0 ? availableMaps.length - 1 : currentIndex - 1;
    const prevMap = availableMaps[prevIndex];
    if (prevMap) {
      changeMap(prevMap);
    }
  };

  const goToNextMap = () => {
    const currentIndex = getCurrentMapIndex();
    const nextIndex = currentIndex === availableMaps.length - 1 ? 0 : currentIndex + 1;
    const nextMap = availableMaps[nextIndex];
    if (nextMap) {
      changeMap(nextMap);
    }
  };

  // Create properly typed series configuration for Map charts
  const getSeriesConfig = (): Highcharts.SeriesOptionsType[] => {
    if (!mapData() || !chartData()) return [];

    return [
      {
        type: "map",
        name: "Sample Data",
        mapData: mapData() as object,
        data: chartData(),
        joinBy: ["hc-key", "hc-key"],
        dataLabels: {
          enabled: dataLabelsEnabled(),
          format: "{point.name}",
          style: {
            fontSize: "10px",
          },
        },
        borderColor: "#A0A0A0",
        borderWidth: 0.5,
        nullColor: "#f0f0f0",
        states: {
          hover: {
            color: "#BADA55",
          },
        },
      },
    ];
  };

  onMount(() => {
    if (availableMaps.length > 0) {
      loadMapData(availableMaps[0]!);
    }
  });

  return (
    <div class="p-6 space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 class="text-3xl font-bold text-gray-900">Map Charts</h1>
        <div class="flex gap-2 items-center">
          <button
            onClick={goToPreviousMap}
            disabled={isLoading()}
            class="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Previous map"
          >
            ←
          </button>
          <button
            onClick={goToNextMap}
            disabled={isLoading()}
            class="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Next map"
          >
            →
          </button>
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={dataLabelsEnabled()}
              onChange={(e) => setDataLabelsEnabled(e.target.checked)}
              class="rounded"
            />
            Data Labels
          </label>
        </div>
      </div>

      {/* Map Selection */}
      <div class="bg-white p-4 rounded-lg shadow">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Select Map ({getCurrentMapIndex() + 1} of {availableMaps.length}):
        </label>
        <div class="flex gap-2 flex-wrap">
          <For each={availableMaps}>
            {(mapOption) => (
              <button
                onClick={() => changeMap(mapOption)}
                disabled={isLoading()}
                class={`px-3 py-2 rounded text-sm transition-colors ${
                  selectedMap().key === mapOption.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {mapOption.name}
              </button>
            )}
          </For>
        </div>
        <p class="mt-2 text-sm text-gray-600">{selectedMap().description}</p>
      </div>

      {/* Chart Container */}
      <div class="bg-white p-6 rounded-lg shadow">
        {error() ? (
          <div class="flex items-center justify-center h-96">
            <div class="text-center">
              <div class="text-lg text-red-600 mb-2">⚠️ Error Loading Map</div>
              <div class="text-sm text-gray-600">{error()}</div>
              <button
                onClick={() => loadMapData(selectedMap())}
                class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        ) : isLoading() ? (
          <div class="flex items-center justify-center h-96">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
              <div class="text-lg text-gray-500">Loading {selectedMap().name}...</div>
            </div>
          </div>
        ) : mapData() ? (
          <MapChart
            accessibility={{
              enabled: true,
            }}
            title={{
              text: `${selectedMap().name} Map`,
              style: { fontSize: "18px" },
            }}
            subtitle={{
              text: "Interactive map with sample data - hover and click to explore",
            }}
            mapNavigation={{
              enabled: true,
              buttonOptions: {
                verticalAlign: "bottom",
                x: 10,
              },
            }}
            colorAxis={{
              min: 0,
              max: 100,
              stops: [
                [0, "#f7fbff"],
                [0.4, "#6baed6"],
                [0.8, "#2171b5"],
                [1, "#08306b"],
              ],
            }}
            legend={{
              enabled: true,
              title: {
                text: "Sample Values",
              },
              layout: "vertical",
              align: "left",
              verticalAlign: "bottom",
            }}
            tooltip={{
              backgroundColor: "white",
              borderWidth: 1,
              shadow: false,
              useHTML: true,
              padding: 10,
              pointFormat: "<b>{point.name}</b><br/>Value: <b>{point.value}</b>",
            }}
            plotOptions={{
              map: {
                dataLabels: {
                  enabled: dataLabelsEnabled(),
                },
              },
            }}
            series={getSeriesConfig()}
            onCreateChart={(chart) => {
              console.log(`${selectedMap().name} map created:`, chart);
            }}
            class="w-full"
            style={{ height: "500px" }}
          />
        ) : null}
      </div>

      {/* Chart Info */}
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Chart Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <strong>Current Map:</strong> {selectedMap().name}
          </div>
          <div>
            <strong>Data Points:</strong> {chartData().length || 0}
          </div>
          <div>
            <strong>Data Labels:</strong> {dataLabelsEnabled() ? "Enabled" : "Disabled"}
          </div>
          <div>
            <strong>Library:</strong> Highcharts Maps
          </div>
        </div>
        <div class="mt-4 p-3 bg-blue-50 rounded text-sm">
          <strong>Features:</strong> Real map data, multiple maps, navigation controls, data labels
          toggle, map navigation, color axis, hover states, tooltips, loading states
        </div>
        <div class="mt-2 p-3 bg-green-50 rounded text-sm">
          <strong>Data Source:</strong> Maps loaded from Highcharts CDN with dynamically generated
          sample data
        </div>
      </div>
    </div>
  );
};
