import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PercentIcon,
  ActivityIcon,
  UsersIcon,
  HeartPulseIcon,
  Loader2,
} from "lucide-react";
import { formatNumber } from "@/lib/data-generator";
import { CovidStatistics } from "@/lib/data-generator";

interface StatisticCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  description?: string;
}

const StatisticCard = ({
  title,
  value,
  change = 0,
  icon,
  description,
}: StatisticCardProps) => {
  const isPositive = change > 0;

  return (
    <Card className="bg-background text-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold truncate">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {change !== 0 && (
            <>
              {isPositive ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500 flex-shrink-0" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-rose-500 flex-shrink-0" />
              )}
              <span
                className={isPositive ? "text-emerald-500" : "text-rose-500"}
              >
                {Math.abs(change)}%
              </span>
            </>
          )}
          {description && <span className="ml-1 truncate">{description}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

interface VaccinationProgressProps {
  title: string;
  percentage: number;
  doses?: number;
}

const VaccinationProgress = ({
  title,
  percentage,
  doses,
}: VaccinationProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{percentage}%</div>
      </div>
      <Progress value={percentage} className="h-2" />
      {doses && (
        <div className="text-xs text-muted-foreground truncate">
          {formatNumber(doses)} doses administered
        </div>
      )}
    </div>
  );
};

interface StatisticsPanelProps {
  region?: string;
  timeRange?: [Date, Date];
  metrics?: string[];
  statistics?: CovidStatistics | null;
  isLoading?: boolean;
}

const StatisticsPanel = ({
  region = "global",
  timeRange,
  metrics = ["cases", "deaths", "recoveries", "vaccinations"],
  statistics = null,
  isLoading = false,
}: StatisticsPanelProps) => {
  if (isLoading) {
    return (
      <div className="h-full w-full overflow-auto rounded-xl border bg-background text-foreground p-4 shadow-sm flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading statistics...</span>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="h-full w-full overflow-auto rounded-xl border bg-background text-foreground p-4 shadow-sm flex items-center justify-center">
        <span>No data available</span>
      </div>
    );
  }

  const formattedRegion = region.charAt(0).toUpperCase() + region.slice(1);

  return (
    <div className="h-full w-full overflow-auto rounded-xl border bg-background text-foreground p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        {formattedRegion} Statistics
      </h2>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="vaccination">Vaccination</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <StatisticCard
              title="Total Cases"
              value={formatNumber(statistics.totalCases)}
              change={statistics.casesChange}
              icon={<ActivityIcon className="h-4 w-4" />}
              description="since last period"
            />

            <StatisticCard
              title="Total Deaths"
              value={formatNumber(statistics.totalDeaths)}
              change={statistics.deathsChange}
              icon={<HeartPulseIcon className="h-4 w-4" />}
              description="since last period"
            />

            <StatisticCard
              title="Recovery Rate"
              value={`${statistics.recoveryRate}%`}
              change={statistics.recoveryChange}
              icon={<PercentIcon className="h-4 w-4" />}
              description="of total cases"
            />

            <StatisticCard
              title="Active Cases"
              value={formatNumber(statistics.activeCases)}
              icon={<UsersIcon className="h-4 w-4" />}
              description={`${formatNumber(statistics.criticalCases)} critical`}
            />
          </div>

          <Card className="bg-background text-foreground">
            <CardHeader>
              <CardTitle>Case Fatality Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">
                  {statistics.caseFatalityRate}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Deaths per 100 confirmed cases
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <StatisticCard
              title="Weekly Average"
              value={formatNumber(statistics.trends.weeklyAverage)}
              icon={<TrendingUpIcon className="h-4 w-4" />}
              description="new cases per day"
            />

            <StatisticCard
              title="Peak Value"
              value={formatNumber(statistics.trends.peakValue)}
              icon={<TrendingUpIcon className="h-4 w-4" />}
              description={`on ${statistics.trends.peakDate}`}
            />

            <StatisticCard
              title="Growth Rate"
              value={`${Math.abs(statistics.trends.growthRate)}%`}
              change={statistics.trends.growthRate}
              icon={
                statistics.trends.growthRate > 0 ? (
                  <TrendingUpIcon className="h-4 w-4" />
                ) : (
                  <TrendingDownIcon className="h-4 w-4" />
                )
              }
              description="week over week"
            />
          </div>

          <Card className="bg-background text-foreground">
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {statistics.trends.growthRate > 0
                  ? "Cases are increasing compared to the previous period. Continued vigilance is recommended."
                  : "Cases are decreasing compared to the previous period, showing positive progress in containment efforts."}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccination" className="space-y-6 pt-4">
          <Card className="bg-background text-foreground">
            <CardHeader>
              <CardTitle>Vaccination Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <VaccinationProgress
                title="First Dose"
                percentage={statistics.vaccinations.firstDose}
                doses={Math.round(statistics.vaccinations.totalDoses * 0.45)}
              />

              <VaccinationProgress
                title="Second Dose"
                percentage={statistics.vaccinations.secondDose}
                doses={Math.round(statistics.vaccinations.totalDoses * 0.4)}
              />

              <VaccinationProgress
                title="Booster Dose"
                percentage={statistics.vaccinations.booster}
                doses={Math.round(statistics.vaccinations.totalDoses * 0.15)}
              />

              <div className="mt-4 text-center text-sm text-muted-foreground">
                Total doses administered:{" "}
                <span className="font-medium">
                  {formatNumber(statistics.vaccinations.totalDoses)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background text-foreground">
            <CardHeader>
              <CardTitle>Vaccination Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Higher vaccination rates correlate with lower hospitalization
                rates and reduced severity of symptoms in breakthrough cases.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatisticsPanel;
