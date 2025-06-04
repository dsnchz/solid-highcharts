<p align="center">
  <img width="100%" src="https://assets.solidjs.com/banner?type=Ecosystem&background=tiles&project=solid-highcharts" alt="solid-highcharts">
</p>

# @dschz/solid-highcharts

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Highcharts](https://img.shields.io/badge/highcharts-12.0.0+-orange?style=flat-square)](https://github.com/highcharts/highcharts)
[![npm version](https://img.shields.io/npm/v/@dschz/solid-highcharts?color=blue)](https://www.npmjs.com/package/@dschz/solid-highcharts)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@dschz/solid-highcharts)](https://bundlephobia.com/package/@dschz/solid-highcharts)
[![CI](https://github.com/dsnchz/solid-highcharts/actions/workflows/ci.yaml/badge.svg)](https://github.com/dsnchz/solid-highcharts/actions/workflows/ci.yaml)
[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?logo=discord&logoColor=white)](https://discord.gg/yVBGJfTfQy)

A comprehensive SolidJS wrapper for [Highcharts](https://www.highcharts.com/) that provides type-safe, reactive chart components with proper lifecycle management.

## ✨ Features

- 🎯 **Type-Safe**: Full TypeScript support with proper type inference
- ⚡ **Reactive**: Seamless integration with SolidJS reactivity system
- 🏗️ **Modular**: Support for all Highcharts variants (Core, Stock, Maps, Gantt)
- 🧹 **Clean**: Automatic cleanup and memory management
- 📱 **Responsive**: Built-in responsive chart behavior
- 🎨 **Customizable**: Full access to Highcharts configuration options

## ⚖️ Licensing

**Important**: This wrapper library (`@dschz/solid-highcharts`) is MIT licensed, but **Highcharts itself is a commercial product** that requires a license for most use cases.

### Highcharts Licensing

- 🏢 **Commercial Use**: Requires a [Highcharts license](https://shop.highcharts.com/) for commercial projects
- 🎓 **Non-Commercial**: Free for personal projects, school websites, and non-profit organizations
- 🧪 **Evaluation**: Free for testing and evaluation purposes

### License Requirements by Use Case

| Use Case                         | Highcharts License Required |
| -------------------------------- | --------------------------- |
| Personal/hobby projects          | ❌ **Free**                 |
| Educational/school websites      | ❌ **Free**                 |
| Non-profit organizations         | ❌ **Free**                 |
| Commercial websites/applications | ✅ **License Required**     |
| SaaS products                    | ✅ **License Required**     |
| Products for sale                | ✅ **License Required**     |

📋 **Before using Highcharts in your project**, please review the [official Highcharts license terms](https://www.highcharts.com/products/highcharts/#non-commercial) to determine if you need to purchase a license.

This wrapper library simply provides SolidJS integration - all Highcharts licensing terms apply to your usage of the underlying Highcharts library.

## 📦 Installation

```bash
# Using npm
npm install highcharts @dschz/solid-highcharts

# Using yarn
yarn install highcharts @dschz/solid-highcharts

# Using pnpm
pnpm install highcharts @dschz/solid-highcharts

# Using bun
bun install highcharts @dschz/solid-highcharts
```

### Highcharts Module Usage

All Highcharts functionality is available from the single `highcharts` package via different import paths.

**⚠️ Important: Import order matters!** Highcharts modules must be imported after the core module.

**📦 Highcharts v12+**: As of Highcharts version 12, you should use ESM import paths for better compatibility and tree-shaking. The examples below show the recommended ESM imports.

```tsx
// Core Highcharts (standard charts) - ESM import
import Highcharts from "highcharts/esm/highcharts";

// Stock Charts (financial/time-series data) - ESM import
import HighchartsStock from "highcharts/esm/highstock";

// Maps (geographical data) - ESM import
import HighchartsMaps from "highcharts/esm/highmaps";

// Gantt Charts (project timelines) - ESM import
import HighchartsGantt from "highcharts/esm/highcharts-gantt";

// Additional modules (optional) -- ORDER MATTERS! MUST BE IMPORTED AFTER Highcharts IMPORT!
import "highcharts/esm/modules/accessibility";
import "highcharts/esm/modules/exporting";
import "highcharts/esm/modules/export-data";
```

See this [post](https://www.highcharts.com/docs/getting-started/version-12) for more details.

**Legacy UMD imports** (pre-v12) are still supported but ESM is recommended:

```tsx
// Legacy UMD imports (still works but not recommended)
import Highcharts from "highcharts";
import HighchartsStock from "highcharts/highstock";
import HighchartsMaps from "highcharts/highmaps";
import HighchartsGantt from "highcharts/highcharts-gantt";

// Additional modules (optional) -- ORDER MATTERS! MUST BE IMPORTED AFTER Highcharts IMPORT!
import "highcharts/modules/accessibility";
import "highcharts/modules/exporting";
import "highcharts/modules/export-data";
```

### API Quick Start

This library exposes four factory functions that create the Highcharts components to use in your Solid application.

#### Basic Chart

```tsx
import Highcharts from "highcharts/esm/highcharts";
import { createChart } from "@dschz/solid-highcharts";

// Highcharts Chart component
const Chart = createChart(Highcharts);
```

#### Stock Chart

```tsx
// To create a StockChart
import Highcharts from "highcharts/esm/highstock";
import { createStockChart } from "@dschz/solid-highcharts";

// Highcharts StockChart component
const StockChart = createStockChart(Highcharts);
```

#### Map Chart

```tsx
// To create a MapChart
import Highcharts from "highcharts/esm/highmaps";
import { createMapChart } from "@dschz/solid-highcharts";

// Highcharts MapChart component
const MapChart = createMapChart(Highcharts);
```

#### Gantt Chart

```tsx
// To create a GanttChart
import Highcharts from "highcharts/esm/highcharts-gantt";
import { createGanttChart } from "@dschz/solid-highcharts";

// Highcharts GanttChart component
const GanttChart = createGanttChart(Highcharts);
```

#### Accessibility / Exporting Modules

For additional modules like `exporting` and `accessibility`, you simply import them to register with Highcharts:

```tsx
import Highcharts from "highcharts/esm/highcharts";
import "highcharts/esm/modules/accessibility";
import "highcharts/esm/modules/exporting";
import "highcharts/esm/modules/export-data";

import { createChart } from "@dschz/solid-highcharts";

const Chart = createChart(Highcharts);
```

**Note**: You may need to disable import sorting rules (like `simple-import-sort` or Prettier) for these imports to prevent automatic reordering that would break functionality as the additional modules must be imported **AFTER** the target Highcharts module import.

## 🔧 Component Props

All chart components returned from the factory functions accept the same props interface:

```tsx
type HighchartOptions = Highcharts.Options & {
  animation?: boolean | Partial<AnimationOptionsObject>;
};

type HighchartsComponentProps = HighchartOptions & {
  /** CSS class for container */
  class?: string;

  /** CSS styles for container */
  style?: JSX.CSSProperties;

  /** Access to container element */
  ref?: (container: HTMLDivElement) => void;

  /** Callback when chart is created */
  onCreateChart?: (chart: Highcharts.Chart) => void;
};
```

### Props Examples

```tsx
// Basic styling
<Chart
  class="my-chart"
  style={{ height: '400px', border: '1px solid #ccc' }}
  title={{ text: 'Styled Chart' }}
  series={[{ type: 'line', data: [1, 2, 3] }]}
/>

// Chart reference and callbacks
<Chart
  ref={(container) => console.log('Container:', container)}
  onCreateChart={(chart) => {
    // Access chart instance
    chart.setTitle({ text: 'Updated Title' });

    // Add custom event listeners
    chart.container.addEventListener('click', () => {
      console.log('Chart clicked!');
    });
  }}
  series={[{ type: 'line', data: [1, 2, 3] }]}
/>
```

## 🎨 Styling and Theming

### CSS Styling

```css
/* Global chart container styles */
.highcharts-container {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Custom chart class */
.my-chart {
  background: #f5f5f5;
  padding: 16px;
}

/* Responsive behavior */
.chart-responsive {
  width: 100%;
  height: 400px;
  min-height: 300px;
}

@media (max-width: 768px) {
  .chart-responsive {
    height: 300px;
  }
}
```

### Highcharts Theming

```tsx
import Highcharts from "highcharts/esm/highcharts";
import { createChart } from "@dschz/solid-highcharts";

// Apply global theme
Highcharts.setOptions({
  colors: ["#058DC7", "#50B432", "#ED561B", "#DDDF00"],
  chart: {
    backgroundColor: "#f9f9f9",
    style: {
      fontFamily: "Inter, sans-serif",
    },
  },
  title: {
    style: {
      color: "#333",
      fontSize: "18px",
    },
  },
});

const Chart = createChart(Highcharts);
```

## 📈 Performance Tips

### 1. Use Chart Boost for Large Datasets

```tsx
import Highcharts from "highcharts/esm/highcharts";
import "highcharts/esm/modules/boost";

<Chart
  boost={{
    useGPUTranslations: true,
    seriesThreshold: 50,
  }}
  series={[
    {
      type: "line",
      data: largeDataset, // 1000+ points
      boostThreshold: 100,
    },
  ]}
/>;
```

## 🤝 Contributing

All contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/dsnchz/solid-highcharts.git
cd solid-highcharts

# Install dependencies
bun install

# Run tests
bun test

# Build the library
bun run build

# Start development server
bun start
```

## 📄 License

MIT © [Daniel Sanchez](https://github.com/dsnchz)
