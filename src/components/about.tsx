import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const AboutPage = () => {
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
            <a href="/about" className="text-sm font-medium text-foreground">
              About
            </a>
            <a
              href="/resources"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Resources
            </a>
          </nav>
        </div>
      </header>

      <main className="container py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About This Dashboard</CardTitle>
            <CardDescription>
              Understanding the COVID-19 Data Visualization Project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
              <p className="text-muted-foreground">
                This COVID-19 Data Dashboard was created to provide accessible,
                interactive visualizations of pandemic data. Our goal is to help
                users understand the complex patterns and trends of the COVID-19
                pandemic through intuitive data representations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Interactive time-range selection from 2019 to present</li>
                <li>Regional data filtering and comparison</li>
                <li>
                  Multiple visualization types including line charts, bar
                  graphs, and heat maps
                </li>
                <li>Key statistical metrics and analysis</li>
                <li>Responsive design for all device types</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Data Sources</h3>
              <p className="text-muted-foreground">
                Our dashboard aggregates data from multiple reputable public
                health organizations and research institutions. For a complete
                list of our data sources with links, please visit our{" "}
                <a href="/resources" className="text-primary hover:underline">
                  Resources
                </a>{" "}
                page.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Methodology</h3>
              <p className="text-muted-foreground">
                The visualizations presented in this dashboard are based on
                publicly available data that has been processed and normalized
                to enable meaningful comparisons. We regularly update our data
                to ensure accuracy and relevance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
              <p className="text-muted-foreground">
                This dashboard is intended for informational purposes only and
                should not be used for medical diagnosis or treatment decisions.
                Always consult qualified healthcare professionals for medical
                advice.
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

export default AboutPage;
