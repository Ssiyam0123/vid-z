"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressStepper({ currentStep, totalSteps }: ProgressStepperProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm font-medium">
        <span className="text-muted-foreground">Journey Progress</span>
        <span className="text-cyan-500">Step {currentStep} of {totalSteps}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
