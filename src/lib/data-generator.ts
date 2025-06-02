// Data generator for simulating real-time COVID-19 data

export interface CovidDataPoint {
  date: string;
  cases: number;
  deaths: number;
  recoveries: number;
  vaccinations: number;
}

export interface RegionalData {
  region: string;
  cases: number;
  deaths: number;
  recoveries: number;
  vaccinations: number;
}

export interface HeatMapDataPoint {
  id: number;
  region: string;
  intensity: number;
}

export interface CovidStatistics {
  totalCases: number;
  newCases: number;
  casesChange: number;
  totalDeaths: number;
  newDeaths: number;
  deathsChange: number;
  totalRecovered: number;
  recoveryRate: number;
  recoveryChange: number;
  activeCases: number;
  criticalCases: number;
  caseFatalityRate: number;
  vaccinations: {
    firstDose: number;
    secondDose: number;
    booster: number;
    totalDoses: number;
  };
  trends: {
    weeklyAverage: number;
    peakValue: number;
    peakDate: string;
    growthRate: number;
  };
}

// Base data to start with
const baseLineChartData: CovidDataPoint[] = [
  {
    date: "Jan 2020",
    cases: 1000,
    deaths: 50,
    recoveries: 200,
    vaccinations: 0,
  },
  {
    date: "Feb 2020",
    cases: 2000,
    deaths: 100,
    recoveries: 500,
    vaccinations: 0,
  },
  {
    date: "Mar 2020",
    cases: 5000,
    deaths: 300,
    recoveries: 1000,
    vaccinations: 0,
  },
  {
    date: "Apr 2020",
    cases: 10000,
    deaths: 700,
    recoveries: 3000,
    vaccinations: 0,
  },
  {
    date: "May 2020",
    cases: 15000,
    deaths: 1000,
    recoveries: 7000,
    vaccinations: 0,
  },
  {
    date: "Jun 2020",
    cases: 18000,
    deaths: 1200,
    recoveries: 10000,
    vaccinations: 0,
  },
  {
    date: "Jul 2020",
    cases: 20000,
    deaths: 1500,
    recoveries: 15000,
    vaccinations: 100,
  },
  {
    date: "Aug 2020",
    cases: 22000,
    deaths: 1700,
    recoveries: 18000,
    vaccinations: 500,
  },
  {
    date: "Sep 2020",
    cases: 23000,
    deaths: 1800,
    recoveries: 20000,
    vaccinations: 1000,
  },
  {
    date: "Oct 2020",
    cases: 25000,
    deaths: 1900,
    recoveries: 22000,
    vaccinations: 2000,
  },
  {
    date: "Nov 2020",
    cases: 30000,
    deaths: 2100,
    recoveries: 25000,
    vaccinations: 5000,
  },
  {
    date: "Dec 2020",
    cases: 35000,
    deaths: 2300,
    recoveries: 28000,
    vaccinations: 10000,
  },
];

const baseBarChartData: RegionalData[] = [
  {
    region: "North America",
    cases: 35000,
    deaths: 2300,
    recoveries: 28000,
    vaccinations: 15000,
  },
  {
    region: "Europe",
    cases: 40000,
    deaths: 3000,
    recoveries: 32000,
    vaccinations: 18000,
  },
  {
    region: "Asia",
    cases: 50000,
    deaths: 3500,
    recoveries: 40000,
    vaccinations: 20000,
  },
  {
    region: "South America",
    cases: 25000,
    deaths: 2000,
    recoveries: 20000,
    vaccinations: 12000,
  },
  {
    region: "Africa",
    cases: 15000,
    deaths: 1000,
    recoveries: 10000,
    vaccinations: 5000,
  },
  {
    region: "Oceania",
    cases: 5000,
    deaths: 300,
    recoveries: 4500,
    vaccinations: 3000,
  },
];

const baseHeatMapData: HeatMapDataPoint[] = [
  { id: 1, region: "North America", intensity: 70 },
  { id: 2, region: "Europe", intensity: 80 },
  { id: 3, region: "Asia", intensity: 90 },
  { id: 4, region: "South America", intensity: 60 },
  { id: 5, region: "Africa", intensity: 40 },
  { id: 6, region: "Oceania", intensity: 20 },
];

const baseStatistics: CovidStatistics = {
  totalCases: 768543210,
  newCases: 12453,
  casesChange: 2.3,
  totalDeaths: 6945321,
  newDeaths: 287,
  deathsChange: -1.8,
  totalRecovered: 741234567,
  recoveryRate: 96.4,
  recoveryChange: 0.5,
  activeCases: 20363322,
  criticalCases: 87654,
  caseFatalityRate: 0.9,
  vaccinations: {
    firstDose: 68.7,
    secondDose: 62.3,
    booster: 34.8,
    totalDoses: 13456789012,
  },
  trends: {
    weeklyAverage: 15432,
    peakValue: 3245678,
    peakDate: "2022-01-15",
    growthRate: -3.2,
  },
};

// Helper function to generate random fluctuation
const randomFluctuation = (base: number, percentage: number = 5): number => {
  const fluctuation = (Math.random() * 2 - 1) * ((base * percentage) / 100);
  return Math.max(0, Math.round(base + fluctuation));
};

// Function to generate updated line chart data
export const generateLineChartData = (): CovidDataPoint[] => {
  // Create a copy of the base data
  const updatedData = [...baseLineChartData];

  // Add more recent months with fluctuating data
  const months = [
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
  ];

  const lastEntry = updatedData[updatedData.length - 1];
  const lastDate = new Date(lastEntry.date);
  let year = lastDate.getFullYear();
  let month = lastDate.getMonth() + 1; // 0-based to 1-based

  // Add data for 2021-2023
  for (let i = 0; i < 36; i++) {
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }

    const prevEntry = updatedData[updatedData.length - 1];
    const newEntry = {
      date: `${months[month - 1]} ${year}`,
      cases: randomFluctuation(prevEntry.cases * 1.05),
      deaths: randomFluctuation(prevEntry.deaths * 1.02),
      recoveries: randomFluctuation(prevEntry.recoveries * 1.08),
      vaccinations:
        year >= 2021
          ? randomFluctuation(prevEntry.vaccinations * 1.15)
          : prevEntry.vaccinations,
    };

    updatedData.push(newEntry);
  }

  return updatedData;
};

// Function to generate updated bar chart data
export const generateBarChartData = (
  region: string = "global",
): RegionalData[] => {
  // Create a copy of the base data
  const updatedData = [...baseBarChartData];

  // Apply random fluctuations to each region
  return updatedData.map((item) => ({
    ...item,
    cases: randomFluctuation(item.cases),
    deaths: randomFluctuation(item.deaths),
    recoveries: randomFluctuation(item.recoveries),
    vaccinations: randomFluctuation(item.vaccinations),
  }));
};

// Function to generate updated heat map data
export const generateHeatMapData = (): HeatMapDataPoint[] => {
  // Create a copy of the base data
  const updatedData = [...baseHeatMapData];

  // Apply random fluctuations to intensity values
  return updatedData.map((item) => ({
    ...item,
    intensity: Math.min(
      100,
      Math.max(0, item.intensity + (Math.random() * 20 - 10)),
    ),
  }));
};

// Function to generate updated statistics
export const generateStatistics = (
  region: string = "global",
): CovidStatistics => {
  // Create a copy of the base statistics
  const updatedStats = { ...baseStatistics };

  // Apply random fluctuations to each statistic
  updatedStats.totalCases = randomFluctuation(updatedStats.totalCases, 1);
  updatedStats.newCases = randomFluctuation(updatedStats.newCases, 10);
  updatedStats.casesChange = parseFloat(
    (updatedStats.casesChange + (Math.random() * 1 - 0.5)).toFixed(1),
  );

  updatedStats.totalDeaths = randomFluctuation(updatedStats.totalDeaths, 0.5);
  updatedStats.newDeaths = randomFluctuation(updatedStats.newDeaths, 8);
  updatedStats.deathsChange = parseFloat(
    (updatedStats.deathsChange + (Math.random() * 1 - 0.5)).toFixed(1),
  );

  updatedStats.totalRecovered = randomFluctuation(
    updatedStats.totalRecovered,
    1,
  );
  updatedStats.recoveryRate = parseFloat(
    (updatedStats.recoveryRate + (Math.random() * 0.4 - 0.2)).toFixed(1),
  );
  updatedStats.recoveryChange = parseFloat(
    (updatedStats.recoveryChange + (Math.random() * 0.4 - 0.2)).toFixed(1),
  );

  updatedStats.activeCases = randomFluctuation(updatedStats.activeCases, 2);
  updatedStats.criticalCases = randomFluctuation(updatedStats.criticalCases, 3);
  updatedStats.caseFatalityRate = parseFloat(
    (updatedStats.caseFatalityRate + (Math.random() * 0.2 - 0.1)).toFixed(1),
  );

  updatedStats.vaccinations.firstDose = parseFloat(
    (updatedStats.vaccinations.firstDose + (Math.random() * 0.3 - 0.1)).toFixed(
      1,
    ),
  );
  updatedStats.vaccinations.secondDose = parseFloat(
    (
      updatedStats.vaccinations.secondDose +
      (Math.random() * 0.3 - 0.1)
    ).toFixed(1),
  );
  updatedStats.vaccinations.booster = parseFloat(
    (updatedStats.vaccinations.booster + (Math.random() * 0.4 - 0.1)).toFixed(
      1,
    ),
  );
  updatedStats.vaccinations.totalDoses = randomFluctuation(
    updatedStats.vaccinations.totalDoses,
    0.5,
  );

  updatedStats.trends.weeklyAverage = randomFluctuation(
    updatedStats.trends.weeklyAverage,
    5,
  );
  updatedStats.trends.peakValue = randomFluctuation(
    updatedStats.trends.peakValue,
    1,
  );
  updatedStats.trends.growthRate = parseFloat(
    (updatedStats.trends.growthRate + (Math.random() * 1 - 0.5)).toFixed(1),
  );

  return updatedStats;
};

// Function to format large numbers for display
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};
