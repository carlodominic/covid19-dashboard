import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface FilterControlsProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  timeRange: [Date, Date];
  timeRangeType: "days" | "months" | "years";
  region: string;
  metrics: {
    cases: boolean;
    deaths: boolean;
    recoveries: boolean;
    vaccinations: boolean;
  };
  demographics: string;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  onFilterChange = () => {},
}) => {
  const [filters, setFilters] = useState<FilterState>({
    timeRange: [new Date(2019, 0, 1), new Date()],
    timeRangeType: "months",
    region: "global",
    metrics: {
      cases: true,
      deaths: true,
      recoveries: true,
      vaccinations: true,
    },
    demographics: "all",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [expanded, setExpanded] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setLastUpdated(new Date());
    }, 10000); // Update every 10 seconds

    return () => clearTimeout(timer);
  }, [lastUpdated]);

  const regions = [
    { value: "global", label: "Global" },
    { value: "us", label: "United States" },
    { value: "eu", label: "Europe" },
    { value: "asia", label: "Asia" },
    { value: "africa", label: "Africa" },
    { value: "sa", label: "South America" },
  ];

  const demographics = [
    { value: "all", label: "All Demographics" },
    { value: "age", label: "By Age Group" },
    { value: "gender", label: "By Gender" },
    { value: "income", label: "By Income Level" },
  ];

  const handleTimeRangeChange = (range: [Date, Date]) => {
    const newFilters = { ...filters, timeRange: range };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTimeRangeTypeChange = (value: string) => {
    const newFilters = {
      ...filters,
      timeRangeType: value as "days" | "months" | "years",
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRegionChange = (value: string) => {
    const newFilters = { ...filters, region: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDemographicsChange = (value: string) => {
    const newFilters = { ...filters, demographics: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleMetricToggle = (metric: keyof typeof filters.metrics) => {
    const newMetrics = {
      ...filters.metrics,
      [metric]: !filters.metrics[metric],
    };
    const newFilters = { ...filters, metrics: newMetrics };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRefreshData = () => {
    setIsUpdating(true);
    // Simulate data refresh
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsUpdating(false);
      onFilterChange(filters); // Trigger a refresh with current filters
    }, 500);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Calculate years for the slider
  const startYear = 2019;
  const currentYear = new Date().getFullYear();
  const yearRange = currentYear - startYear + 1;
  const sliderValue = [
    ((filters.timeRange[0].getFullYear() - startYear) / yearRange) * 100,
    ((filters.timeRange[1].getFullYear() - startYear) / yearRange) * 100,
  ];

  return (
    <div className="w-full bg-background rounded-lg border shadow-sm">
      {/* Header with toggle */}
      <div
        className="flex justify-between items-center p-4 border-b cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          <h3 className="text-lg font-medium">Filter Controls</h3>
          {expanded ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="mr-2 hidden sm:inline">
            Last updated: {format(lastUpdated, "HH:mm:ss")}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleRefreshData();
            }}
            disabled={isUpdating}
            className="flex items-center"
          >
            <RefreshCw
              className={`h-4 w-4 mr-1 ${isUpdating ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Collapsible content */}
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Time Range Section */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Time Range</Label>
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal truncate"
                    >
                      <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {format(filters.timeRange[0], "MMM d, yyyy")} -{" "}
                        {format(filters.timeRange[1], "MMM d, yyyy")}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="range"
                      defaultMonth={filters.timeRange[0]}
                      selected={{
                        from: filters.timeRange[0],
                        to: filters.timeRange[1],
                      }}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          handleTimeRangeChange([range.from, range.to]);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="pt-2">
                <Slider
                  defaultValue={sliderValue}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={(values) => {
                    const fromYear = Math.floor(
                      startYear + (values[0] / 100) * yearRange,
                    );
                    const toYear = Math.floor(
                      startYear + (values[1] / 100) * yearRange,
                    );
                    handleTimeRangeChange([
                      new Date(fromYear, 0, 1),
                      new Date(toYear, 11, 31),
                    ]);
                  }}
                />
              </div>
            </div>

            {/* Time Range Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Time Granularity</Label>
              <Tabs
                defaultValue={filters.timeRangeType}
                className="w-full"
                onValueChange={handleTimeRangeTypeChange}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="days">Days</TabsTrigger>
                  <TabsTrigger value="months">Months</TabsTrigger>
                  <TabsTrigger value="years">Years</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Region Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Region</Label>
              <Select
                defaultValue={filters.region}
                onValueChange={handleRegionChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Demographics */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Demographics</Label>
              <Select
                defaultValue={filters.demographics}
                onValueChange={handleDemographicsChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select demographics" />
                </SelectTrigger>
                <SelectContent>
                  {demographics.map((demo) => (
                    <SelectItem key={demo.value} value={demo.value}>
                      {demo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Metrics Toggles */}
          <div className="mt-4 pt-4 border-t">
            <Label className="text-sm font-medium">Metrics</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="cases"
                  checked={filters.metrics.cases}
                  onCheckedChange={() => handleMetricToggle("cases")}
                />
                <Label htmlFor="cases">Cases</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="deaths"
                  checked={filters.metrics.deaths}
                  onCheckedChange={() => handleMetricToggle("deaths")}
                />
                <Label htmlFor="deaths">Deaths</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="recoveries"
                  checked={filters.metrics.recoveries}
                  onCheckedChange={() => handleMetricToggle("recoveries")}
                />
                <Label htmlFor="recoveries">Recoveries</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="vaccinations"
                  checked={filters.metrics.vaccinations}
                  onCheckedChange={() => handleMetricToggle("vaccinations")}
                />
                <Label htmlFor="vaccinations">Vaccinations</Label>
              </div>
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="mt-4 flex justify-end">
            <Button variant="default" onClick={() => onFilterChange(filters)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;
