import { A } from "@solidjs/router";

export const Home = () => {
  return (
    <div class="p-8 max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Solid Highcharts Playground</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore interactive examples of all Highcharts chart types integrated with SolidJS. Test
          the reactive capabilities and see the library in action.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <A
          href="/basic-charts"
          class="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500"
        >
          <div class="flex items-center mb-3">
            <span class="text-3xl mr-3">📊</span>
            <h2 class="text-2xl font-semibold text-gray-900">Basic Charts</h2>
          </div>
          <p class="text-gray-600 mb-4">
            Standard chart types including line, column, area, and pie charts with reactive data
            updates.
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Line</span>
            <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Column</span>
            <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Area</span>
            <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Pie</span>
          </div>
        </A>

        <A
          href="/stock-charts"
          class="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500"
        >
          <div class="flex items-center mb-3">
            <span class="text-3xl mr-3">📈</span>
            <h2 class="text-2xl font-semibold text-gray-900">Stock Charts</h2>
          </div>
          <p class="text-gray-600 mb-4">
            Financial charts with OHLC data, volume indicators, range selectors, and time-series
            navigation.
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Candlestick</span>
            <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Volume</span>
            <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Navigator</span>
          </div>
        </A>

        <A
          href="/map-charts"
          class="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500"
        >
          <div class="flex items-center mb-3">
            <span class="text-3xl mr-3">🗺️</span>
            <h2 class="text-2xl font-semibold text-gray-900">Map Charts</h2>
          </div>
          <p class="text-gray-600 mb-4">
            Geographic data visualization with choropleth maps, color scales, and interactive
            navigation.
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">Choropleth</span>
            <span class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">Color Scale</span>
            <span class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">Navigation</span>
          </div>
        </A>

        <A
          href="/gantt-charts"
          class="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-500"
        >
          <div class="flex items-center mb-3">
            <span class="text-3xl mr-3">📅</span>
            <h2 class="text-2xl font-semibold text-gray-900">Gantt Charts</h2>
          </div>
          <p class="text-gray-600 mb-4">
            Project timeline visualization with task dependencies, progress tracking, and milestone
            management.
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">
              Dependencies
            </span>
            <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Progress</span>
            <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Timeline</span>
          </div>
        </A>
      </div>

      <div class="bg-gray-100 rounded-lg p-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div class="flex items-start">
            <span class="text-green-500 mr-2">✓</span>
            <span>Reactive data updates with SolidJS signals</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-500 mr-2">✓</span>
            <span>Full TypeScript support and type safety</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-500 mr-2">✓</span>
            <span>Automatic cleanup and memory management</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-500 mr-2">✓</span>
            <span>All Highcharts configuration options available</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-500 mr-2">✓</span>
            <span>Chart callbacks and event handling</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-500 mr-2">✓</span>
            <span>Responsive design and mobile support</span>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-500">
          Navigate using the sidebar to explore each chart type in detail.
        </p>
      </div>
    </div>
  );
};
