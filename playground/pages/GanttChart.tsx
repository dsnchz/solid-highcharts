// eslint-disable-next-line simple-import-sort/imports
import Highcharts from "highcharts/esm/highcharts-gantt";
import "highcharts/esm/modules/accessibility";

import { createSignal, For } from "solid-js";

import { createGanttChart } from "../../src/index";

const GanttChart = createGanttChart(Highcharts);

export const GanttChartPage = () => {
  const [selectedProject, setSelectedProject] = createSignal<"web" | "mobile" | "backend">("web");

  const projects = {
    web: {
      name: "Web Application Development",
      tasks: [
        {
          name: "Planning Phase",
          start: "2024-01-01",
          end: "2024-01-15",
          completed: 1,
          color: "#4CAF50",
        },
        {
          name: "Design System",
          start: "2024-01-10",
          end: "2024-02-05",
          completed: 0.8,
          dependency: "Planning Phase",
          color: "#2196F3",
        },
        {
          name: "Frontend Development",
          start: "2024-02-01",
          end: "2024-03-15",
          completed: 0.6,
          dependency: "Design System",
          color: "#FF9800",
        },
        {
          name: "Backend Integration",
          start: "2024-03-01",
          end: "2024-03-30",
          completed: 0.4,
          dependency: "Frontend Development",
          color: "#9C27B0",
        },
        {
          name: "Testing & QA",
          start: "2024-03-20",
          end: "2024-04-10",
          completed: 0.2,
          dependency: "Backend Integration",
          color: "#FF5722",
        },
        {
          name: "Deployment",
          start: "2024-04-05",
          end: "2024-04-15",
          completed: 0,
          dependency: "Testing & QA",
          color: "#607D8B",
        },
      ],
    },
    mobile: {
      name: "Mobile App Development",
      tasks: [
        {
          name: "Requirements Analysis",
          start: "2024-01-15",
          end: "2024-02-01",
          completed: 1,
          color: "#4CAF50",
        },
        {
          name: "UI/UX Design",
          start: "2024-02-01",
          end: "2024-02-20",
          completed: 0.9,
          dependency: "Requirements Analysis",
          color: "#2196F3",
        },
        {
          name: "iOS Development",
          start: "2024-02-15",
          end: "2024-04-01",
          completed: 0.5,
          dependency: "UI/UX Design",
          color: "#FF9800",
        },
        {
          name: "Android Development",
          start: "2024-02-15",
          end: "2024-04-01",
          completed: 0.5,
          dependency: "UI/UX Design",
          color: "#9C27B0",
        },
        {
          name: "Cross-platform Testing",
          start: "2024-03-20",
          end: "2024-04-15",
          completed: 0.1,
          dependency: "iOS Development",
          color: "#FF5722",
        },
      ],
    },
    backend: {
      name: "Backend Infrastructure",
      tasks: [
        {
          name: "Architecture Design",
          start: "2024-01-01",
          end: "2024-01-20",
          completed: 1,
          color: "#4CAF50",
        },
        {
          name: "Database Setup",
          start: "2024-01-15",
          end: "2024-02-10",
          completed: 0.8,
          dependency: "Architecture Design",
          color: "#2196F3",
        },
        {
          name: "API Development",
          start: "2024-02-05",
          end: "2024-03-20",
          completed: 0.6,
          dependency: "Database Setup",
          color: "#FF9800",
        },
        {
          name: "Authentication System",
          start: "2024-03-01",
          end: "2024-03-25",
          completed: 0.3,
          dependency: "API Development",
          color: "#9C27B0",
        },
        {
          name: "Performance Optimization",
          start: "2024-03-20",
          end: "2024-04-10",
          completed: 0.1,
          dependency: "Authentication System",
          color: "#FF5722",
        },
        {
          name: "Security Audit",
          start: "2024-04-05",
          end: "2024-04-20",
          completed: 0,
          dependency: "Performance Optimization",
          color: "#607D8B",
        },
      ],
    },
  };

  const currentProject = () => projects[selectedProject()];

  // Create properly typed series configuration for Gantt charts
  const getSeriesConfig = (): Highcharts.SeriesOptionsType[] => {
    const project = currentProject();

    return [
      {
        type: "gantt",
        name: "Tasks",
        data: project.tasks,
      },
    ];
  };

  return (
    <div class="p-6 space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 class="text-3xl font-bold text-gray-900">Gantt Charts</h1>
        <div class="flex gap-2">
          <For each={Object.keys(projects)}>
            {(projectKey) => (
              <button
                onClick={() => setSelectedProject(projectKey as keyof typeof projects)}
                class={`px-4 py-2 rounded transition-colors ${
                  selectedProject() === projectKey
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {projects[projectKey as keyof typeof projects].name.split(" ")[0]}
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Chart Container */}
      <div class="bg-white p-6 rounded-lg shadow">
        <GanttChart
          accessibility={{
            enabled: true,
          }}
          title={{ text: currentProject().name }}
          subtitle={{ text: "Project timeline with task dependencies" }}
          xAxis={[
            {
              min: "2024-01-01",
              max: "2024-05-01",
            },
          ]}
          plotOptions={{
            gantt: {
              dataLabels: {
                enabled: true,
                format: "{point.name}: {point.completed:%}",
              },
              tooltip: {
                pointFormat:
                  "<b>{point.name}</b><br/>Start: {point.start:%Y-%m-%d}<br/>End: {point.end:%Y-%m-%d}<br/>Progress: {point.completed:%}",
              },
            },
          }}
          series={getSeriesConfig()}
          onCreateChart={(chart) => {
            console.log("Gantt chart created:", chart);
          }}
          class="w-full"
          style={{ height: "400px" }}
        />
      </div>

      {/* Project Statistics */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Project Progress</h3>
          <div class="text-3xl font-bold text-blue-600">
            {Math.round(
              (currentProject().tasks.reduce((sum, task) => sum + task.completed, 0) /
                currentProject().tasks.length) *
                100,
            )}
            %
          </div>
          <div class="text-sm text-gray-500">Overall Completion</div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Total Tasks</h3>
          <div class="text-3xl font-bold text-green-600">{currentProject().tasks.length}</div>
          <div class="text-sm text-gray-500">
            {currentProject().tasks.filter((task) => task.completed === 1).length} completed
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Duration</h3>
          <div class="text-3xl font-bold text-purple-600">
            {Math.ceil((Date.UTC(2024, 4, 1) - Date.UTC(2024, 0, 1)) / (1000 * 60 * 60 * 24))}
          </div>
          <div class="text-sm text-gray-500">Days total</div>
        </div>
      </div>

      {/* Chart Info */}
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Chart Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <strong>Chart Type:</strong> Gantt
          </div>
          <div>
            <strong>Tasks:</strong> {currentProject().tasks.length}
          </div>
          <div>
            <strong>Project:</strong> {currentProject().name}
          </div>
          <div>
            <strong>Library:</strong> Highcharts Gantt
          </div>
        </div>
        <div class="mt-4 p-3 bg-blue-50 rounded text-sm">
          <strong>Features:</strong> Task dependencies, progress tracking, date ranges, grid lines,
          tooltips, data labels
        </div>
      </div>
    </div>
  );
};
