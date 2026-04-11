"use client";

import { useWizard } from "./WizardContext";
import { Music, Volume2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

const MUSIC_OPTIONS = [
  { id: "none", name: "No Music", icon: Music },
  { id: "ambient", name: "Ambient", icon: Volume2 },
  { id: "energetic", name: "Energetic", icon: Music },
  { id: "cinematic", name: "Cinematic", icon: Music },
  { id: "lo-fi", name: "Lo-Fi", icon: Volume2 },
];

export function StepThreeMusic() {
  const { data, updateData, setStepValid } = useWizard();

  useEffect(() => {
    setStepValid(!!data.backgroundMusic);
  }, [data.backgroundMusic, setStepValid]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Background Music</h2>
        <p className="text-muted-foreground mt-2">
          Choose a track to enhance your video's mood.
        </p>
      </div>

      <RadioGroup
        value={data.backgroundMusic}
        onValueChange={(val) => updateData({ backgroundMusic: val })}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {MUSIC_OPTIONS.map((music) => (
          <div key={music.id} className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-cyan-500/30">
            <RadioGroupItem value={music.id} id={music.id} />
            <Label htmlFor={music.id} className="flex items-center gap-3 cursor-pointer">
              <music.icon className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{music.name}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
