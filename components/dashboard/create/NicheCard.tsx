"use client";

import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";

interface NicheCardProps {
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export function NicheCard({ title, description, isSelected, onClick }: NicheCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 border-2 hover:border-cyan-500/50",
        isSelected ? "border-cyan-500 ring-2 ring-cyan-500/20 bg-cyan-500/5" : "border-border"
      )}
      onClick={onClick}
    >
      <CardHeader className="relative">
        {isSelected && (
          <div className="absolute top-2 right-2 bg-cyan-500 rounded-full p-1">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
        <CardTitle className={cn("text-lg", isSelected ? "text-cyan-500" : "text-foreground")}>
          {title}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
