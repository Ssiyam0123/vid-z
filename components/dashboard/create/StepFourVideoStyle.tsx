"use client";

import { useWizard } from "./WizardContext";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const VIDEO_STYLES = [
  { id: "modern", name: "Modern", description: "Clean transitions, minimal graphics" },
  { id: "dynamic", name: "Dynamic", description: "Fast cuts, energetic effects" },
  { id: "cinematic", name: "Cinematic", description: "Film look, smooth zooms" },
  { id: "educational", name: "Educational", description: "Clear annotations, simple" },
];

export function StepFourVideoStyle() {
  const { data, updateData, setStepValid } = useWizard();

  useEffect(() => {
    setStepValid(!!data.videoStyle);
  }, [data.videoStyle, setStepValid]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Video Style</h2>
        <p className="text-muted-foreground mt-2">Select the visual treatment for your series.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VIDEO_STYLES.map((style) => (
          <Card
            key={style.id}
            className={cn(
              "cursor-pointer transition-all hover:border-cyan-500/50",
              data.videoStyle === style.id && "border-cyan-500 ring-2 ring-cyan-500/20"
            )}
            onClick={() => updateData({ videoStyle: style.id })}
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">{style.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{style.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
