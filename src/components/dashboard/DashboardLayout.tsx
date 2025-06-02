import React, { useState, useEffect } from "react";
import FilterControls from "./FilterControls";
import VisualizationPanel from "./VisualizationPanel";
import StatisticsPanel from "./StatisticsPanel";
import {
  generateLineChartData,
  generateBarChartData,
  generateHeatMapData,
  generateStatistics,
  CovidDataPoint,
  RegionalData,
  HeatMapDataPoint,
  CovidStatistics,
} from "@/lib/data-generator";


interface DashboardLayoutProps {
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  className = "",
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState({
    start: new Date(2019, 0, 1),
    end: new Date(),
  });
  const [selectedRegion, setSelectedRegion] = useState("global");
  const [selectedMetrics, setSelectedMetrics] = useState({
    cases: true,
    deaths: true,
    recoveries: true,
    vaccinations: true,
  });

  // State for data
  const [lineChartData, setLineChartData] = useState<CovidDataPoint[]>([]);
  const [barChartData, setBarChartData] = useState<RegionalData[]>([]);
  const [heatMapData, setHeatMapData] = useState<HeatMapDataPoint[]>([]);
  const [statistics, setStatistics] = useState<CovidStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate initial data
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);

      // Simulate API delay
      setTimeout(() => {
        setLineChartData(generateLineChartData());
        setBarChartData(generateBarChartData(selectedRegion));
        setHeatMapData(generateHeatMapData());
        setStatistics(generateStatistics(selectedRegion));
        setIsLoading(false);
      }, 500);
    };

    fetchData();

    // Set up interval for real-time updates
    const intervalId = setInterval(() => {
      setBarChartData(generateBarChartData(selectedRegion));
      setHeatMapData(generateHeatMapData());
      setStatistics(generateStatistics(selectedRegion));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Update data when filters change
  useEffect(() => {
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setBarChartData(generateBarChartData(selectedRegion));
      setHeatMapData(generateHeatMapData());
      setStatistics(generateStatistics(selectedRegion));
      setIsLoading(false);
    }, 300);
  }, [selectedRegion, selectedTimeRange, selectedMetrics]);

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    if (filters.timeRange) {
      setSelectedTimeRange({
        start: filters.timeRange[0],
        end: filters.timeRange[1],
      });
    }

    if (filters.region) {
      setSelectedRegion(filters.region);
    }

    if (filters.metrics) {
      setSelectedMetrics(filters.metrics);
    }
  };

  // Convert selected metrics object to array for components
  const activeMetrics = Object.entries(selectedMetrics)
    .filter(([_, isActive]) => isActive)
    .map(([metric]) => metric);

  return (
    <div className={`flex flex-col w-full h-full bg-background text-foreground ${className}`}>
      {/* Filter Controls Section */}
      <div className="w-full p-4 border-b">
        <FilterControls onFilterChange={handleFilterChange} />
      </div>

      {/* Main Content Area - Responsive Layout */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Visualization Panel - Takes more space */}
        <div className="w-full lg:w-3/4 p-4 overflow-auto">
          <VisualizationPanel
            selectedRegion={selectedRegion}
            selectedTimeRange={[selectedTimeRange.start, selectedTimeRange.end]}
            selectedMetrics={activeMetrics}
            lineChartData={lineChartData}
            barChartData={barChartData}
            heatMapData={heatMapData}
            isLoading={isLoading}
          />
        </div>

        {/* Statistics Panel - Takes less space */}
        <div className="w-full lg:w-1/4 p-4 border-t lg:border-t-0 lg:border-l overflow-auto">
          <StatisticsPanel
            region={selectedRegion}
            timeRange={[selectedTimeRange.start, selectedTimeRange.end]}
            metrics={activeMetrics}
            statistics={statistics}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
