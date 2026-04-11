"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { MetricsCard } from "@/components/dashboard/MetricsCards";
import { Film, RefreshCw, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [seriesList, setSeriesList] = useState<any[]>([]);
  const [loadingSeries, setLoadingSeries] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const fetchSeries = async () => {
      try {
        const res = await fetch("/api/series");
        const data = await res.json();
        if (data.success) {
          setSeriesList(data.series);
        } else {
          console.error("Failed to fetch series:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch series:", error);
      } finally {
        setLoadingSeries(false);
      }
    };

    fetchSeries();
  }, []);

  // Dashobard now lists Series wrappers. In-depth tracking occurs on /dashboard/videos/[id]

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

      {/* Series List */}
      <div className="mt-8 bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Content Pipeline</h2>
          <Link href="/dashboard/create">
            <button className="text-sm font-medium text-cyan-500 hover:text-cyan-400">+ New Series</button>
          </Link>
        </div>
        
        {loadingSeries ? (
          <div className="p-8 text-center bg-accent/20">
            <p className="text-muted-foreground animate-pulse">Loading your series...</p>
          </div>
        ) : seriesList.length > 0 ? (
          <div className="divide-y divide-border">
            {seriesList.map((series) => (
              <div key={series._id} className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Film className="h-6 w-6 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{series.seriesTitle || "Untitled Series"}</h3>
                    <p className="text-sm text-muted-foreground flex gap-2 items-center">
                      <span className="capitalize">{series.niche}</span>
                      <span>•</span>
                      <span>{new Date(series.createdAt).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/dashboard/series/${series._id}/edit`}>
                    <button className="px-4 py-2 bg-background border border-border shadow-sm text-sm text-foreground font-medium rounded-lg hover:bg-accent transition-colors">
                      Edit Framework
                    </button>
                  </Link>
                  <Link href={`/dashboard/videos/${series._id}`}>
                    <button className="px-4 py-2 bg-cyan-500 shadow-sm text-sm text-white font-medium rounded-lg hover:bg-cyan-400 transition-colors">
                      Manage Episodes
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-accent/20">
            <p className="text-muted-foreground">No series yet. Create your first one!</p>
            <Link href="/dashboard/create">
              <button className="mt-4 px-4 py-2 bg-background border border-border shadow-sm text-foreground font-medium rounded-lg hover:bg-accent hover:text-foreground transition-colors">
                + Create New Series
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}