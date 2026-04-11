"use client";

import { useWizard } from "./WizardContext";
import { useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline, Type } from "lucide-react";

const CAPTION_STYLES = [
  { id: "standard", name: "Standard", icon: Type },
  { id: "bold", name: "Bold", icon: Bold },
  { id: "italic", name: "Italic", icon: Italic },
  { id: "highlight", name: "Highlight", icon: Underline },
];

export function StepFiveCaptionStyle() {
  const { data, updateData, setStepValid } = useWizard();

  useEffect(() => {
    setStepValid(!!data.captionStyle);
  }, [data.captionStyle, setStepValid]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Caption Style</h2>
        <p className="text-muted-foreground mt-2">Choose how subtitles will appear.</p>
      </div>
      <ToggleGroup
        type="single"
        value={data.captionStyle}
        onValueChange={(val) => val && updateData({ captionStyle: val })}
        className="flex flex-wrap gap-4 justify-start"
      >
        {CAPTION_STYLES.map((style) => (
          <ToggleGroupItem
            key={style.id}
            value={style.id}
            aria-label={style.name}
            className="flex flex-col items-center gap-2 p-4 h-auto w-28"
          >
            <style.icon className="h-8 w-8" />
            <span className="text-sm">{style.name}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
