# @dschz/solid-highcharts

## 0.1.2

### Patch Changes

- adds jsr score badge to readme

## 0.1.1

### Patch Changes

- fixes readme typo

## 0.1.0 (2025-06-04)

### 🎉 Initial Release

This is the first stable release of `@dschz/solid-highcharts`, a comprehensive SolidJS wrapper for Highcharts that provides type-safe, reactive chart components.

### ✨ Features

- **📊 Complete Highcharts Support**: Factory functions for all Highcharts variants
  - `createChart()` - Standard charts (line, bar, pie, etc.)
  - `createStockChart()` - Financial and time-series data visualization
  - `createMapChart()` - Geographical data visualization
  - `createGanttChart()` - Project management and timeline visualization
- **🎯 Type-Safe**: Full TypeScript support with proper type inference
- **⚡ Reactive**: Seamless integration with SolidJS reactivity system
- **🧹 Lifecycle Management**: Automatic chart cleanup and memory management
- **📱 Responsive**: Built-in responsive chart behavior
- **🔄 Chart Updates**: Reactive updates when props change (with Gantt chart considerations)
- **🎨 Full Customization**: Complete access to all Highcharts configuration options
- **📦 ESM Ready**: Full support for Highcharts v12+ ESM imports

### 🔧 Core Components

- **Base Factory**: `createChartComponent()` - Low-level component factory
- **Chart Types**: Pre-configured factories for all Highcharts chart types
- **TypeScript Types**: Comprehensive type definitions for all chart variants
- **Props Interface**: Clean, extensible component props with callbacks and styling

### 🏗️ Architecture

- **Minimal Abstraction**: Direct mapping to Highcharts options API
- **Discrete Series Objects**: Type-safe patterns for dynamic chart types
- **Native Type Preservation**: Respects Highcharts' native type system
- **Modular Design**: Import only what you need

### 📚 Documentation

- **Comprehensive README**: Complete setup and usage guide
- **⚖️ Licensing Information**: Clear guidance on Highcharts commercial licensing
- **📦 Installation Guide**: Multiple package manager support (npm, yarn, pnpm, bun)
- **🔧 Configuration Examples**: Real-world usage patterns
- **📈 Performance Tips**: SolidJS-specific optimization guidance
- **🎨 Styling Guide**: CSS and theming examples
- **🧪 Testing Examples**: Unit and integration testing patterns

### 🎮 Playground & Examples

- **Interactive Playground**: Comprehensive demo application
- **Chart Showcase**: Examples for all chart types
  - Basic Charts (line, bar, area, pie with dynamic switching)
  - Stock Charts with real-time data simulation
  - Map Charts with real topology data and multiple regions
  - Gantt Charts with project timeline examples
- **Navigation**: Modern sidebar navigation with active state detection
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

### 🧪 Testing Infrastructure

- **Test Setup**: Vitest + jsdom configuration
- **Testing Library**: SolidJS testing library integration
- **Example Tests**: Component rendering and interaction tests
- **Mock Support**: Highcharts mocking patterns for unit tests

### 🔄 Highcharts v12+ Support

- **ESM Imports**: Recommended import patterns for Highcharts v12+
- **Legacy Compatibility**: Backward compatibility with pre-v12 UMD imports
- **Module Loading**: Proper side-effect import patterns for additional modules
- **Import Ordering**: Clear documentation on critical import sequence requirements

### 🐛 Known Limitations

- **Gantt Chart Reactivity**: Gantt charts are not reactive to prop changes due to Highcharts read-only property constraints
- **Import Ordering**: Highcharts modules must be imported after core module (documented)

### 💻 Development

- **Build System**: Vite-based build with TypeScript
- **Code Quality**: ESLint + Prettier configuration
- **Package Management**: Bun-optimized development workflow
- **CI/CD**: GitHub Actions workflow for testing and publishing

### 🔗 Dependencies

- **SolidJS**: ^1.8.0+ (peer dependency)
- **Highcharts**: 12.0.0+ (peer dependency)
- **TypeScript**: Full type support with strict mode

### 📄 License

- **Wrapper Library**: MIT License
- **Highcharts**: Commercial license required for commercial use (see documentation)
