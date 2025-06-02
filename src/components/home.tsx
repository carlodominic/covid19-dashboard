import React, { useEffect } from "react";
import DashboardLayout from "./dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ThemeToggle } from "./ui/theme-toggle";
import { MobileNav } from "./ui/mobile-nav";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">
              COVID-19 Data Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <Tabs defaultValue="dashboard" className="w-[400px]">
                <TabsList>
                  <TabsTrigger
                    value="dashboard"
                    onClick={() => (window.location.href = "/")}
                  >
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger
                    value="about"
                    onClick={() => (window.location.href = "/about")}
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    value="resources"
                    onClick={() => (window.location.href = "/resources")}
                  >
                    Resources
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </nav>
            <ThemeToggle />
            <MobileNav currentPath="/" />
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>COVID-19 Pandemic Data Visualization</CardTitle>
              <CardDescription>
                Explore and analyze COVID-19 statistics across different regions
                and time periods. Use the filters below to customize your view.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This dashboard provides interactive visualizations of COVID-19
                data, including case trends, comparative analysis, and
                geographic distribution. Select different time ranges, regions,
                and metrics to explore the data in detail.
              </p>
            </CardContent>
          </Card>
        </div>

        <DashboardLayout />
      </main>

      <footer className="border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; Created by Carlo Dominic Suaybaguio | Data
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

export default HomePage;
