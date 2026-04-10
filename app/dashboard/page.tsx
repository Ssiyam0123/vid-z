"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { MetricsCard } from "@/components/dashboard/MetricsCards";
import { Film, RefreshCw, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {greeting}, {user?.firstName || "Creator"}!
        </h1>
        <p className="text-muted-foreground mt-2">Here's a quick overview of your content performance.</p>
      </div>

      {/* Metrics Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard 
          title="Total Active Series" 
          value={12} 
          icon={Film} 
          trend={{ value: 15, isUp: true }}
          description="vs last month"
        />
        <MetricsCard 
          title="Content Views" 
          value="45.2K" 
          icon={Users} 
          trend={{ value: 8.4, isUp: true }}
          description="vs last month"
        />
        <MetricsCard 
          title="Average Rating" 
          value="4.8" 
          icon={Star} 
          trend={{ value: 0.2, isUp: false }}
          description="vs last month"
        />
        <MetricsCard 
          title="Pending Render" 
          value={3} 
          icon={RefreshCw} 
          description="In rendering queue"
        />
      </div>

      {/* Recent Activity Placeholder Area */}
      <div className="mt-8 bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Content Pipeline</h2>
          <button className="text-sm font-medium text-cyan-500 hover:text-cyan-400">View all</button>
        </div>
        <div className="p-8 text-center bg-accent/20">
          <p className="text-muted-foreground">Your recent schedule and activities will appear here.</p>
          <button className="mt-4 px-4 py-2 bg-background border border-border shadow-sm text-foreground font-medium rounded-lg hover:bg-accent hover:text-foreground transition-colors">
            + Create New Series
          </button>
        </div>
      </div>
    </div>
  );
}
