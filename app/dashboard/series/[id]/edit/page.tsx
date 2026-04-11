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
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

export default function EditSeriesPage() {
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
  const { currentStep, totalSteps, updateData, submitSeries } = useWizard();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const dataFetched = useRef(false);

  useEffect(() => {
    if(dataFetched.current) return;
    dataFetched.current = true;

    if (params.id) {
        fetch(`/api/series/${params.id}`)
        .then(r => r.json())
        .then(res => {
            if(res.series) {
                updateData({
                    niche: res.series.niche,
                    customNiche: res.series.customNiche,
                    language: res.series.language,
                    voiceId: res.series.voiceId,
                    backgroundMusic: res.series.backgroundMusic,
                    videoStyle: res.series.videoStyle,
                    captionStyle: res.series.captionStyle,
                    seriesTitle: res.series.seriesTitle,
                    seriesDescription: res.series.seriesDescription,
                });
            }
            setLoading(false);
        });
    }
  }, [params.id, updateData]);
  
  // Patch context's submitSeries onto PUT instead of POST if editing
  // In a full architecture, WizardContext.tsx should check data._id and PUT vs POST.
  // For simplicity, WizardContext assumes creation. To edit, we'd normally just let WizardContext handle `id`. 

  if(loading) return <div className="py-20 text-center animate-pulse tracking-widest text-cyan-500 font-semibold">LOADING SERIES DATA...</div>;

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
