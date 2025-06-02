import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ExternalLink } from "lucide-react";

const ResourcesPage = () => {
  const resources = [
    {
      name: "World Health Organization (WHO)",
      description:
        "Global COVID-19 situation reports, technical guidance, and public advice",
      url: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019",
    },
    {
      name: "Johns Hopkins University COVID-19 Dashboard",
      description:
        "Comprehensive global tracking of confirmed COVID-19 cases, deaths, and recoveries",
      url: "https://coronavirus.jhu.edu/map.html",
    },
    {
      name: "Our World in Data",
      description:
        "COVID-19 statistics, testing data, and vaccination progress across countries",
      url: "https://ourworldindata.org/coronavirus",
    },
    {
      name: "CDC COVID Data Tracker",
      description:
        "U.S. specific COVID-19 data including cases, deaths, testing, and vaccination",
      url: "https://covid.cdc.gov/covid-data-tracker",
    },
    {
      name: "European Centre for Disease Prevention and Control",
      description:
        "COVID-19 situation updates for the European Union and worldwide",
      url: "https://www.ecdc.europa.eu/en/covid-19",
    },
    {
      name: "COVID-19 Open Data Repository",
      description:
        "Open-source repository of COVID-19 data maintained by multiple organizations",
      url: "https://github.com/GoogleCloudPlatform/covid-19-open-data",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">
              COVID-19 Data Dashboard
            </h1>
          </div>
          <nav className="flex items-center gap-4">
            <a
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </a>
            <a
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              About
            </a>
            <a
              href="/resources"
              className="text-sm font-medium text-foreground"
            >
              Resources
            </a>
          </nav>
        </div>
      </header>

      <main className="container py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Data Resources</CardTitle>
            <CardDescription>
              Sources used for COVID-19 data collection and visualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Our dashboard aggregates and visualizes data from the following
              trusted sources. These organizations provide comprehensive,
              up-to-date information about the COVID-19 pandemic.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {resources.map((resource, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      {resource.name}
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                    >
                      Visit website
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Data Usage Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground">
                The data presented in this dashboard is sourced from the
                organizations listed above. While we strive to ensure accuracy,
                there may be discrepancies due to reporting delays, methodology
                differences, or data updates. This dashboard is updated
                regularly to reflect the most current information available from
                these sources.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} COVID-19 Data Dashboard. Data
              sourced from public health agencies.
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-center text-sm text-muted-foreground">
              For informational purposes only. Not for medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourcesPage;
