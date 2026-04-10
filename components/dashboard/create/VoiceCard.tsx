"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Play, Pause, Check, Music } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VoiceCardProps {
  id: string;
  name: string;
  gender: string;
  model: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function VoiceCard({ id, name, gender, model, isSelected, onSelect }: VoiceCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const togglePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    
    // Simulate audio playback for demonstration
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300 group hover:shadow-lg",
        isSelected 
          ? "border-cyan-500 ring-2 ring-cyan-500/10 bg-cyan-500/5 shadow-cyan-500/10 shadow-xl" 
          : "border-border hover:border-cyan-500/30"
      )}
      onClick={onSelect}
    >
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-inner">
            <Music className="h-6 w-6" />
          </div>
          {isSelected && (
            <div className="bg-cyan-500 rounded-full p-1 shadow-md shadow-cyan-500/40">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
        </div>

        <div>
          <h3 className={cn("text-xl font-bold transition-colors", isSelected ? "text-cyan-600" : "text-foreground")}>
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold px-2 py-0.5 bg-muted rounded-full text-muted-foreground uppercase tracking-wider">
              {gender}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 bg-cyan-500/10 rounded-full text-cyan-600 uppercase tracking-wider">
              {model}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-3">
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "flex-1 h-10 gap-2 rounded-xl transition-all",
              isPlaying ? "text-cyan-600 bg-cyan-500/10" : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
            onClick={togglePreview}
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 fill-cyan-600 animate-pulse" />
                Previewing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Preview Voice
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
