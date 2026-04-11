"use client";

import { useWizard, WizardProvider } from "@/components/dashboard/create/WizardContext";
import { ActionFooter } from "@/components/dashboard/create/ActionFooter";
import { ProgressStepper } from "@/components/dashboard/create/ProgressStepper";
import { StepOneNiche } from "@/components/dashboard/create/StepOneNiche";
import { StepTwoVoice } from "@/components/dashboard/create/StepTwoVoice";
import { StepThreeMusic } from "@/components/dashboard/create/StepThreeMusic";
import { StepFourVideoStyle } from "@/components/dashboard/create/StepFourVideoStyle";
import { StepFiveCaptionStyle } from "@/components/dashboard/create/StepFiveCaptionStyle";
import { StepSixDetails } from "@/components/dashboard/create/StepSixDetails";

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
        {currentStep === 3 && <StepThreeMusic />}
        {currentStep === 4 && <StepFourVideoStyle />}
        {currentStep === 5 && <StepFiveCaptionStyle />}
        {currentStep === 6 && <StepSixDetails />}
      </div>
    </>
  );
}
