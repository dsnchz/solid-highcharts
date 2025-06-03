import { Route, Router } from "@solidjs/router";
import { ErrorBoundary, For, type JSX, type ParentProps } from "solid-js";

import { Navbar } from "./Navbar";
import { BasicChart } from "./pages/BasicChart";
import { ErrorPage } from "./pages/Error";
import { GanttChartPage } from "./pages/GanttChart";
import { Home } from "./pages/Home";
import { MapChartPage } from "./pages/MapChart";
import { NotFound } from "./pages/NotFound";
import { StockChartPage } from "./pages/StockChart";

type Page = {
  readonly path: string;
  readonly component: () => JSX.Element;
};

const PAGES: readonly Page[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/basic-charts",
    component: BasicChart,
  },
  {
    path: "/stock-charts",
    component: StockChartPage,
  },
  {
    path: "/map-charts",
    component: MapChartPage,
  },
  {
    path: "/gantt-charts",
    component: GanttChartPage,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const MainContent = (props: ParentProps) => {
  return <main class="flex-1 overflow-auto bg-gray-50">{props.children}</main>;
};

const RootLayout = (props: ParentProps) => (
  <div id="root-screen" class="h-screen w-screen flex">
    <div class="w-80 h-full overflow-auto">
      <Navbar />
    </div>
    <MainContent>{props.children}</MainContent>
  </div>
);

export const App = () => {
  return (
    <ErrorBoundary fallback={(e, r) => <ErrorPage error={e} reset={r} />}>
      <Router root={RootLayout}>
        <For each={PAGES}>{(page) => <Route path={page.path} component={page.component} />}</For>
      </Router>
    </ErrorBoundary>
  );
};
