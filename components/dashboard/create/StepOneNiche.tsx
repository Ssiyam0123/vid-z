"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NicheCard } from "./NicheCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PREDEFINED_NICHES = [
  {
    id: "scary-stories",
    title: "Scary Stories",
    description: "Creepy narratives, urban legends, and spine-chilling horror tales.",
  },
  {
    id: "motivation",
    title: "Motivation",
    description: "Inspirational speeches and life advice to boost productivity and mindset.",
  },
  {
    id: "historical-mystery",
    title: "Historical Mystery",
    description: "Unsolved puzzles and fascinating enigmas from human history.",
  },
  {
    id: "tech-trends",
    title: "Tech Trends",
    description: "Latest news and insights from the world of technology and innovation.",
  },
  {
    id: "true-crime",
    title: "True Crime",
    description: "Deep dives into notorious cases and mysterious crimes.",
  },
  {
    id: "science-facts",
    title: "Science Facts",
    description: "Mind-blowing discoveries and educational concepts simplified.",
  },
];

import { useWizard } from "./WizardContext";
import { useEffect } from "react";

export function StepOneNiche() {
  const { data, updateData, setStepValid } = useWizard();
  const [activeTab, setActiveTab] = useState("available");

  const handleNicheSelect = (id: string) => {
    updateData({ niche: id, customNiche: "" });
  };

  const isCurrentStepValid = 
    (activeTab === "available" && data.niche !== "") || 
    (activeTab === "custom" && data.customNiche.trim() !== "");

  // Sync validation state to the Global Footer
  useEffect(() => {
    setStepValid(isCurrentStepValid);
  }, [isCurrentStepValid, setStepValid]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-foreground">Pick your Niche</h2>
        <p className="text-muted-foreground mt-2">Select a starting point and the target language for your new series.</p>
      </div>

      <Tabs defaultValue="available" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-10">
          <TabsTrigger value="available" className="py-3 text-base">Available Niches</TabsTrigger>
          <TabsTrigger value="custom" className="py-3 text-base">Custom Niche</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PREDEFINED_NICHES.map((niche) => (
              <NicheCard
                key={niche.id}
                title={niche.title}
                description={niche.description}
                isSelected={data.niche === niche.id}
                onClick={() => handleNicheSelect(niche.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-0">
          <div className="space-y-6 py-10 max-w-xl mx-auto bg-accent/5 rounded-3xl p-8 border border-dashed border-border/60">
            <div className="space-y-4">
              <Label htmlFor="customNiche" className="text-lg font-bold">Your Custom Niche</Label>
              <Input
                id="customNiche"
                placeholder="e.g., Quantum Physics Explained"
                value={data.customNiche}
                onChange={(e) => updateData({ niche: "custom", customNiche: e.target.value })}
                className="bg-background border-input h-14 text-lg px-6"
              />
              <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-xl">
                <strong>Pro Tip:</strong> Specific niches perform better. Instead of "Science", try "Ocean Enigmas" or "Space Anomalies".
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Language Selection Section */}
      <div className="pt-10 border-t border-border mt-12 bg-accent/5 -mx-8 px-8 py-10 rounded-b-2xl">
        <div className="max-w-md">
          <Label htmlFor="language" className="text-lg font-bold block mb-4">Content Language</Label>
          <div className="relative group">
            <select
              id="language"
              value={data.language}
              onChange={(e) => updateData({ language: e.target.value })}
              className="w-full h-12 bg-background border border-input rounded-xl px-4 text-foreground appearance-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all cursor-pointer font-medium"
            >
              <option value="English">English (American)</option>
              <option value="Hindi">Hindi (Indian)</option>
              <option value="Spanish">Spanish (Latam)</option>
              <option value="German">German (Europe)</option>
              <option value="French">French (Europe)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Available voices in Step 2 will be filtered based on this selection.
          </p>
        </div>
      </div>
    </div>
  );
}


