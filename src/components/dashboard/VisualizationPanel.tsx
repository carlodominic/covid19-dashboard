import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MapPin, Loader2 } from "lucide-react";
import { formatNumber } from "@/lib/data-generator";
import {
  CovidDataPoint,
  RegionalData,
  HeatMapDataPoint,
} from "@/lib/data-generator";

interface VisualizationPanelProps {
  selectedRegion?: string;
  selectedTimeRange?: [Date, Date];
  selectedMetrics?: string[];
  selectedDemographics?: string[];
  lineChartData?: CovidDataPoint[];
  barChartData?: RegionalData[];
  heatMapData?: HeatMapDataPoint[];
  isLoading?: boolean;
}

const VisualizationPanel = ({
  selectedRegion = "global",
  selectedTimeRange = [new Date(2019, 0, 1), new Date()],
  selectedMetrics = ["cases", "deaths", "recoveries", "vaccinations"],
  selectedDemographics = ["all"],
  lineChartData = [],
  barChartData = [],
  heatMapData = [],
  isLoading = false,
}: VisualizationPanelProps) => {
  const [activeTab, setActiveTab] = useState("line");

  // Filter line chart data based on selected time range
  const filteredLineChartData = lineChartData.filter((dataPoint) => {
    const dateParts = dataPoint.date.split(" ");
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].indexOf(dateParts[0]);
    const year = parseInt(dateParts[1]);
    const dataDate = new Date(year, month, 1);

    return dataDate >= selectedTimeRange[0] && dataDate <= selectedTimeRange[1];
  });

  // Custom tooltip formatter to display formatted numbers
  // Custom tooltip formatter to display formatted numbers
  const customTooltipFormatter = (value: number | string) => {
    return formatNumber(Number(value));
  };
  // Custom Y-axis tick formatter
  const formatYAxis = (value: number) => {
    return formatNumber(value);
  };

  // Chart color palettes (use Tailwind colors for consistency)
  const chartColors = {
    cases: "#4f46e5", // indigo-700
    deaths: "#dc2626", // red-600
    recoveries: "#16a34a", // green-600
    vaccinations: "#fbbf24", // yellow-400
    grid: "#e5e7eb", // zinc-200
    legend: "var(--foreground)",
    heatmapLow: "#fff",
    heatmapHigh: "#dc2626",
    heatmapText: (intensity: number) => (intensity > 50 ? "#fff" : "#000"),
  };

  return (
    <Card className="w-full h-full bg-background text-foreground">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          COVID-19 Data Visualization -{" "}
          {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading data...</span>
          </div>
        ) : (
          <Tabs
            defaultValue="line"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4 flex flex-wrap">
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="area">Area Chart</TabsTrigger>
              <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
            </TabsList>

            <TabsContent value="line" className="w-full h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredLineChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    stroke={chartColors.grid}
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    interval={Math.ceil(filteredLineChartData.length / 12)}
                  />
                  <YAxis tickFormatter={formatYAxis} width={60} />
                  <Tooltip formatter={customTooltipFormatter} />
                  <Legend />
                  {selectedMetrics.includes("cases") && (
                    <Line
                      type="monotone"
                      dataKey="cases"
                      name="Cases"
                      stroke={chartColors.cases}
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  )}
                  {selectedMetrics.includes("deaths") && (
                    <Line
                      type="monotone"
                      dataKey="deaths"
                      name="Deaths"
                      stroke={chartColors.deaths}
                      strokeWidth={2}
                    />
                  )}
                  {selectedMetrics.includes("recoveries") && (
                    <Line
                      type="monotone"
                      dataKey="recoveries"
                      name="Recoveries"
                      stroke={chartColors.recoveries}
                      strokeWidth={2}
                    />
                  )}
                  {selectedMetrics.includes("vaccinations") && (
                    <Line
                      type="monotone"
                      dataKey="vaccinations"
                      name="Vaccinations"
                      stroke={chartColors.vaccinations}
                      strokeWidth={2}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="bar" className="w-full h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    stroke={chartColors.grid}
                    strokeDasharray="3 3"
                  />
                  <XAxis dataKey="region" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={formatYAxis} width={60} />
                  <Tooltip formatter={customTooltipFormatter} />
                  <Legend />
                  {selectedMetrics.includes("cases") && (
                    <Bar dataKey="cases" name="Cases" fill={chartColors.cases} />
                  )}
                  {selectedMetrics.includes("deaths") && (
                    <Bar dataKey="deaths" name="Deaths" fill={chartColors.deaths} />
                  )}
                  {selectedMetrics.includes("recoveries") && (
                    <Bar
                      dataKey="recoveries"
                      name="Recoveries"
                      fill={chartColors.recoveries}
                    />
                  )}
                  {selectedMetrics.includes("vaccinations") && (
                    <Bar
                      dataKey="vaccinations"
                      name="Vaccinations"
                      fill={chartColors.vaccinations}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="area" className="w-full h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredLineChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    stroke={chartColors.grid}
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    interval={Math.ceil(filteredLineChartData.length / 12)}
                  />
                  <YAxis tickFormatter={formatYAxis} width={60} />
                  <Tooltip formatter={customTooltipFormatter} />
                  <Legend />
                  {selectedMetrics.includes("cases") && (
                    <Area
                      type="monotone"
                      dataKey="cases"
                      name="Cases"
                      stackId="1"
                      stroke={chartColors.cases}
                      fill={chartColors.cases}
                      fillOpacity={0.6}
                    />
                  )}
                  {selectedMetrics.includes("deaths") && (
                    <Area
                      type="monotone"
                      dataKey="deaths"
                      name="Deaths"
                      stackId="1"
                      stroke={chartColors.deaths}
                      fill={chartColors.deaths}
                      fillOpacity={0.6}
                    />
                  )}
                  {selectedMetrics.includes("recoveries") && (
                    <Area
                      type="monotone"
                      dataKey="recoveries"
                      name="Recoveries"
                      stackId="1"
                      stroke={chartColors.recoveries}
                      fill={chartColors.recoveries}
                      fillOpacity={0.6}
                    />
                  )}
                  {selectedMetrics.includes("vaccinations") && (
                    <Area
                      type="monotone"
                      dataKey="vaccinations"
                      name="Vaccinations"
                      stackId="1"
                      stroke={chartColors.vaccinations}
                      fill={chartColors.vaccinations}
                      fillOpacity={0.6}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="heatmap" className="w-full h-[500px]">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {heatMapData.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg flex items-center justify-between"
                      style={{
                        background: `rgba(220,38,38,${item.intensity / 100})`,
                        color: chartColors.heatmapText(item.intensity),
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <div className="flex items-center truncate mr-2">
                        <MapPin className="mr-2 flex-shrink-0" />
                        <span className="truncate">{item.region}</span>
                      </div>
                      <div className="font-bold whitespace-nowrap">
                        {Math.round(item.intensity)}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 w-full flex justify-center">
                  <div
                    className="w-3/4 h-6 rounded-md"
                    style={{
                      background: `linear-gradient(90deg, #fff, #dc2626)`,
                    }}
                  ></div>
                </div>
                <div className="w-3/4 flex justify-between mt-1">
                  <span className="text-xs">Low</span>
                  <span className="text-xs">High</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default VisualizationPanel;
