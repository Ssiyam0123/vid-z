"use client";

import { useWizard, WizardProvider } from "@/components/dashboard/create/WizardContext";
import { ActionFooter } from "@/components/dashboard/create/ActionFooter";
import { ProgressStepper } from "@/components/dashboard/create/ProgressStepper";
import { StepOneNiche } from "@/components/dashboard/create/StepOneNiche";
import { StepTwoVoice } from "@/components/dashboard/create/StepTwoVoice";

export default function CreateSeriesPage() {
  return (
    <WizardProvider>
      <div className="max-w-4xl mx-auto py-8 px-4 pb-44">
        <WizardContent />
      </div>
      <ActionFooter />
    </WizardProvider>
  );
}

function WizardContent() {
  const { currentStep, totalSteps, prevStep } = useWizard();

  return (
    <>
      <ProgressStepper currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="mt-12 bg-card border border-border rounded-2xl shadow-sm p-8 min-h-[500px] mb-8">
        {currentStep === 1 && <StepOneNiche />}
        {currentStep === 2 && <StepTwoVoice />}
        
        {currentStep > 2 && (
          <div className="text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
              Step {currentStep} 
              <span className="text-cyan-500 block text-lg font-medium mt-2">Coming Soon</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-sm mx-auto leading-relaxed">
              Our engineering team is currently polishing the next selection layers.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <button 
                onClick={prevStep}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-semibold underline underline-offset-4"
              >
                Go back to Step 1
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
