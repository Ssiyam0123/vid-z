"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface SeriesCreationData {
  niche: string;
  customNiche: string;
  language: string;
  voiceId?: string;
  backgroundMusic?: string;
  videoStyle?: string;
  captionStyle?: string;
  seriesTitle?: string;
  seriesDescription?: string;
}

interface WizardContextType {
// ... existing wizard context type
  currentStep: number;
  totalSteps: number;
  data: SeriesCreationData;
  isStepValid: boolean;
  setStepValid: (isValid: boolean) => void;
  updateData: (newData: Partial<SeriesCreationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCurrentStep: (step: number) => void;
  submitSeries: () => Promise<void>;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepValid, setStepValid] = useState(false);
  const [data, setData] = useState<SeriesCreationData>({
    niche: "",
    customNiche: "",
    language: "English",
  });

  const totalSteps = 6;

  const updateData = (newData: Partial<SeriesCreationData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      setStepValid(false); // Reset validation for the next step
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setStepValid(true); // Assuming previous steps are already valid if we're coming from them
    }
  };

  const submitSeries = async () => {
    let url = "/api/series";
    let method = "POST";
    
    if (typeof window !== 'undefined' && window.location.pathname.includes('/edit')) {
      const id = window.location.pathname.split('/').slice(-2, -1)[0];
      url = `/api/series/${id}`;
      method = "PUT";
    }

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to save series");
    return response.json();
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        totalSteps,
        data,
        isStepValid,
        setStepValid,
        updateData,
        nextStep,
        prevStep,
        setCurrentStep,
        submitSeries,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
