"use client";

import { useWizard } from "./WizardContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActionFooter() {
  const { 
    currentStep, 
    totalSteps, 
    isStepValid, 
    nextStep, 
    prevStep 
  } = useWizard();

  return (
    <footer className="fixed bottom-0 left-0 right-0 lg:left-80 z-20 bg-background/80 backdrop-blur-md border-t border-border p-4 transition-all duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={cn(
            "flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground hover:bg-accent h-10 md:h-12 px-3 md:px-6",
            currentStep === 1 && "invisible disabled:opacity-0"
          )}
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          <span className="hidden sm:inline">Back</span>
        </Button>

        <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
          <div className="flex flex-col items-end">
            <p className="hidden xs:block text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">
              Progress
            </p>
            <p className="text-xs md:text-sm font-bold text-cyan-500 whitespace-nowrap">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          
          <Button
            onClick={nextStep}
            disabled={!isStepValid}
            className="flex-1 sm:flex-none bg-cyan-500 hover:bg-cyan-400 text-white font-bold h-10 md:h-12 px-5 md:px-10 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group transition-all"
          >
            <span className="whitespace-nowrap">
              {currentStep === totalSteps ? "Finalize" : "Continue"}
            </span>
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </footer>
  );
}

