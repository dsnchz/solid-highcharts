import { A, useLocation } from "@solidjs/router";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path;
  };

  const getLinkClass = (path: string) => {
    const baseClass = "block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors";
    if (isActive(path)) {
      return `${baseClass} bg-gray-700 text-white`;
    }
    return `${baseClass} text-gray-300 hover:text-white`;
  };

  return (
    <nav class="bg-gray-800 text-white h-full flex flex-col">
      <div class="px-4 py-3 border-b border-gray-700">
        <div class="text-xl font-bold">Solid Highcharts Playground</div>
        <div class="text-sm text-gray-300">Interactive examples of all chart types</div>
      </div>

      <div class="p-4 space-y-2 flex-1">
        <A href="/" class={getLinkClass("/")}>
          🏠 Home
        </A>

        <A href="/basic-charts" class={getLinkClass("/basic-charts")}>
          📊 Basic Charts
        </A>

        <A href="/stock-charts" class={getLinkClass("/stock-charts")}>
          📈 Stock Charts
        </A>

        <A href="/map-charts" class={getLinkClass("/map-charts")}>
          🗺️ Map Charts
        </A>

        <A href="/gantt-charts" class={getLinkClass("/gantt-charts")}>
          📅 Gantt Charts
        </A>
      </div>

      <div class="p-4 border-t border-gray-700 mt-auto">
        <div class="text-xs text-gray-400">Built with SolidJS + Highcharts</div>
      </div>
    </nav>
  );
};
