import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";

import Header from "@/components/layout/header";
import TabBar from "@/components/layout/tab-bar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Stats from "@/pages/stats";
import Calendar from "@/pages/calendar";
import Learn from "@/pages/learn";

function Router() {
  const [location] = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-20 md:pb-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/stats" component={Stats} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/learn" component={Learn} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <TabBar currentPath={location} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
